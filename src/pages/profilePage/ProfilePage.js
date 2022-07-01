import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import axios from "axios";
import './ProfilePage.css';

function ProfilePage() {

    const {username} = useParams();
    const [userData, setUserData] = useState({})

    async function fetchData() {
        try {
            const result = await axios.get(`http://localhost:8082/profiles/profile?username=${username}`,
                {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${localStorage.getItem("token")}`
                    }
                })
            setUserData(result.data);
        } catch (e) {
            console.error(e);
            console.log(e.response.data)
        }
    }

    useEffect(() => {
        fetchData()
    }, [username]);

    if(userData){
    return (
        <>

            <div className="container">
                <div className="player_info">
                    {userData.firstName} {userData.lastName}
                </div>

            </div>
        </>
    )
    }

}


export default ProfilePage