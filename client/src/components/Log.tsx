import React from "react";
import { LogProps } from "../../../app/interfaces";

const Log: React.FC<LogProps> = ({ dreamLog }) => {
  const { date, title, content } = dreamLog;

  const formattedDate = new Date(date).toLocaleDateString('en-US');

  return (
    <div className="card mb-3">
      <div className="card-header">{formattedDate}</div>
      <div className="card-body">
        <h5 className="card-title">{title}</h5>
        <p
          className="card-text"
          style={{ maxHeight: "200px", overflow: "auto" }}>
          {content}
        </p>
      </div>
    </div>
  );
};

export default Log;
