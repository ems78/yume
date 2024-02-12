import { Badge, Button, Card, Dropdown, Form } from "react-bootstrap";
import { Tag } from "../../../app/interfaces";
import Layout from "../App";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { FaTimes } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const DreamLogPage: React.FC = () => {
  const navigate = useNavigate();

  const [dream, setDream] = useState({
    _id: "",
    title: "",
    content: "",
    date: new Date(),
    tags: [] as string[], // Array of tag ids
  });

  const [originalDream, setOriginalDream] = useState({
    _id: "",
    title: "",
    content: "",
    date: new Date(),
    tags: [] as string[], // Array of tag ids
  });

  const [tags, setTags] = useState<Tag[]>([]);
  const [selectedTags, setSelectedTags] = useState<Tag[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [searchResults, setSearchResults] = useState<Tag[]>([]);
  const [isEditing, setIsEditing] = useState<boolean>(false);

  useEffect(() => {
    const fetchTags = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:8800/api/tags", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.status === 200) {
          setTags(response.data as Tag[]);
        }
      } catch (error) {
        if (axios.isAxiosError(error) && error.response?.status === 404) {
          console.log("No tags found");
          return;
        }
        console.log("Error fetching tags: ", error);
      }
    };

    fetchTags();
  }, []);

  useEffect(() => {
    const fetchDreamLog = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("No token found");
        }

        const id = window.location.pathname.split("/").pop();
        if (!id) {
          throw new Error("No id found");
        }

        const response = await axios.get(
          `http://localhost:8800/api/logs/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.status === 200) {
          setDream(response.data);
          setOriginalDream(response.data);
        }
      } catch (error) {
        if (axios.isAxiosError(error) && error.response?.status === 404) {
          console.log("No log found");
          return;
        }
      }
    };

    fetchDreamLog();
  }, []);

  useEffect(() => {
    const selectedTagObjects = tags.filter((tag) =>
      dream.tags.includes(tag._id.toString())
    );
    setSelectedTags(selectedTagObjects);
  }, [dream.tags, tags]);

  const dropdownRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const closeDropdown = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setSearchResults([]);
      }
    };

    document.addEventListener("mousedown", closeDropdown);

    return () => {
      document.removeEventListener("mousedown", closeDropdown);
    };
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDream({ ...dream, [e.target.name]: e.target.value });
  };

  const handleTagSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    const filteredTags = tags.filter((tag) =>
      tag.name.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setSearchResults(filteredTags);
  };

  const handleTagSelect = (tag: Tag) => {
    if (!selectedTags.includes(tag)) {
      setSelectedTags([...selectedTags, tag]);
      setDream({
        ...dream,
        tags: [...dream.tags, tag._id.toString()],
      });
    }

    setSearchTerm("");
    setSearchResults([]);
  };

  const handleTagRemove = (tag: Tag) => {
    if (!isEditing) {
      return;
    }

    setSelectedTags(selectedTags.filter((t) => t._id !== tag._id));
    setDream({
      ...dream,
      tags: dream.tags.filter((t) => t !== tag._id.toString()),
    });
  };

  const handleBackClick = () => {
    navigate("/journal");
  };

  const handleCancelClick = () => {
    setDream(originalDream);

    const selectedTagObjects = originalDream.tags
      .map((tagId) => tags.find((tag) => tag._id.toString() === tagId))
      .filter((tag) => tag !== undefined) as Tag[];

    setSelectedTags(selectedTagObjects);
    setSearchTerm("");

    setIsEditing(false);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No token found");
      }

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { _id, ...dreamWithoutId } = dream;

      const response = await axios.put(
        `http://localhost:8800/api/logs/${dream._id}`,
        dreamWithoutId,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        console.log("Log updated"); // TODO: show snackbar message
      }
    } catch (error) {
      console.log("Error updating log: ", error); // TODO: show snackbar message
    }

    setOriginalDream(dream);
    setIsEditing(false);
  };

  return (
    <Layout>
      <div className="container mt-4" style={{ width: "62%" }}>
        <Button
          variant="outline-light"
          className="mb-3"
          style={{ width: "20%" }}
          onClick={handleBackClick}>
          Back
        </Button>
        <Card className="mb-3" style={{ backgroundColor: "#445069" }}>
          <Card.Header
            className="text-center"
            style={{
              backgroundColor: "#595260",
              color: "#B2B1B9",
              fontWeight: "bold",
            }}>
            {new Date(dream.date).toLocaleDateString("en-US")}
          </Card.Header>
          <Card.Body style={{ backgroundColor: "#B2B1B9", color: "#2C2E43" }}>
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="formDreamTitle">
                <Form.Label>Title</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter title"
                  name="title"
                  value={dream.title}
                  className="mb-3"
                  disabled={!isEditing}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group controlId="formDreamContent">
                <Form.Label>Content</Form.Label>
                <Form.Control
                  as="textarea"
                  placeholder="Enter content"
                  name="content"
                  value={dream.content}
                  className="mb-3"
                  disabled={!isEditing}
                  onChange={handleChange}
                  rows={8}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Tags</Form.Label>
                <Form.Control
                  type="text"
                  value={searchTerm}
                  disabled={!isEditing}
                  onChange={handleTagSearch}
                  placeholder="Search for tags"
                />
                <Dropdown.Menu
                  ref={dropdownRef}
                  show={searchTerm.length > 0 && searchResults.length > 0}>
                  {searchResults.slice(0, 5).map((tag, index) => (
                    <Dropdown.Item
                      key={index}
                      onClick={() => handleTagSelect(tag)}>
                      {tag.name}
                    </Dropdown.Item>
                  ))}
                </Dropdown.Menu>
                <div style={{ marginTop: "10px", marginBottom: "20px" }}>
                  {selectedTags.map((tag, index) => (
                    <Badge key={index} pill style={{ marginRight: "5px" }}>
                      {tag.name}
                      <FaTimes
                        onClick={() => handleTagRemove(tag)}
                        style={{ marginLeft: "5px", cursor: "pointer" }}
                      />
                    </Badge>
                  ))}
                </div>
              </Form.Group>
              {!isEditing ? (
                <Button
                  variant="outline-warning"
                  onClick={() => setIsEditing(true)}
                  className="mt-3">
                  Edit
                </Button>
              ) : (
                <div>
                  <Button
                    variant="outline-success"
                    type="submit"
                    className="mt-3">
                    Save
                  </Button>
                  <Button
                    variant="outline-danger"
                    onClick={handleCancelClick}
                    className="mt-3 ms-3">
                    Cancel
                  </Button>
                </div>
              )}
            </Form>
          </Card.Body>
        </Card>
      </div>
    </Layout>
  );
};

export default DreamLogPage;
