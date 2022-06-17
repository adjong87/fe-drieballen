import React from 'react';
import {useEffect, useState} from "react";
import axios from "axios";
import './Profile.css';

function Profile() {
    const [data, setData] = useState({});
    const username = "HermanD";
    const [playedGames, setPlayedGames] = useState('{}');

    useEffect(() => {
        async function fetchData() {
            try {
                const result = await axios.get(`http://localhost:8082/members/profile?username=${username}`)
                setData(result.data);
                setPlayedGames(result.data.playedGames)
                console.log(data)
            } catch (e) {
                console.error(e);
                console.log(e.response.data)
            }
        }

        fetchData()
    }, []);

    return (
        <>
            <div className="profile-container">
                <h1>Welkom op je profiel pagina</h1>
                <span>Naam: {data.firstName} {data.lastName}</span>
                <span>Te behalen score: {data.aimScore}</span>

                <table className="playedGames">
                    <tr>
                        <th>Wedstrijdnummer</th>
                        <th>Speler 1</th>
                        <th>Speler 2</th>
                        <th>Gespeeld op:</th>
                    </tr>
                    {playedGames.map((game) => {
                        return <tr>
                            <th>{game.id.id}</th>
                            <th>{game.scoreCard.playerOneName}</th>
                            <th>{game.scoreCard.playerTwoName}</th>
                            <th>{game.scoreCard.gespeeldOp}</th>
                        </tr>
                    })}
                </table>
                f
            </div>
        </>
    );
}

export default Profile;