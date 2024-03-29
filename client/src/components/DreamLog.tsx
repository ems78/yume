import React from "react";
import { LogProps } from "../../../app/interfaces";
import { useNavigate } from "react-router-dom";

const DreamLog: React.FC<LogProps> = ({ dreamLog, handleDeleteClick }) => {
  const navigate = useNavigate();

  const { _id, date, title, content } = dreamLog;

  const formattedDate = new Date(date).toLocaleDateString("en-US");

  const handleOpenClick = () => {
    navigate(`/dreamLog/${dreamLog._id}`);
  };

  return (
    <div className="card mb-3" style={{ backgroundColor: "#445069" }}>
      <div
        className="card-header text-center"
        style={{
          backgroundColor: "#595260",
          color: "#B2B1B9",
          fontWeight: "bold",
        }}>
        {formattedDate}
      </div>
      <div
        className="card-body"
        style={{ backgroundColor: "#B2B1B9", color: "#2C2E43" }}>
        <h5 className="card-title">{title}</h5>
        <p
          className="card-text"
          style={{ maxHeight: "200px", overflow: "auto" }}>
          {content}
        </p>
        <div className="d-flex justify-content-end mt-4">
          <button
            className="btn btn-outline-light btn-sm me-2"
            onClick={handleOpenClick}>
            Open
          </button>
          <button
            className="btn btn-outline-danger btn-sm"
            onClick={() => handleDeleteClick(_id.toString())}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DreamLog;
