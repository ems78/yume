import React from "react";
import { TagProps } from "../../../app/interfaces";
import { Button, Form } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const TagCard: React.FC<TagProps> = ({
  tag,
  handleEditTag,
  handleDeleteTag,
}) => {
  const navigate = useNavigate();

  const [isEditing, setIsEditing] = React.useState(false);
  const [editedTagName, setEditedTagName] = React.useState(tag.name);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditedTagName(e.target.value as string);
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCancelClick = () => {
    setIsEditing(false);
    setEditedTagName(tag.name);
  };

  const handleSaveClick = () => {
    setIsEditing(false);
    handleEditTag(tag._id.toString(), editedTagName);
  };

  const handleTagClick = async (tagId: string, tagName: string) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No token found");
      }

      const response = await axios.get(
        `http://localhost:8800/api/logs/tag/${tagId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        navigate("/logs/filtered", {
          state: { logs: response.data, tagName: tagName },
        });
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 404) {
        toast.error("No dream logs with the tag found");
        return;
      } else if (
        (error as Error).message === "No token found" ||
        (axios.isAxiosError(error) && error.response?.status === 401)
      ) {
        toast.error("Please login.");
        navigate("/login");
      } else {
        toast.error("Error fetching dream logs.");
      }
      // console.log("Error fetching dream logs: ", error);
    }
  };

  return (
    <div className="card mb-3" style={{ backgroundColor: "#B2B1B9" }}>
      <div
        className="card-body d-flex justify-content-between rounded"
        style={{ backgroundColor: "#595260", color: "#B2B1B9" }}>
        {isEditing ? (
          <Form.Control
            type="text"
            value={editedTagName}
            style={{ width: "50%" }}
            onChange={handleChange}
          />
        ) : (
          <a
            key={tag._id.toString()}
            onClick={() => handleTagClick(tag._id.toString(), tag.name)}>
            <div>{tag.name}</div>
          </a>
        )}
        <div>
          {isEditing ? (
            <>
              <Button
                variant="outline-success"
                size="sm"
                className="me-2"
                onClick={handleSaveClick}>
                Save
              </Button>
              <Button
                variant="outline-light"
                size="sm"
                onClick={handleCancelClick}>
                Cancel
              </Button>
            </>
          ) : (
            <Button
              variant="outline-warning"
              size="sm"
              className="ms-2"
              onClick={handleEditClick}>
              Edit
            </Button>
          )}
          <Button
            variant="outline-danger"
            size="sm"
            className="ms-2"
            onClick={() => handleDeleteTag(tag._id.toString())}>
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TagCard;
