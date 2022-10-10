import React from 'react';
import {MdWork, MdLocationOn, MdCall, MdEmail} from "react-icons/md";
import {DateTime} from "luxon";
import './JobCard.css';

const JobCard = (job) => {
    const formatDate = DateTime.fromISO(job.created_at).toFormat("LLLL dd @ h:mm a")
    return(
        <div className="jobCard row">
            <div className="nameDiv section">
                <h1 className="initalDiv">{job.contact_name.charAt(0)}</h1>
                <div className="nameTime">
                    <h3>{job.contact_name}</h3>
                    <small>{formatDate}</small>
                </div>
            </div>
            <div className="metaArea section">
                <p>
                    <MdLocationOn />&nbsp;{job.suburbs.name}&nbsp;{job.suburbs.postcode}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <MdWork />&nbsp;{job.categories.name}&nbsp;&nbsp;&nbsp;
                    Job ID:&nbsp;&nbsp;&nbsp;{job.id}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <strong>${job.price}</strong> Lead Invitation
                </p>
            </div>
            <div className="description section">
                <p className="contactDiv">
                    <MdCall/>&nbsp;&nbsp;<a href={"tel:" + job.contact_phone}>{job.contact_phone}</a>&nbsp;&nbsp;&nbsp;
                    <MdEmail />&nbsp;<a href={"mailto:" + job.contact_email}>{job.contact_email}</a>
                </p>
                <p>{job.description}</p>
            </div>
        </div>
    );
}

const AcceptedJobCard = (job) => {
    return(
        <React.Fragment>
        {
            (job.data).map(job => {
                return <JobCard {...job} key={job.id} />
            })
        }
        </React.Fragment>
    );
}

export default AcceptedJobCard;