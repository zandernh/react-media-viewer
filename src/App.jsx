import { useState, useEffect, useRef } from "react";
import MediaCard from "./components/MediaCard";
import "./css/App.css";

function App() {
  const ITEMS_PER_PAGE = 20;
  const [mediaItems, setMediaItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const loaderRef = useRef(null);

  useEffect(() => {
    fetch("https://arthurfrost.qflo.co.za/php/getTimeline.php")
      .then((response) => response.json())
      .then((data) => {
        setMediaItems(data.Timeline);
        setLoading(false);
        console.log(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, [page]);

  const handleScroll = () => {
    if (loaderRef.current) {
      const { scrollTop, scrollHeight, clientHeight } =
        document.documentElement;
      if (scrollTop + clientHeight >= scrollHeight - 5 && !loading) {
        setPage((prevPage) => prevPage + 1);
        setLoading(true);
      }
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [loading]);

  if (loading && mediaItems.length === 0) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div>
      <h1>Media Viewer</h1>
      <div className="media-grid">
        {mediaItems.slice(0, page * ITEMS_PER_PAGE).map((item) => (
          <MediaCard key={item.Id} item={item} />
        ))}
      </div>

      {loading && <div className="loading">Loading more...</div>}
      <div ref={loaderRef}></div>
    </div>
  );
}

export default App;
