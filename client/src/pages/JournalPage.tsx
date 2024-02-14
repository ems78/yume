import React, { useState, useEffect } from "react";
import Layout from "../App";
import Log from "../components/DreamLog";
import { DreamLog } from "../../../app/interfaces";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import axios from "axios";
import DreamLogCreateForm from "../components/DreamLogCreateForm";

const JournalPage: React.FC = () => {
  const navigate = useNavigate();

  const [dreamLogs, setDreamLogs] = useState<DreamLog[]>([]);
  const [isCreating, setIsCreating] = useState(false);

  useEffect(() => {
    const fetchDreamLogs = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          navigate("/login");
          return;
        }

        const response = await axios.get("http://localhost:8800/api/logs", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.status === 200) {
          const dreamLogs = response.data as DreamLog[];
          setDreamLogs(dreamLogs);
          const sortedDreamLogs = dreamLogs.slice().sort((a, b) => {
            return new Date(b.date).getTime() - new Date(a.date).getTime();
          });
          setDreamLogs(sortedDreamLogs);
        }
      } catch (error) {
        if (axios.isAxiosError(error) && error.response?.status === 404) {
          // TODO: show snackbar message - no logs found
        } else {
          console.log("Error fetching dream logs: ", error);
          navigate("/login");
        }
      }
    };

    fetchDreamLogs();
  }, [navigate]);

  const handleDeleteClick = async (logId: string) => {
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
      }
    } catch (error) {
      console.log("Error deleting dream log: ", error);
    }
  };

  const addDreamLog = async (logId: string) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No token found");
      }

      const response = await axios.get(
        `http://localhost:8800/api/logs/${logId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        const dreamLog = response.data as DreamLog;
        setDreamLogs((prevDreamLogs) => {
          const updatedDreamLogs = [...prevDreamLogs, dreamLog];
          const sortedDreamLogs = updatedDreamLogs.slice().sort((a, b) => {
            return new Date(b.date).getTime() - new Date(a.date).getTime();
          });
          return sortedDreamLogs;
        });
      }
    } catch (error) {
      console.log("Error fetching dream log: ", error);
    }
  };

  return (
    <Layout>
      <div
        className="container"
        style={{ maxWidth: "50%", marginTop: "1%", color: "#E9D5CA" }}>
        <h2 className="mb-4 text-center">Journal</h2>
        <div className="mb-4">
          {!isCreating ? (
            <Button
              variant="outline-warning"
              onClick={() => setIsCreating(true)}>
              New log
            </Button>
          ) : (
            <DreamLogCreateForm
              setIsCreating={setIsCreating}
              addDreamLog={addDreamLog}
            />
          )}
        </div>
        <hr className="mb-4" style={{ backgroundColor: "white" }} />
        {dreamLogs.map((log) => (
          <Log
            key={log._id.toString()}
            dreamLog={log}
            handleDeleteClick={handleDeleteClick}
          />
        ))}
      </div>
    </Layout>
  );
};

export default JournalPage;
