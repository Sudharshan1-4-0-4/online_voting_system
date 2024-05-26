import React from "react";
import { useState } from "react";

import { useNavigate, Link } from "react-router-dom";
// import Cookies from 'js-cookie';
import './admin.css';

const AdminCredientials = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [showSubmitError, setShowSubmitError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();

  const onChangeUsername = (event) => {
    setName(event.target.value);
  };

  const onChangePassword = (event) => {
    setPassword(event.target.value);
  };

  const submitForm = async (event) => {
    event.preventDefault();
    const userDetails = { name, password };
    const url = "http://localhost:4001/adminLogin/";
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userDetails),
    };

    const response = await fetch(url, options);
    // console.log(response);
    if (response.ok) {
      console.log("navigated");
      navigate("/admin");
    } else {
      setShowSubmitError(true);
      setErrorMsg("Invalid Credentials");
      setName("");
      setPassword("");
    }
  };

  return (
    <div className="login-container">
      <form className="form-container123" onSubmit={submitForm}>
        <h1>👉...Admin Panel...👈</h1>
        <div className="input-container">
          <label className="input-label11" htmlFor="username">
            USERNAME
          </label>
          <input
            type="text"
            id="username"
            value={name}
            className="username-input-field11"
            onChange={onChangeUsername}
            placeholder="Username"
          />
        </div>
        <div className="input-container">
          <label className="input-label11" htmlFor="password">
            PASSWORD
          </label>
          <input
            type="password"
            id="password"
            value={password}
            className="password-input-field11"
            onChange={onChangePassword}
            placeholder="Password"
          />
        </div>
        <button type="submit" className="login-button">
          Login
        </button>

        {showSubmitError && <p className="error-message">*{errorMsg}</p>}
       
      </form>
    </div>
  );
};

export default AdminCredientials;
