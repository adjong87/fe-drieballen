import React, {useContext} from 'react';
import {useEffect, useState} from "react";
import axios from "axios";
import './Profile.css';
import {useParams} from "react-router-dom";
import {AuthContext} from "../../components/context/AuthContext";

function Profile() {

    const {data, contextData} = useContext(AuthContext)
    const [userData, setUserData] = useState({})
    const [playedGames, setPlayedGames] = useState({})

    const {username} = useParams();

    useEffect(() => {
        async function getProfile() {
            try {
                const result = await axios({
                    method: "get",
                    url: `http://localhost:8082/members/profile?username=${username}`,
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    }
                })
                console.log(result)
                setUserData(result)
                setPlayedGames(result.playedGames)
                console.log("dit is de data uit de authcontext" + data)
                console.log("dit is de authcontext" + contextData)
            } catch (e) {
                console.error(e.message)
            }
        }

        getProfile()

    }, [])

    return (
        <>
            {userData &&
                <div className="profile-container">
                    <h1>Welkom op je profiel pagina</h1>
                    <span>Naam: {userData.firstName} {userData.lastName}</span>
                    <span>Te behalen score: {userData.aimScore}</span>
                </div>}
            {playedGames && playedGames.map((game) => {
                return <table className="playedGames">
                    <tr>
                        <th>Wedstrijdnummer</th>
                        <th>Speler 1</th>
                        <th>Speler 2</th>
                        <th>Gespeeld op:</th>
                        <th>Aantal gespeelde beurten</th>
                    </tr>
                    <tr>
                        <td>{game.id.id}</td>
                        <td>{game.scoreCard.playerOneName}</td>
                        <td>{game.scoreCard.playerTwoName}</td>
                        <td>{game.scoreCard.gespeeldOp}</td>
                        <td>{game.scoreCard.nrOfTurns}</td>
                    </tr>
                </table>
            })}

            {/*{playedGames ?  <div> gespeeld </div> : <div>niet gespeeld</div>}*/}
        </>
    );
}

export default Profile