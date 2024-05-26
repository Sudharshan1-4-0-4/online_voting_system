import React from "react";
import { useState } from "react";

import { useNavigate, Link } from "react-router-dom";
// import Cookies from 'js-cookie';
import './index.css';

const LoginForm = () => {
  const [voter_name, setName] = useState("");
  const [voter_id, setVoterId] = useState("");
  const [showSubmitError, setShowSubmitError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();

  const onChangeUsername = (event) => {
    setName(event.target.value);
  };

  const onChangePassword = (event) => {
    setVoterId(event.target.value);
  };

  const submitForm = async (event) => {
    event.preventDefault();
    const userDetails = { voter_name, voter_id };
    const url = "http://localhost:4001/login/";
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
      navigate("/home");
    } else {
        setName("");
        setPassword('');
      setShowSubmitError(true);
      setErrorMsg("Invalid Voter Credentials");
    }
  };

  return (
    <div className="login-container112">
      
      <form className="form-container" onSubmit={submitForm}>
        <h1 >👉...Voting_Platform...👈</h1>
        <div className="input-container">
          <label className="input-label" htmlFor="username">
            USERNAME
          </label>
          <input
            type="text"
            id="username"
            value={voter_name}
            className="username-input-field"
            onChange={onChangeUsername}
            placeholder="Username"
          />
        </div>
        <div className="input-container">
          <label className="input-label" htmlFor="password">
            PASSWORD
          </label>
          <input
            type="password"
            id="password"
            value={voter_id}
            className="password-input-field"
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

export default LoginForm;
