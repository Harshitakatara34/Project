import React, { useContext, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Container, Form, Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../ContextApi/AuthContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
const { isAuthenticated, authenticate } = useContext(AuthContext);
const navigate=useNavigate();
  const loginUser = async () => {
    try {
      const response = await fetch(`https://backend-7js1.onrender.com/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const { token, userId } = await response.json();

        // Store the token in local storage
        localStorage.setItem("token", token);

        // Show a success toast
        toast.success("User logged in successfully!", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });

        // Redirect to the notes route using Link
   
      authenticate();
      navigate('/notes');
      } else {
        // Show an error toast
        toast.error("Error logging in", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
        console.error("Error logging in:", response.statusText);
      }
    } catch (error) {
      // Show an error toast
      toast.error("Error logging in", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      console.error("Error logging in:", error);
    }
  };

  return (
    <Container
      className="d-flex align-items-center justify-content-center"
      style={{
        minHeight: "100vh",
        minWidth: "100%",
        background: "linear-gradient(to right, skyblue, seagreen)",
      }}
    >
      <Card style={{ width: "25rem" }}>
        <Card.Body>
          <ToastContainer />
          <h1 className="text-center mb-4">Login</h1>
          <Form>
            <Form.Group controlId="formEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>
            <p>
              Don't have an account? <Link to="/">Register</Link>
            </p>
            <Button
              variant="primary"
              type="button"
              onClick={loginUser}
              className="w-100 mt-3"
            >
              Login
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Login;
