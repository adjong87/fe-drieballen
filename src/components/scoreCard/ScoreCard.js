import {useEffect, useState} from 'react';
import axios from "axios";
import React from 'react';
import './ScoreCard.css'
import CheckAverage from '../helpers/CheckAverage'
import CheckHighest from "../helpers/CheckHighest";
import CheckSum from "../helpers/CheckSum";
import Winner from '../../assets/winner.svg'
import CheckWinner from "../helpers/CheckWinner";
import Squiggle from '../../assets/squiggle.svg'

function ScoreCard() {

    // const [scoreCard, setScoreCard] = useState({});
    //
    // async function fetchScoreCard() {
    //     try {
    //         const result = await axios.get(`http://localhost:8082/scorecards/card?id=1`)
    //         setScoreCard(result.data);
    //         console.log(scoreCard)
    //     } catch (e) {
    //         console.error(e);
    //         console.log(e.response.data)
    //     }
    // }
    // useEffect(() => {
    //     fetchScoreCard()
    // }, []);


    const [scoreCardData, setScoreCardData] = useState([]);

    const getData = () => {
        fetch('data2.json'
            , {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            }
        )
            .then(function (response) {
                console.log(response)
                return response.json();
            })
            .then(function (myJson) {
                console.log(myJson);
                setScoreCardData(myJson)
            });
    }
    useEffect(() => {
        getData()
    }, [])

    return (
        <>
            <div className="scorecard-container">
                {scoreCardData.playerOneScore &&
                    <div className="scorecard-player-container">
                        <div className="scorecard-player-info">
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
                                {scoreCardData.playerOneScore.map((turn) => {
                                    return <li>{turn}</li>
                                })}
                            </ol>
                        </div>
                    </div>
                }
                {scoreCardData &&
                    <div className="scorecard-game-info-container">
                        <div className="scorecard-game-info-top">
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
                                {scoreCardData.playerTwoScore && scoreCardData.playerTwoScore.map((turn) => {
                                    return <li>{turn}</li>
                                })}
                            </ol>
                        </div>
                    </div>}
            </div>
        </>
    )
}

export default ScoreCard;