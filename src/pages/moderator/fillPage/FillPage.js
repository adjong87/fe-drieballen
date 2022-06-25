import React, {useEffect, useState} from 'react';
import axios from "axios";
import './FillPage.css'
import CheckAverage from '../../../components/helpers/checkAverage'
import CheckHighest from "../../../components/helpers/checkHighest";
import {useParams} from "react-router-dom";
import Plus from '../../../assets/plus.png';
import Minus from '../../../assets/minus.png';
import checkSum from "../../../components/helpers/checkSum";
import checkWinner from "../../../components/helpers/checkWinner";

function FillPage() {

    const [scoreCard, setScoreCard] = useState({})
    const [playerOneScore] = useState([])
    const [playerTwoScore] = useState([])
    const [PPT, setPPT] = useState(0)
    const [P1Active, setP1Active] = useState(true)
    const [numberOfTurns, setNumberOfTurns] = useState(1)
    const [finished, toggleFinished] = useState(false)

    const {id} = useParams();

    async function getScoreCard() {
        console.log("getscorecard wordt aangeroepen")
        try {
            const result = await axios.get(`http://localhost:8082/scorecards/card?id=${id}`,
                {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${localStorage.getItem("token")}`
                    }
                })
            setScoreCard(result.data);
            console.log(scoreCard);
        } catch (e) {
            console.error(e);
            console.log(e.response.data)
        }
    }

    useEffect(() => {
        getScoreCard()
    }, []);


    function handlePlus() {
        setPPT(PPT + 1)
    }

    function handleMinus() {
        {
            setPPT(PPT - 1)
        }
    }

    function passTurn() {
        {
            !P1Active && setNumberOfTurns(numberOfTurns + 1)
        }
        {
            P1Active ? playerOneScore.push(PPT) : playerTwoScore.push(PPT)
        }
        checkWin()
        setPPT(0)
        setP1Active(!P1Active)
    }

    function checkWin() {
        if (playerOneScore.length === playerTwoScore.length) {
            if (checkWinner(scoreCard.aimScoreP1, checkSum(playerOneScore)) || (checkWinner(scoreCard.aimScoreP2, checkSum(playerTwoScore)))) {
                toggleFinished(true)
            }
            console.log(finished)

        }
    }

    return (

        <>
            {scoreCard &&
                <div className="scorecard-container">
                    <div className="scorecard-fill-container">
                        {P1Active &&
                            <div className="score-module">
                                <button onClick={handlePlus}>
                                    <img src={Plus} alt="plus"/>
                                </button>
                                <input
                                    type="number"
                                    id="playerOne"
                                    value=''
                                    placeholder={PPT}
                                    onChange={((e) => {
                                        setPPT(e.target.value)
                                    })}/>
                                <button onClick={handleMinus}>
                                    <img src={Minus} alt="minus"/>
                                </button>
                                <button
                                    onClick={passTurn}>BEURT DOORGEVEN
                                </button>
                            </div>}
                    </div>
                    <div className="scorecard-player-container">
                        <div className="scorecard-current-score">
                            <h1>{checkSum(playerOneScore)}</h1>
                        </div>
                        <div className="scorecard-current-turn">
                            <h2>Deze beurt: </h2>
                            <h1> {!P1Active ? "" : PPT}</h1>
                        </div>
                        <div className="scorecard-player-info-container">
                            <div className="scorecard-player-winner">

                            </div>
                            <div className="scorecard-player-info">

                                <h1>{scoreCard.playerOneName} ({scoreCard.aimScoreP1})</h1>
                                <h3>Hoogste
                                    serie: {playerOneScore.length < 1 ? "?" : CheckHighest(playerOneScore)} </h3>
                                <h3>Gemiddelde: {CheckAverage(playerOneScore) <= 0 ? "?" : CheckAverage(playerOneScore)}</h3>
                            </div>
                        </div>
                        <div className="scorecard-player-scores">
                            {!playerOneScore.length < 1 ? playerOneScore.map((turn, index) => {
                                    return <p><b>Beurt {index + 1} </b>  : {turn}</p>
                                })
                                : <p>Er is nog niet gespeeld</p>}
                        </div>
                    </div>
                    <div className="scorecard-game-info-container">
                        <div className="scorecard-game-info-top">
                            <h1>VS</h1>
                        </div>
                        <div className="scorecard-game-info-bottom">
                            <h2>Beurt</h2>
                            <h3>#{numberOfTurns}</h3>
                        </div>
                    </div>

                    <div className="scorecard-player-container">
                        <div className="scorecard-current-score">
                            <h1>{checkSum(playerTwoScore)}</h1>
                        </div>
                        <div className="scorecard-current-turn">
                            <h2>Deze beurt: </h2>
                            <h1> {P1Active ? "" : PPT}</h1>
                        </div>
                        <div className="scorecard-player-info-container">
                            <div className="scorecard-player-winner">

                            </div>
                            <div className="scorecard-player-info">

                                <h1>{scoreCard.playerTwoName} ({scoreCard.aimScoreP2})</h1>
                                <h3>Hoogste
                                    serie: {playerTwoScore.length < 1 ? "?" : CheckHighest(playerTwoScore)} </h3>
                                <h3>Gemiddelde: {CheckAverage(playerTwoScore) <= 0 ? "?" : CheckAverage(playerTwoScore)}</h3>
                            </div>
                        </div>
                        <div className="scorecard-player-scores">
                            {!playerTwoScore.length < 1 ? playerTwoScore.map((turn, index) => {
                                    return <p>Beurt {index + 1} {turn}</p>
                                })
                                : <p>Er is nog niet gespeeld</p>}
                        </div>
                    </div>
                    <div className="scorecard-fill-container">
                        {!P1Active &&
                            <div className="score-module">
                                <button onClick={handlePlus}>
                                    <img src={Plus} alt="plus"/>
                                </button>
                                <input
                                    type="number"
                                    id="playerTwo"
                                    value={PPT}
                                    placeholder="score"
                                    onChange={((e) => {
                                        setPPT(e.target.value)
                                    })}/>
                                <button onClick={handleMinus}>
                                    <img src={Minus} alt="minus"/>
                                </button>
                                <button
                                    onClick={passTurn}>BEURT DOORGEVEN
                                </button>
                            </div>
                        }
                    </div>

                </div>
            }
        </>
    )
}

export default FillPage