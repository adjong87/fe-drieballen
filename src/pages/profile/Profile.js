import React from 'react';
import {useEffect, useState} from "react";
import axios from "axios";
import './Profile.css';


function Profile() {
    const [data, setData] = useState([]);
    const [playedGames, setPlayedGames] = useState([])

    async function fetchData() {
        try {
            const result = await axios.get(`http://localhost:8082/members/profile?username=HermanD`)
            setData(result.data);
            setPlayedGames(result.data.playedGames)
            console.log(data)
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
            {data &&
                <div className="profile-container">
                    <h1>Welkom op je profiel pagina</h1>
                    <span>Naam: {data.firstName} {data.lastName}</span>
                    <span>Te behalen score: {data.aimScore}</span>
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

export default Profile;