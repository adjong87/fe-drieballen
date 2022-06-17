import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Profile() {

    const [userData, setUserData] = useState({});

    useEffect(() => {
        axios.get("http://localhost:8082/members")
            .then((response) => {
                setUserData(response);
                console.log(userData);
            }).catch(error => {
            console.error('There was an error!', error);
        });

    }, []);

    return <div>
        {JSON.stringify(userData)}
        trest
    </div>;
}