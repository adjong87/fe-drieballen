import React from 'react';
import {useEffect, useState} from "react";
import axios from "axios";
import './Profile.css';

function Profile() {
    const [data, setData] = useState({});

    useEffect(() => {
        async function fetchData() {
            try {
                const result = await axios.get(`http://localhost:8082/members/profile?username=HermanD`)
                setData(result.data);
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
            {data &&
                <div className="profile-container">
                    <h1>Welkom op je profiel pagina</h1>
                    <span>Naam: {data.firstName} {data.lastName}</span>
                    <span>Te behalen score: {data.aimScore}</span>
                    <table className="playedGames">
                        <tr>
                            <th>Wedstrijdnummer</th>
                            <th>
                                Speler 1
                            </th>
                            <th>Speler 2</th>
                            <th>Gespeeld op:</th>
                            <th>Aantal gespeelde beurten</th>
                        </tr>
                        {data.playedGames.map((game) => {
                            return <tr>
                                <th>{game.id.id}</th>
                                <th><a href="#">{game.scoreCard.playerOneName}<span className="tooltip">test test Lorem ipsum dolor sit amet, consectetur adipisicing elit. Beatae inventore iusto mollitia obcaecati repellendus. Alias culpa enim placeat quos tempore!</span></a></th>
                                <th>{game.scoreCard.playerTwoName}</th>
                                <th>{game.scoreCard.gespeeldOp}</th>
                                <th>{game.scoreCard.nrOfTurns}</th>
                            </tr>
                        })}
                    </table>

                    f
                </div>}
        </>
    );
}

export default Profile;