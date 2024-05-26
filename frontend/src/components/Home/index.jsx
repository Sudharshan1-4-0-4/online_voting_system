import React, {useState, useEffect} from "react";
import Navbar from "../NavBar";
import axios from 'axios';
import CandidateCard from '../CandidateCard';
import './home.css';

function Home() {

    const [candidates, setCandidates] = useState([]);
    const [candidate_id, setCid] = useState();
    const [voter_name, setVname] = useState("");
    const [voter_id, setVid] = useState("");

    const onChangeid = (e) => {
        setCid(e.target.value);
    }

    const onChangename = (e) => {
        setVname(e.target.value);
    }

    const onChangevid = (e) => {
        setVid(e.target.value);
    }

    const fetchedData = async (e) => {
        e.preventDefault();

        console.log(candidate_id);
        console.log(voter_name);
        console.log(voter_id);

        const userDetails = { candidate_id, voter_name, voter_id };
        const url = "http://localhost:4001/update/";
        const options = {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userDetails),
        };
    
        const response = await fetch(url, options);
        // console.log(response);
        if (response.ok) {
          console.log("updated...");
          setCid();
          setVid("");
          setVname("");
          console.log(voter_name);
          alert("voted successfully...");
         
        } else {
          console.log("not updated...")
          setCid("");
          setVid("");
          setVname("");
          alert("Invalid Credientials...");
        }
      };

    useEffect(() => {
      axios.get('http://localhost:4001/candidates/')
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
                            </tr>
                        </thead>
                        <tbody>
                            {candidates.map(candidate => (
                                <CandidateCard key={candidate.candidate_id} candidate={candidate} />
                            ))}
                        </tbody>
                    </table>
                    
                </div>
                <div className="vote">
                    
                    <input type="number" placeholder="candidate_id" value={candidate_id} onChange={onChangeid} className="input-field"/>
                    <input type="text" placeholder="voter_name"  value={voter_name} onChange={onChangename} className="input-field"/>
                    <input type="password" placeholder="voter_id"  value={voter_id} onChange={onChangevid} className="input-field"/>
                    <button onClick={fetchedData} className="btn">VOTE</button>
                </div>
            </div>
        </div>
    )
}

export default Home;