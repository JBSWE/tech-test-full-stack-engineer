import React from 'react';
import {MdLocationOn, MdWork} from "react-icons/md";
import {DateTime} from "luxon";
import './JobCard.css';

const JobCard = (props) => {
    const firstInitial = props.contact_name.charAt(0)
    const formatDate = DateTime.fromISO(props.created_at).toFormat("LLLL dd @ h:mm a")
    return(
        <div className="jobCard row">
            <div className="nameDiv section">
                <h1 className="initalDiv">{firstInitial}</h1>
                <div className="nameTime">
                    <h3>{props.contact_name}</h3>
                    <small>{formatDate}</small>
                </div>
            </div>
            <div className="metaArea section">
                <p>
                    <MdLocationOn />&nbsp;{props.suburbs.name}&nbsp;{props.suburbs.postcode}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <MdWork/>&nbsp;{props.categories.name}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    Job ID:&nbsp;{props.id}
                </p>
            </div>
            <div className="description section">
                <p>{props.description}</p>
            </div>
            <div className="buttonDiv section">
                <button className="primary" onClick={() => props.onJobDecision(props.id, "accepted")}>Accept</button>
                <button onClick={() => props.onJobDecision(props.id, "declined")}>Decline</button>
                <p className="priceArea">
                    <strong>${props.price}</strong> Lead Invitation
                </p>
            </div>
        </div>
    );
}

const NewJobCard = (props) => {
    return(
        <React.Fragment>
            {
                (props.data).map(job => {
                    return <JobCard {...job} key={job.id} onJobDecision={(id, decision) => props.onJobDecision(id, decision)} />
                })
            }
        </React.Fragment>
    );
};

export default NewJobCard;