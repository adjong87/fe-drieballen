import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import axios from "axios";
import './ProfilePage.css';
import PlayerCard from "../../components/playerCard/PlayerCard";
import PlayedGame from "./component/PlayedGame";

function ProfilePage() {
    const {username} = useParams();
    const [profile, setProfile] = useState([])

    useEffect(() => {
        async function fetchProfile() {
            try {
                const response = await axios.get(`http://localhost:8082/playedgame/find?username=${username}`,
                    {
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": `Bearer ${localStorage.getItem("token")}`
                        }
                    })
                setProfile(response.data);
            } catch (e) {
                console.error(e);
            }
        }

        fetchProfile();
    }, []);
    return (
        <>
            <div className="profile-page-container">
                <PlayerCard
                    username={username}/>

                <div className="playedGames-list-container">
                    {profile &&
                        profile.map((scoreCard, index) => {
                        if(scoreCard.scoreCard.nrOfTurns < 1) {
                            return <PlayedGame
                                id={scoreCard.scoreCard.id}
                                key={index}/>
                        }
                        else
                        {
                            return ""
                        }
                    })}
                </div>
            </div>
        </>

    )
}

export default ProfilePage