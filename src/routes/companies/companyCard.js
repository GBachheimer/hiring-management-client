import "./crudCompanies.css";
import { Link} from "react-router-dom";
import { useEffect, useState } from "react";
import { refEqual } from "firebase/firestore";

export default function CompanyCard(props) {
    const [companyInfo, setCompanyInfo] = useState();

    const getCompany = () => {
        for (let i = 0; i < props.companies.length; ++i) {
            if (props.companies[i].co_name === props.companyName) {
                setCompanyInfo(props.companies[i]);
            }
        };
    };

    useEffect(() => {
        getCompany();
    });

    return (
        <div className = {!props.animateHide ? "card px-3 cardStyle rotate-out-down-left" : props.toggleAnim ? "card px-3 cardStyle rotate-in-up-right" : "card px-3 cardStyle rotate-in-up-left"}>
            <div className = "card-body">
                <h5 className = "card-title">{companyInfo.co_name}</h5>
                <p className = "card-text">{companyInfo.co_address}, {companyInfo.co_city}, {companyInfo.co_state}, {companyInfo.co_country}</p>
            </div>
            <ul className = "list-group list-group-flush listStyle">
                <li className = "list-group-item">Total positions: {companyInfo.co_initial_total_positions}</li>
                <li className = "list-group-item">Initial open positions: {companyInfo.co_initial_free_positions}</li>
                <li className = "list-group-item">Lat: {companyInfo.co_lat} | Lng: {companyInfo.co_lng}</li>
            </ul>
            <div className = "card-body">
                <button id = {companyInfo.co_id} onClick = {props.handleEdit} className = "btn cardBtn btn-dark m-1">Edit</button>
                <button id = {companyInfo.co_id} onClick = {props.handleDelete} className = "btn cardBtn btn-dark m-1">Delete</button>
                <Link className = "btn btn-dark cardBtn m-1" to = "/positions" state = {[companyInfo.co_name, companyInfo.co_id]}>Show all positions</Link>
                <Link className = "btn btn-dark cardBtn m-1" to = "/overview" state = {companyInfo.co_name}>Show company on map</Link>
            </div>
        </div>
    );
}