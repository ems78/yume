import React from "react";
import { TagProps } from "../../../app/interfaces";
import { Button, Form } from "react-bootstrap";

const TagCard: React.FC<TagProps> = ({
  tag,
  handleEditTag,
  handleDeleteTag,
}) => {
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
          <div>{tag.name}</div>
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
            onClick={() => handleDeleteTag(tag.id.toString())}>
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TagCard;
