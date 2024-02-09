import { Form, Button, Row, Col } from "react-bootstrap";
import Layout from "../App";
import { useState } from "react";
import axios, { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";

const RegistrationPage: React.FC = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    username: "",
    password: "",
  });

  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setFormErrors({});

    if (formData.password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:8800/api/register",
        formData
      );
      console.log(response);

      if (response.status === 201) {
        console.log("Registration successful");
        navigate("/login");
      }
    } catch (error) {
      console.error("Error registering user: ", error);
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError;
        if (axiosError.response?.status === 400) {
          const responseData = axiosError.response?.data as {
            errors: { path: string; msg: string }[];
          };
          if (responseData && responseData.errors) {
            const errorMessages: { [key: string]: string } = {};
            responseData.errors.forEach((error) => {
              errorMessages[error.path] = error.msg;
            });
            setFormErrors(errorMessages);
          }
        } else if (axiosError.response?.status === 409) {
          setError((axiosError.response.data as { message: string }).message);
        } else {
          setError("Error registering user");
        }
      }
    }
  };

  return (
    <Layout>
      <div
        className="container"
        style={{
          maxWidth: "50%",
          marginTop: "10%",
        }}>
        <h2 className="mb-4 text-center">Register</h2>
        <Form onSubmit={handleSubmit} className="mx-auto">
          <Form.Group controlId="RegistrationForm.Email" className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              required
              type="email"
              placeholder="Enter email"
              name="email"
              value={formData.email}
              className="bg-dark text-light"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                handleChange(e)
              }
            />
            {formErrors.email && (
              <Form.Text className="text-danger">{formErrors.email}</Form.Text>
            )}
          </Form.Group>
          <Form.Group controlId="RegistrationForm.Username" className="mb-3">
            <Form.Label>Username</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="Enter username"
              name="username"
              value={formData.username}
              className="bg-dark text-light"
              onChange={handleChange}
            />
            {formErrors.username && (
              <Form.Text className="text-danger">
                {formErrors.username}
              </Form.Text>
            )}
          </Form.Group>
          <Form.Group controlId="RegistrationForm.Password" className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              required
              type="password"
              placeholder="Enter password"
              name="password"
              value={formData.password}
              className="bg-dark text-light"
              onChange={handleChange}
            />
            {formErrors.password && (
              <Form.Text className="text-danger">
                {formErrors.password}
              </Form.Text>
            )}
          </Form.Group>
          <Form.Group
            controlId="RegistrationForm.ConfirmPassword"
            className="mb-3">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              required
              type="password"
              placeholder="Confirm password"
              name="confirmPassword"
              value={confirmPassword}
              className="bg-dark text-light"
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </Form.Group>
          <Form.Text className="text-danger">{error}</Form.Text>
          <Row className="align-items-end">
            <Col>
              <Button
                variant="primary"
                type="submit"
                className="mt-3"
                style={{ width: "50%" }}>
                Register
              </Button>
            </Col>
            <Col className="text-end mt-3">
              <span>Already have an account?</span>
              <Button variant="secondary" style={{ width: "50%" }}>
                Log in
              </Button>
            </Col>
          </Row>
        </Form>
      </div>
    </Layout>
  );
};

export default RegistrationPage;
