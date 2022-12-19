import GoogleMapsInfo from "./googleMaps/googleMaps";
import Axios from "axios";
import { useState, useEffect } from "react";
import { CircularProgress } from "@mui/material";

export default function Overview(props) {
    const [allCoData, setAllCoData] = useState();
    const centerEurope = { lat: 50.0755, lng: 14.4378 };
    const zoomEurope = 4;

    useEffect(() => {
        Axios.get("https://recruitment-co-management.onrender.com/company/list").then((res) => {
            setAllCoData(res.data.rows);
        }).catch((error) => {
            console.log(error);
        });
    }, []);

    return (
        <div style = {{height: "100vh", width: "100%" }}>
            {allCoData && <GoogleMapsInfo center = {centerEurope} zoom = {zoomEurope} data = {allCoData} />}
            {!allCoData && <CircularProgress />}
        </div>
    );
}