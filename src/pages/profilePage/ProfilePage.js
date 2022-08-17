import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import './ProfilePage.css';
import PlayerCard from "../../components/playerCard/PlayerCard";
import PlayedGame from "./component/PlayedGame";
import ApiService from "../../services/ApiService";

function ProfilePage() {
    const {username} = useParams();
    const [profile, setProfile] = useState(null)

    useEffect(() => {
        document.title = `de Drie Ballen - Profiel van ${username}`
        ApiService.getProfile(username).then(
            (response) => {
                setProfile(response.data)
            }).catch(error => {
                console.log(error)
            }
        )
    }, []);

    return (
        <>
            <div className="profile-page-container">
                <PlayerCard
                    username={username}/>

                <div className="playedGames-list-container">
                    {profile &&
                        profile.map((scoreCard, index) => {
                            return <PlayedGame
                                id={scoreCard.scoreCard.id}
                                key={index}/>

                        })}
                </div>
            </div>
        </>

    )
}

export default ProfilePage