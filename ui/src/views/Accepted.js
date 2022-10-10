import React, { useState, useEffect } from 'react';
import AcceptedJobCard from '../components/jobCards/AcceptedJobCard';
import axios from "axios";

/**
 * A Functional Component listing all Accepted Leads
 */
export default () => {
    const [jobData, setJobData] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8080/accepted-jobs')
            .then((res) => {
                setJobData(res.data.data);
            });
    }, []);

    return (
        <div className="acceptedList">
            <AcceptedJobCard data={jobData} />
        </div>
    );
}
