import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function LoginForm() {
  const [username, setName] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = { username, password };
    axios
      .post("/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })
      .then((response) => {
        
        localStorage.setItem("user", username);
        localStorage.setItem("userID", response.data.userID)

        console.log("Response:", response); //When Message is "Authentication successful" redirect to Home
        console.log(localStorage);
        navigate("/");
        window.location.reload(false);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <form action="/login" method="POST" onSubmit={handleSubmit} className="login">
      <label>
        Username:
      </label>
      <input
        type="text"
        value={username}
        onChange={(event) => setName(event.target.value)}
      />
      <br />
      <label>
        Password:
      </label>
      <input
        type="password"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
      />
      <br />
      <button type="submit">Submit</button>
    </form>
  );
}

export default LoginForm;
