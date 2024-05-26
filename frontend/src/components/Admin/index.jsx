import React, {useState} from "react";
import {Link} from 'react-router-dom';

import './ad.css';

function Admin(){
    return (
        <div className="main-container">
            <div className="btn-container">
                <Link to='/addVoters'><button className="btn">Add Voter</button></Link>
               
            </div>
            <div className="btn-container">
                <Link to='/addCandidates'><button className="btn">Add Candidate</button></Link>
                
            </div>
        </div>
    )
}

export default Admin;