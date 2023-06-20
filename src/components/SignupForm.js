import React, { useState, useEffect } from "react";
import {
  Form,
  Button,
  FormGroup,
  FormControl,
  ControlLabel,
} from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";




//Mia's code
function SignupForm() {
  const navigate = useNavigate();

  const [post, setPost] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setPost((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleClick = (event) => {
    event.preventDefault();



    // Check if any field is missing
    const missingFields = Object.keys(post).filter((key) => !post[key]);
    if (missingFields.length) {
      alert(`Please fill in the following fields: ${missingFields.join(", ")}`);
      return;
    }

    // Check if email is in the proper format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(post.email)) {
      alert("Please enter a valid email address.");
      return;
    }
    axios
      .post("/register", post)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));

    navigate("/");
  };

  useEffect(() => {
    console.log(post);
  }, [post]);

  return (
    <Form className="register">
      <Form.Group>
        <Form.Control
          name="userId"
          placeholder="userId"
          onChange={handleChange}
        />
        <Form.Control
          name="username"
          //value={post.username}
          placeholder="username"
          onChange={handleChange}
        />
        <Form.Control
          name="email"
          //value={post.email}
          placeholder="email"
          onChange={handleChange}
        />
        <Form.Control
          name="password"
          //value={post.password}
          placeholder="password"
          onChange={handleChange}
        />
        <Form.Control
          name="confirmPassword"
          //value={post.confirmPassword}
          placeholder="confirmPassword"
          onChange={handleChange}
        />
        <Button onClick={handleClick}>Signup</Button>
      </Form.Group>
    </Form>
  );
}

export default SignupForm;
