import React, {useState} from 'react';
import {Link} from "react-router-dom";
import axios from "axios";
import {useEffect} from 'react'
import './PlayedGame.css'
import checkSum from "../../../components/helpers/checkSum";
import {GiPodiumWinner} from "react-icons/gi";
import checkWinner from "../../../components/helpers/checkWinner";


function PlayedGame({id}) {
    const [scoreData, setScoreData] = useState({})

    const linkStyle = {
        textDecoration: "none",
    };

    async function fetchScores() {
        try {
            const result = await axios.get(`http://localhost:8082/scorecards/card?id=${id}`,
                {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${localStorage.getItem("token")}`
                    }
                })
            setScoreData(result.data);
        } catch (e) {
            console.error(e);
            console.log(e.response.data)
        }
    }

    useEffect(() => {
        fetchScores()
    }, []);

    return <>
        {scoreData && !scoreData.nrOfTurns < 1 &&
            <Link to={`/scorecards/${scoreData.id}`} style={linkStyle}>
                <div className="played-game-outer-container" key={scoreData.id}>
                    <div className="played-game-container-header">
                        <h3>Gespeeld op {scoreData.gespeeldOp}</h3>
                    </div>
                    <div className="played-game-container-inner">
                        {scoreData.playerOneScore &&
                            <div className="played-game-player-score">
                                <div className="played-game-player-winner">
                                    {checkWinner(scoreData.aimScoreP1, checkSum(scoreData.playerOneScore)) &&
                                        <h1><GiPodiumWinner/></h1>}
                                </div>
                                <h1>
                                    {scoreData.playerOneName} {checkSum(scoreData.playerOneScore)}</h1>
                            </div>
                        }
                        {scoreData.playerTwoScore &&
                            <div className="played-game-player-score">

                                <h1>{scoreData.playerTwoName} {checkSum(scoreData.playerTwoScore)}
                                </h1>
                                <div className="played-game-player-winner">
                                    {checkWinner(scoreData.aimScoreP2, checkSum(scoreData.playerTwoScore)) &&
                                        <h1><GiPodiumWinner/></h1>}
                                </div>
                            </div>}
                    </div>

                </div>

            </Link>}
    </>
        ;
}

export default PlayedGame;