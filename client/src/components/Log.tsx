import React from "react";
import { LogProps } from "../../../app/interfaces";

const Log: React.FC<LogProps> = ({ dreamLog }) => {
  const { date, title, content } = dreamLog;

  const formattedDate = new Date(date).toLocaleDateString("en-US");

  return (
    <div className="card mb-3" style={{ backgroundColor: "#445069" }}>
      <div className="card-header" style={{ backgroundColor: "#EEE0C9" }}>
        {formattedDate}
      </div>
      <div
        className="card-body"
        style={{ backgroundColor: "#445069", color: "#F0ECE5" }}>
        <h5 className="card-title">{title}</h5>
        <p
          className="card-text"
          style={{ maxHeight: "200px", overflow: "auto" }}>
          {content}
        </p>
        <div className="d-flex justify-content-end mt-4">
          <button className="btn btn-outline-light btn-sm me-2">Open</button>
          <button className="btn btn-outline-danger btn-sm">Delete</button>
        </div>
      </div>
    </div>
  );
};

export default Log;
