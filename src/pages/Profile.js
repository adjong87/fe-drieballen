import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Profile() {

    const [data, setData] = useState([]);
    const [username, setUsername] = useState("adjong87")

    const getData = async () => {
        const { data } = await axios.get(`http://localhost:8082/members?username=${username}`);
        setData(data);
    };

    useEffect(() => {
        getData();
    }, []);


    return <div>{JSON.stringify(data)}</div>;
}