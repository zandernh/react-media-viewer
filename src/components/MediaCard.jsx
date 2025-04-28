import "../css/MediaCard.css";
import React, { useState } from "react";

function MediaCard({ item }) {
  const [imageLoading, setImageLoading] = useState(true);

  const getImageUrl = () => {
    if (!item.Icon) return "/assets/placeholder.jpg";

    if (item.Icon.startsWith("http")) return item.Icon;

    if (item.Icon.startsWith("www.crgsa.co.za")) {
      const relativePath = item.Icon.replace("www.crgsa.co.za/", "");
      return `https://arthurfrost.qflo.co.za/${relativePath}`;
    }

    return `https://arthurfrost.qflo.co.za/${item.Icon}`;
  };

  const imageUrl = getImageUrl();

  const handleError = (e) => {
    e.target.src = "/assets/placeholder.jpg";
    setImageLoading(false);
  };

  const handleLoad = () => {
    setImageLoading(false);
  };

  return (
    <div className="media-card">
      <div className="media-thumnail">
        <img
          src={imageUrl}
          alt={item.Title}
          onError={handleError}
          onLoad={handleLoad}
          className="media-image"
        />
        {imageLoading && <div className="loading-spinner">Loading...</div>}
        <div className="media-overlay">
          <a
            href={`https://www.youtube.com/watch?v=${item.RemoteId}`}
            target="_blank"
            rel="noopener noreferrer"
            className="watch-link"
          >
            Watch on YouTube
          </a>
        </div>
      </div>
      <div className="media-info">
        <h3>{item.Title}</h3>
      </div>
    </div>
  );
}

export default MediaCard;
