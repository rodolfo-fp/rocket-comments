import React from "react";

export default function Comment({ name, description }) {
  return (
    <div className="comment">
      <p className="comment-name">Name: {name}</p>
      <p>{description}</p>
    </div>
  );
}
