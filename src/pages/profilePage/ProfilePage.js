import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import axios from "axios";
import './ProfilePage.css';
import {useContext} from 'react'
import {AuthContext} from "../../components/context/AuthContext";
import PlayerCard from "../../components/playerCard/PlayerCard";

function ProfilePage() {
    const {username} = useParams();
    const [profile, setProfile] = useState()


    useEffect(() => {
        async function fetchProfile() {
            try {
                const response = await axios.get(`http://localhost:8082/profiles/profile?username=${username}`,
                    {
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": `Bearer ${localStorage.getItem("token")}`
                        }
                    })
                setProfile(response.data);
                console.log(response.data);
            } catch (e) {
                console.error(e);
            }
        }

        fetchProfile();
    }, []);
    return (
        <>


            <div className="profile-container">
                <PlayerCard username={username}/>

                <div className="playedGame-container">
                    hier komen de score
                </div>
            </div>

        </>
    )
}

export default ProfilePage