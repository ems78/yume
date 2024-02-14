import { useEffect, useState } from "react";
import Layout from "../App";
import { Tag } from "../../../app/interfaces";
import axios from "axios";
import TagCard from "../components/TagCard";
import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const TagsPage: React.FC = () => {
  const navigate = useNavigate();

  const [tags, setTags] = useState<Tag[]>([]);
  const [isCreating, setIsCreating] = useState(false);

  const [newTag, setNewTag] = useState<string>("");

  useEffect(() => {
    const fetchTags = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          navigate("/login");
          return;
        }

        const response = await axios.get("http://localhost:8800/api/tags", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.status === 200) {
          const activeTags = response.data.filter((tag: Tag) => !tag.isDeleted);
          setTags(
            activeTags.sort((a: { name: string }, b: { name: string }) =>
              a.name.localeCompare(b.name)
            )
          );
        }
      } catch (error) {
        if (axios.isAxiosError(error) && error.response?.status === 404) {
          console.log("No tags found"); // TODO: show snackbar message
          return;
        }
        console.log("Error fetching tags: ", error); // TODO: show error message as snackbar
      }
    };

    fetchTags();
  }, [navigate]);

  const handleEditTag = async (tagId: string, editedTagName: string) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No token found"); // TODO: show error message as snackbar and redirect to login
      }

      const response = await axios.put(
        `http://localhost:8800/api/tags/${tagId}`,
        { name: editedTagName },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        const updatedTags: Tag[] = tags.map((tag) => {
          if (tag._id.toString() === tagId) {
            return { ...tag, name: editedTagName } as Tag;
          }
          return tag;
        });
        setTags(
          updatedTags.sort((a: { name: string }, b: { name: string }) =>
            a.name.localeCompare(b.name)
          )
        );
      }
    } catch (error) {
      console.log("Error updating tag: ", error); // TODO: show error message as snackbar
    }
  };

  const handleDeleteTag = async (tagId: string) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this tag?\nAll logs with this tag will be updated to remove this tag."
    );

    if (!confirmDelete) {
      return;
    }

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No token found");
      }

      const response = await axios.patch(
        `http://localhost:8800/api/tags/${tagId}`,
        { isDeleted: true },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        const updatedTags = tags.filter((t) => t._id.toString() !== tagId);
        setTags(
          updatedTags.sort((a: { name: string }, b: { name: string }) =>
            a.name.localeCompare(b.name)
          )
        );
        console.log("Tag deleted"); // TODO: show snackbar message
      }
    } catch (error) {
      console.log("Error deleting tag: ", error); // TODO: show error message as snackbar
    }
  };

  const handleChangeNewTagForm = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTag(e.target.value);
  };

  const handleCancelNewTag = () => {
    setIsCreating(false);
    setNewTag("");
  };

  const handleSubmitNewTag = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No token found");
      }

      const response = await axios.post(
        "http://localhost:8800/api/tags",
        { name: newTag },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 201) {
        const addedTag = {
          _id: response.data.insertedId,
          name: newTag as string,
        };

        const updatedTags = [...tags, addedTag as Tag];
        setTags(updatedTags.sort((a, b) => a.name.localeCompare(b.name)));
        setIsCreating(false);
        setNewTag("");
        console.log("Tag saved"); // TODO: show snackbar message
      }
    } catch (error) {
      console.log("Error saving tag: ", error); // TODO: show error message as snackbar
    }
  };

  return (
    <Layout>
      <div
        className="container"
        style={{ maxWidth: "50%", marginTop: "1%", color: "#E9D5CA" }}>
        <h2 className="mb-4 text-center">
          Tags
        </h2>
        <div className="mb-4">
          {!isCreating ? (
            <Button
              variant="outline-warning"
              onClick={() => setIsCreating(true)}>
              New tag
            </Button>
          ) : (
            <Form onSubmit={handleSubmitNewTag}>
              <Form.Group className="mb-3">
                <Form.Label>Tag name</Form.Label>
                <Form.Control
                  required
                  value={newTag}
                  onChange={handleChangeNewTagForm}
                  type="text"
                  placeholder="Enter tag name"
                />
              </Form.Group>
              <Button variant="outline-success" type="submit">
                Save
              </Button>
              <Button
                variant="outline-danger"
                className="ms-2"
                onClick={handleCancelNewTag}>
                Cancel
              </Button>
            </Form>
          )}
        </div>
        <hr className="mb-4" style={{ backgroundColor: "white" }} />
        <div className="tags">
          {tags.map((tag) => (
            <TagCard
              key={tag._id.toString()}
              tag={tag}
              handleEditTag={handleEditTag}
              handleDeleteTag={handleDeleteTag}
            />
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default TagsPage;
