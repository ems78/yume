import React from "react";
import { LogProps } from "../../../app/interfaces";

const Log: React.FC<LogProps> = ({ dreamLog }) => {
  const { date, title, content } = dreamLog;
  
  return (
    <div className="card mb-3">
      <div className="card-header">{date.toDateString()}</div>
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
