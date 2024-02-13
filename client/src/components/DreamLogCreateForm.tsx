import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { Badge, Button, Dropdown, Form } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { DreamLogFormProps, Tag } from "../../../app/interfaces";
import { FaTimes } from "react-icons/fa";

const DreamLogForm: React.FC<DreamLogFormProps> = ({
  setIsCreating,
  addDreamLog,
}) => {
  const [dream, setDream] = useState({
    title: "",
    content: "",
    date: new Date(),
    tags: [] as string[], // Array of tag ids
  });

  const [tags, setTags] = useState<Tag[]>([]);
  const [selectedTags, setSelectedTags] = useState<Tag[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [searchResults, setSearchResults] = useState<Tag[]>([]);

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
        console.log("Error fetching tags: ", error); // TODO: show error message as snackbar
      }
    };

    fetchTags();
  }, []);

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

  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDream({ ...dream, [e.target.name]: e.target.value });
  };

  const handleDateChange = (date: Date) => {
    setDream({ ...dream, date: date });
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
      setDream({ ...dream, tags: [...dream.tags, tag._id.toString()] });
    }
    setSearchTerm("");
    setSearchResults([]);
  };

  const handleRemoveTag = (tag: Tag) => {
    setSelectedTags(selectedTags.filter((t) => t !== tag));
    setDream({
      ...dream,
      tags: dream.tags.filter((tagId) => tagId !== tag._id.toString()),
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No token found");
      }

      const response = await axios.post(
        "http://localhost:8800/api/logs",
        dream,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 201) {
        addDreamLog(response.data.insertedId);
        setIsCreating(false);
        console.log("Dream log saved"); // TODO: show success message as snackbar
      }
    } catch (error) {
      console.log("Error saving dream log: ", error); // TODO: show error message as snackbar
    }
    setSearchTerm("");
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="text-center">
        <DatePicker
          selected={dream.date}
          onChange={handleDateChange}
          dateFormat="dd/MM/yyyy"
          className="form-control text-center"
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Tags</Form.Label>
        <Form.Control
          type="text"
          value={searchTerm}
          onChange={handleTagSearch}
          placeholder="Search for tags"
        />
        <Dropdown.Menu
          ref={dropdownRef}
          show={searchTerm.length > 0 && searchResults.length > 0}>
          {searchResults.slice(0, 5).map((tag, index) => (
            <Dropdown.Item key={index} onClick={() => handleTagSelect(tag)}>
              {tag.name}
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
        <div style={{ marginTop: "10px", marginBottom: "20px" }}>
          {selectedTags.map((tag, index) => (
            <Badge key={index} pill style={{ marginRight: "5px" }}>
              {tag.name}
              <FaTimes
                onClick={() => handleRemoveTag(tag)}
                style={{ marginLeft: "5px", cursor: "pointer" }}
              />
            </Badge>
          ))}
        </div>
      </Form.Group>
      <Form.Group>
        <Form.Label>Title</Form.Label>
        <Form.Control
          type="text"
          name="title"
          value={dream.title}
          onChange={handleChange}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Content</Form.Label>
        <Form.Control
          as="textarea"
          type="text"
          name="content"
          value={dream.content}
          onChange={handleChange}
          rows={8}
        />
      </Form.Group>
      <Button variant="outline-success" type="submit" className="mt-3">
        Save
      </Button>
      <Button
        variant="outline-danger"
        onClick={() => setIsCreating(false)}
        className="mt-3 ms-3">
        Cancel
      </Button>
    </Form>
  );
};

export default DreamLogForm;
