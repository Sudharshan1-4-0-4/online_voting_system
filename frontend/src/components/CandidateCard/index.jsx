import React from "react";
import './index.css';

function CandidateCard({ candidate }) {
    return (
        
           
                    <tr>
                        <td>{candidate.candidate_id}</td>
                        <td>{candidate.candidate_name}</td>
                        <td><img src={candidate.candidate_symbol} className="image"/></td>
                        <td>{candidate.candidate_party}</td>
                    </tr>
                
       
    );
}

export default CandidateCard;
