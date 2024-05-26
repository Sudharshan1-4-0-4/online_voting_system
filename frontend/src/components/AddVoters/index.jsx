import React from "react";
import { useState } from "react";

import { useNavigate, Link } from "react-router-dom";
// import Cookies from 'js-cookie';
 import "./index.css";

const AddVoters = () => {
  const [voter_name, setName] = useState("");
  
  const [voter_id, setPassword] = useState("");
  const is_voted = "false";
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


     

    const userDetails = { voter_name, voter_id, is_voted };
    const url = "http://localhost:4001/register/";
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
      alert("Voter Added..")
    } else {
      setShowSubmitError(true);
      setErrorMsg("Invalid Credentials");
    }
  };

  return (
    <div className="sign-container">
      <form className="form1-container11" onSubmit={submitForm}>
        <h1 >👉...ADD VOTERS...👈</h1>
        <div className="input-container">
          <label className="input-label12" htmlFor="username">
            USERNAME
          </label>
          <input
            type="text"
            id="username"
            value={voter_name}
            className="username-input-field12"
            onChange={onChangeUsername}
            placeholder="Username"
          />
        </div>
        
        <div className="input-container">
          <label className="input-label12" htmlFor="password">
            Voter_Id
          </label>
          <input
            type="password"
            id="password"
            value={voter_id}
            className="username-input-field12"
            onChange={onChangePassword}
            placeholder="voter_id"
          />
        </div>
        <div className="input-container">
          <label className="input-label12" htmlFor="t">
            IS_VOTED
          </label>
          <input
            type="text"
            id="t"
            value={is_voted}
            className="password-input-field12"
           
            placeholder="checking"
          />
        </div>
        <button type="submit" className="login-button">
          Add
        </button>

        {showSubmitError && <p className="error-message">*{errorMsg}</p>}
        
      </form>
      
    </div>
  );
};

export default AddVoters;
