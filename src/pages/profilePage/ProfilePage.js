import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import './ProfilePage.css';
import PlayerCard from "../../components/playerCard/PlayerCard";
import PlayedGame from "./component/PlayedGame";
import ApiService from "../../services/ApiService";
import {Bounce, Rotate} from "react-awesome-reveal";

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

                <Rotate>
                    <PlayerCard
                        username={username}/>
                </Rotate>
                <div className="playedGames-list-container">

                    {profile && profile.length > 0 ?
                        <>
                            <Bounce cascade>

                                {profile?.map((id, index) => {
                                    return <PlayedGame
                                        id={id}
                                        key={index}/>

                                })}
                            </Bounce>
                        </>
                        :
                        <div className="no-games-played">
                            <h1>Je hebt nog geen spellen gespeeld</h1>
                        </div>
                    }

                </div>
            </div>
        </>

    )
}

export default ProfilePage