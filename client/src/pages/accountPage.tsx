import Layout from "../App";
import { User } from "../../../app/interfaces";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Button, Col, Row } from "react-bootstrap";
import { toast } from "react-toastify";

const AccountPage = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState<User | null>(null);
  const [originalUserInfo, setOriginalUserInfo] = useState<User | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("No token found");
        }

        const response = await axios.get("http://localhost:8800/api/account", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.status === 200) {
          const user = response.data as User;
          setUser(user);
          setOriginalUserInfo(user);
        }
      } catch (error) {
        if (
          (error as Error).message === "No token found" ||
          (axios.isAxiosError(error) && error.response?.status === 401)
        ) {
          toast.error("Please login.");
          navigate("/login");
        } else if (
          axios.isAxiosError(error) &&
          error.response?.status === 404
        ) {
          toast.error("User not found");
        } else {
          toast.error("Error fetching user. Please login again.");
        }
        // console.error("Error fetching user: ", error);
      }
    };

    fetchUser();
  }, [navigate]);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = async () => {
    setIsEditing(false);

    if (!user || user === originalUserInfo) {
      return;
    }

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No token found");
      }

      const response = await axios.put(
        "http://localhost:8800/api/account",
        user,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("User info updated successfully");
      if (response.status === 200) {
        setOriginalUserInfo(user);
      }
    } catch (error) {
      if (
        (error as Error).message === "No token found" ||
        (axios.isAxiosError(error) && error.response?.status === 401)
      ) {
        toast.error("Please login.");
        navigate("/login");
      } else {
        toast.error("Error updating user info.");
      }
      // console.error("Error updating user info: ", error);
    }
  };

  const handleCancelClick = () => {
    setUser(originalUserInfo);
    setIsEditing(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (user) {
      setUser({ ...user, [e.target.id]: e.target.value } as User);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <Layout>
      <div
        className="container"
        style={{
          maxWidth: "50%",
          marginTop: "10%",
          color: "#E9D5CA",
        }}>
        <h2 className="mb-4 text-center">Account</h2>
        <div className="mb-3">
          <label htmlFor="username" className="form-label">
            Username
          </label>
          <input
            type="text"
            className="form-control"
            id="username"
            value={user?.username || ""}
            disabled={!isEditing}
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            value={user?.email || ""}
            disabled={!isEditing}
            onChange={handleChange}
          />
        </div>
        <Row className="align-items-end">
          <Col>
            {!isEditing ? (
              <Button variant="warning" className="mt-3" onClick={handleEdit}>
                Edit account info
              </Button>
            ) : (
              <div>
                <Button variant="success" className="mt-3" onClick={handleSave}>
                  Save
                </Button>
                <Button
                  variant="secondary"
                  className="mt-3 ms-2"
                  onClick={handleCancelClick}>
                  Cancel
                </Button>
              </div>
            )}
          </Col>
          <Col className="text-end mt-3">
            <Button variant="danger" onClick={handleLogout}>
              Logout
            </Button>
          </Col>
        </Row>
      </div>
    </Layout>
  );
};

export default AccountPage;
