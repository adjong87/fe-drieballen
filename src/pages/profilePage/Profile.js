import React, {useContext, useEffect, useState} from 'react';
import axios from "axios";
import './Profile.css';
import {Link, useParams} from "react-router-dom";
import {AuthContext} from "../../components/context/AuthContext";

function Profile() {

    const { user } = useContext(AuthContext);
    const [userData, setUserData] = useState({})
    const username = user.username

    async function fetchData() {
        try {
            const result = await axios.get("http://localhost:8082/members/profile?username=" + username,
                {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${localStorage.getItem("token")}`
                    }
                })

            setUserData(result.data);
            console.log(userData);
        } catch (e) {
            console.error(e);
            console.log(e.response.data)
        }
    }

    useEffect(() => {
        fetchData()
    }, []);

    return (
        <>
            {userData &&
                <div className="profile-container">
                    <h1>Welkom op je profiel pagina</h1>
                    <span>Naam: {userData.firstName} {userData.lastName}</span>
                    <span>Te behalen score: {userData.aimScore}</span>
                </div>}
            {userData.playedGames &&
                <table className="playedGames">
                    <tr>
                        <th>Wedstrijdnummer</th>
                        <th>Speler 1</th>
                        <th>Speler 2</th>
                        <th>Gespeeld op:</th>
                        <th>Aantal gespeelde beurten</th>
                    </tr>
                    {userData.playedGames.map((game, index) => {
                        return <tr key={index}>
                            <Link to={`/scorecards/${game.id.id}`}>
                                <td>{game.id.id}</td>
                            </Link>
                            <td>{game.scoreCard.playerOneName}</td>
                            <td>{game.scoreCard.playerTwoName}</td>
                            <td>{game.scoreCard.gespeeldOp}</td>
                            <td>{game.scoreCard.nrOfTurns}</td>

                        </tr>
                    })}
                </table>}
        </>
    )
}

export default Profile