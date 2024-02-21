import { DreamLog, FilteredDreamLogProps } from "../../../app/interfaces";
import Log from "../components/DreamLog";
import Layout from "../App";
import axios from "axios";
import { toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const FilteredDreamLogPage: React.FC<FilteredDreamLogProps> = ({
  logs,
  tagName,
}) => {
  const navigate = useNavigate();
  const location = useLocation();

  const [dreamLogs, setDreamLogs] = useState<DreamLog[]>(logs);
  const [tag, setTag] = useState<string>("");

  useEffect(() => {
    if (location.state && location.state.logs) {
      setDreamLogs(location.state.logs);
    }
    if (location.state && location.state.tagName) {
      setTag(location.state.tagName);
    }
  }, [location.state]);

  const handleDeleteClick = async (logId: string) => {
    console.log(tagName);
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this log?"
    );
    if (!confirmDelete) {
      return;
    }

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No token found");
      }

      const response = await axios.delete(
        `http://localhost:8800/api/logs/${logId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        const updatedDreamLogs = dreamLogs.filter(
          (log) => log._id.toString() !== logId
        );
        setDreamLogs(updatedDreamLogs);
        toast.success("Log deleted successfully");
      }
    } catch (error) {
      if (
        (error as Error).message === "No token found" ||
        (axios.isAxiosError(error) && error.response?.status === 401)
      ) {
        toast.error("Please login.");
        navigate("/login");
      } else {
        toast.error("Error deleting dream log.");
      }
      // console.log("Error deleting dream log: ", error);
    }
  };
  return (
    <Layout>
      <div
        className="container"
        style={{ maxWidth: "50%", marginTop: "1%", color: "#E9D5CA" }}>
        <h2 className="mb-4 text-center">
          Dream logs with tag{" "}
          <span style={{ fontWeight: "600", fontStyle: "italic" }}>
            "{tag}"
          </span>
        </h2>
        <hr className="mb-4" style={{ backgroundColor: "white" }} />
        <div className="mb-4">
          {dreamLogs.map((log) => (
            <Log
              key={log._id.toString()}
              dreamLog={log}
              handleDeleteClick={handleDeleteClick}
            />
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default FilteredDreamLogPage;
