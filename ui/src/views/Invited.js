import React, { useState, useEffect } from 'react';
import NewJobCard from '../components/jobCards/NewJobCard';
import axios from "axios";

export default () => {
    const [jobData, setJobData] = useState([]);

    useEffect(() => {
        refreshLeads();
    }, []);

    const refreshLeads = () => {
        axios.get('http://localhost:8080/new-jobs')
            .then((res) => {
                setJobData(res.data.data);
            });
    }

    const onJobDecision = (id, status) => {
       if(status === 'accepted') {
           axios.put(`http://localhost:8080/accept/${id}`)
               .then(() => {
                   refreshLeads();
               });
       } else {
           axios.put(
                   `/decline/${id}`)
               .then(() => {
                   refreshLeads();
               });
       }
    }

    return (
        <div className="invitedList">
            <NewJobCard data={jobData} onJobDecision={(id, status) => onJobDecision(id, status)} />
        </div>
    );
}