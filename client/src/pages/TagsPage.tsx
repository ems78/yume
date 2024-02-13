import { useEffect, useState } from "react";
import Layout from "../App";
import { Tag } from "../../../app/interfaces";
import axios from "axios";
import TagCard from "../components/TagCard";

const TagsPage: React.FC = () => {
  const [tags, setTags] = useState<Tag[]>([]);

  useEffect(() => {
    const fetchTags = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("No token found"); // TODO: show error message as snackbar and redirect to login
        }

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
          console.log("No tags found"); // TODO: show snackbar message
          return;
        }
        console.log("Error fetching tags: ", error); // TODO: show error message as snackbar
      }
    };

    fetchTags();
  }, []);

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
        setTags(updatedTags);
      }
    } catch (error) {
      console.log("Error updating tag: ", error); // TODO: show error message as snackbar
    }
  };

  const handleDeleteTag = async (tagId: string) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No token found");
      }

      const response = await axios.delete(
        `http://localhost:8800/api/tags/${tagId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        const updatedTags = tags.filter((t) => t._id.toString() !== tagId);
        setTags(updatedTags);
        console.log("Tag deleted"); // TODO: show snackbar message
      }
    } catch (error) {
      console.log("Error deleting tag: ", error); // TODO: show error message as snackbar
    }
  };

  return (
    <Layout>
      <div
        className="container"
        style={{ maxWidth: "50%", marginTop: "1%", color: "#F0ECE5" }}>
        <h2 className="mb-4 text-center">Tags</h2>
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
