import React from "react";
import { useState } from "react";

import { useNavigate, Link } from "react-router-dom";
// import Cookies from 'js-cookie';
 import "./index.css";

const AddCandidates = () => {
  const [candidate_name, setName] = useState("");
  
  const [candidate_party, setParty] = useState("");
  const [candidate_symbol, setSymbol] = useState("");
  const count = 0;
  const [showSubmitError, setShowSubmitError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
//   const navigate = useNavigate();

  const onChangeUsername = (event) => {
    setName(event.target.value);
  };

  

  const onChangeParty = (event) => {
    setParty(event.target.value);
  };

  const onChangeSymbol = (event) => {
    setSymbol(event.target.value);
  }

  const submitForm = async (event) => {
    event.preventDefault();


     

    const userDetails = { candidate_name, candidate_party, candidate_symbol, count };
    const url = "http://localhost:4001/addcandidates/";
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
      alert("Candidate Added..")
    } else {
      setShowSubmitError(true);
      setErrorMsg("Invalid Credentials");
    }
  };

  return (
    <div className="sign-container">
      <form className="form1-container" onSubmit={submitForm}>
        <h1 className="heading">👉...Add Candidates...👈</h1>
        <div className="input-container">
          <label className="input-label" htmlFor="username">
            NAME
          </label>
          <input
            type="text"
            id="username"
            value={candidate_name}
            className="username-input-field"
            onChange={onChangeUsername}
            placeholder="name"
          />
        </div>
        
        <div className="input-container">
          <label className="input-label" htmlFor="party">
            candidate_party
          </label>
          <input
            type="text"
            id="party"
            value={candidate_party}
            className="username-input-field"
            onChange={onChangeParty}
            placeholder="candidate_party"
          />
        </div>
        <div className="input-container">
          <label className="input-label" htmlFor="t">
            candidate_symbol
          </label>
          <input
            type="text"
            id="t"
            value={candidate_symbol}
            className="password-input-field"
           onChange = {onChangeSymbol}
            placeholder="symbol"
          />
        </div>
        <div className="input-container">
          <label className="input-label" htmlFor="t1">
            count
          </label>
          <input
            type="text"
            id="t1"
            value={count}
            className="password-input-field"
           
            placeholder="count"
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

export default AddCandidates;
