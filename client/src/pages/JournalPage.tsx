import React, { useState, useEffect } from "react";
import Layout from "../App";
import Log from "../components/Log";
import { DreamLog } from "../../../app/interfaces";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import axios from "axios";

const JournalPage: React.FC = () => {
  const navigate = useNavigate();

  const [dreamLogs, setDreamLogs] = useState<DreamLog[]>([]);

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
          return;
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

  return (
    <Layout>
      <div className="container" style={{ maxWidth: "50%", marginTop: "1%" }}>
        <h2 className="mb-4 text-center">Journal</h2>
        <div className="mb-4">
          <Button variant="outline-light">New log</Button>
        </div>
        {dreamLogs.map((log) => (
          <Log key={log._id.toString()} dreamLog={log} />
        ))}
      </div>
    </Layout>
  );
};

export default JournalPage;
