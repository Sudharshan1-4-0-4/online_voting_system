import React, {useState, useEffect} from "react";
import Navbar from "../NavBar";
import axios from 'axios';
import ResultCard from '../ResultCard';
import './index.css';

function Results() {

    const [candidates, setCandidates] = useState([]);

    useEffect(() => {
      axios.get('http://localhost:4001/results/')
        .then(response => setCandidates(response.data))
        .catch(error => console.error('Error fetching courses:', error));
    }, []);

    return (
        <div >
            <Navbar/>
            
            <div className='course-container11'>
                <h1 className="heading12">Candidates</h1>
                <marquee>🏃‍♂️🏃‍♂️...Let's Vote Here..,🏃‍♂️🏃‍♂️</marquee>
                <div className='cards'>
                    <table className="candidate-table">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Symbol</th>
                                <th>Party</th>
                                <th>Count</th>
                            </tr>
                        </thead>
                        <tbody>
                            {candidates.map(candidate => (
                                <ResultCard key={candidate.candidate_id} candidate={candidate} />
                            ))}
                        </tbody>
                    </table>
                    
                </div>
               
            </div>
        </div>
    )
}

export default Results;