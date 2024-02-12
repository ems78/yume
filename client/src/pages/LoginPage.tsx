import Layout from "../App";
import { useState } from "react";
import { Row, Col, Button, Form } from "react-bootstrap";
import axios, { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";

const LoginPage: React.FC = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});
  const [otherError, setOtherError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleRegisterButtonClick = () => {
    navigate("/register");
  };

  const handleErrors = (error: Error) => {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError;

      const { response } = axiosError;
      if (response) {
        const { status, data } = response;

        if (status === 400) {
          // Bad request (backend validation errors)
          const { errors } = data as {
            errors: { path: string; msg: string }[];
          };
          if (errors) {
            const errorMessages: { [key: string]: string } = {};
            errors.forEach((error: { path: string; msg: string }) => {
              errorMessages[error.path] = error.msg;
            });
            setFormErrors(errorMessages);
            return;
          }
        } else if (status === 401) {
          // Unauthorized (invalid email or password)
          setOtherError((data as { message: string }).message);
          return;
        }
      }

      // Other errors (500, etc.)
      setOtherError("Error logging in");
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormErrors({});
    setOtherError("");

    try {
      const response = await axios.post(
        "http://localhost:8800/api/login",
        formData
      );
      if (response.status === 200) {
        const { token } = response.data as { token: string };
        localStorage.setItem("token", token);
        navigate("/journal");
      } else {
        setOtherError("Error logging in");
      }
    } catch (error) {
      handleErrors(error as Error);
    }
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
        <h2 className="mb-4 text-center">Log in</h2>
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
            <div style={{ height: "0.875em" }}>
              {formErrors.email && (
                <Form.Text className="text-danger">
                  {formErrors.email}
                </Form.Text>
              )}
            </div>
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
              <Form.Text className="text-danger" style={{}}>
                {formErrors.password}
              </Form.Text>
            )}
          </Form.Group>
          <div style={{ height: "0.875em" }}>
            <Form.Text className="text-danger">{otherError}</Form.Text>
          </div>
          <Row className="align-items-end">
            <Col>
              <Button
                variant="warning"
                type="submit"
                className="mt-3"
                style={{ width: "50%" }}>
                Log in
              </Button>
            </Col>
            <Col className="text-end mt-3">
              <span>Don't have an account?</span>
              <Button
                variant="light"
                onClick={handleRegisterButtonClick}
                style={{ width: "50%" }}>
                Register
              </Button>
            </Col>
          </Row>
        </Form>
      </div>
    </Layout>
  );
};

export default LoginPage;
