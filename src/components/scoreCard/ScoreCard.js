import React, {useEffect, useState} from 'react';
import axios from "axios";
import './ScoreCard.css'
import CheckAverage from '../helpers/checkAverage'
import CheckHighest from "../helpers/checkHighest";
import CheckSum from "../helpers/checkSum";
import Winner from '../../assets/winner.svg'
import CheckWinner from "../helpers/checkWinner";
import Squiggle from '../../assets/squiggle.svg'
import {Link, useParams} from "react-router-dom";

function ScoreCard() {
    const [scoreCardData, setScoreCardData] = useState({})
    const { id } = useParams();

    async function fetchScoreCard() {
        try {
            const result = await axios.get(`http://localhost:8082/scorecards/card?id=${id}`,
                {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${localStorage.getItem("token")}`
                    }
                })
            setScoreCardData(result.data);
            console.log(scoreCardData);
        } catch (e) {
            console.error(e);
            console.log(e.response.data)
        }
    }

    useEffect(() => {
        fetchScoreCard()
    }, []);

    return (
        <>{scoreCardData &&
            <div className="scorecard-container">
                <div className="scorecard-fill-container">

                </div>
                {scoreCardData.playerOneScore &&
                    <div className="scorecard-player-container">
                        <div className="scorecard-player-info-container">
                            <div className="scorecard-player-winner">
                                {CheckWinner(scoreCardData.aimScoreP1, CheckSum(scoreCardData.playerOneScore)) &&
                                    <img className="winner" src={Winner} alt="winner"/>}
                            </div>
                            <div className="scorecard-player-info">

                                <h1>{scoreCardData.playerOneName} ({scoreCardData.aimScoreP1})</h1>
                                <h3>Hoogste serie: {CheckHighest(scoreCardData.playerOneScore)} </h3>
                                <h3>Gemiddelde: {CheckAverage(scoreCardData.playerOneScore)}</h3>
                            </div>
                        </div>
                        <div className="scorecard-player-scores">
                            <ol>
                                <h2>Score: {CheckSum(scoreCardData.playerOneScore)}</h2>
                                {scoreCardData.playerOneScore.map((turn, index) => {
                                    return <li>Beurt {index} : {turn}</li>
                                })}
                            </ol>
                        </div>
                    </div>
                }
                {scoreCardData &&
                    <div className="scorecard-game-info-container">
                        <div className="scorecard-game-info-top">
                            <h1>VS</h1>
                            <img className="squiggle" src={Squiggle} alt="squiggle"/>
                        </div>
                        <div className="scorecard-game-info-bottom">
                            <h2>Aantal beurten:</h2>
                            <h3>{scoreCardData.nrOfTurns}</h3>
                        </div>
                    </div>
                }
                {scoreCardData.playerTwoScore &&
                    <div className="scorecard-player-container">
                        <div className="scorecard-player-info-container">
                            <div className="scorecard-player-winner">
                                {CheckWinner(scoreCardData.aimScoreP2, CheckSum(scoreCardData.playerTwoScore)) &&
                                    <img className="winner" src={Winner} alt="winner"/>}
                            </div>
                            <div className="scorecard-player-info">
                                <h1> {scoreCardData.playerTwoName} ({scoreCardData.aimScoreP2})</h1>
                                <h3>Hoogste serie: {CheckHighest(scoreCardData.playerTwoScore)}</h3>
                                <h3>Gemiddelde: {CheckAverage(scoreCardData.playerTwoScore)}</h3>
                            </div>
                        </div>
                        <div className="scorecard-player-scores">
                            <ol>
                                <h2>Score: {CheckSum(scoreCardData.playerTwoScore)}</h2>
                                {scoreCardData.playerTwoScore && scoreCardData.playerTwoScore.map((turn, index) => {
                                    return <li>Beurt {index} : {turn}</li>;
                                })}
                            </ol>
                        </div>
                    </div>}
                <div className="scorecard-fill-container">
                </div>
            </div>}
        </>
    )
}

export default ScoreCard;