import React, {useEffect, useState} from 'react';
import axios from "axios";
import './FillPage.css'
import CheckAverage from '../../../components/helpers/checkAverage'
import CheckHighest from "../../../components/helpers/checkHighest";
import {useParams} from "react-router-dom";
import Plus from '../../../assets/plus.png';
import Minus from '../../../assets/minus.png';

function FillPage() {

    const [scoreCard, setScoreCard] = useState({})
    const [playerOneScore] = useState([])
    const [playerTwoScore] = useState([])
    const [PPTP1, setPPTP1] = useState(0)
    const [PPTP2, setPPTP2] = useState(0)
    const [P1Active, setP1Active] = useState(true)
    // const [playerTwoTurn, setPlayerTwoTurn] = useState(0)

    const [numberOfTurns, setNumberOfTurns] = useState(0)

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
    }, [id]);

    function handlePlus() {
        {
            P1Active ? setPPTP1(PPTP1 + 1) : setPPTP2(PPTP2 + 1)
        }
    }

    function handleMinus() {
        {
            P1Active ? setPPTP1(PPTP1 - 1) : setPPTP2(PPTP2 - 1)
        }
    }

    function passTurn() {
        {
            P1Active ? playerOneScore.push(PPTP1) : playerTwoScore.push(PPTP2)
        }
        console.log(PPTP1 + PPTP2)
        setPPTP1(0)
        setPPTP2(0)
        setP1Active(!P1Active)
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
                                    value={PPTP1}
                                    placeholder="score"
                                    onChange={((e) => {
                                        setPPTP1(e.target.value)
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
                    <div className="scorecard-player-container">
                        <div>
                            <h2>Deze beurt: </h2>
                            <h1> {PPTP1}</h1>
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
                            {!playerOneScore ? playerOneScore.map((turn, index) => {
                                return <p>Beurt {index + 1}  {turn}</p>})
                             : <p>Er is nog niet gespeeld</p>}
                        </div>
                    </div>
                    <div className="scorecard-game-info-container">
                        <div className="scorecard-game-info-top">
                            <h1>VS</h1>
                        </div>
                        <div className="scorecard-game-info-bottom">
                            <h2>Aantal beurten:</h2>
                            <h3>{numberOfTurns}</h3>
                        </div>
                    </div>

                    <div className="scorecard-player-container">
                        <div>
                            <h2>Deze beurt: </h2>
                            <h1> {PPTP2}</h1>
                        </div>
                        <div className="scorecard-player-info-container">
                            <div className="scorecard-player-winner">
                            </div>
                            <div className="scorecard-player-info">
                                <h1>{scoreCard.playerTwoName} ({scoreCard.aimScoreP1})</h1>
                                <h3>Hoogste
                                    serie: {playerTwoScore.length < 1 ? "?" : CheckHighest(playerTwoScore)} </h3>
                                <h3>Gemiddelde: {CheckAverage(playerTwoScore) <= 0 ? "?" : CheckAverage(playerTwoScore)}</h3>
                            </div>
                        </div>
                        <div className="scorecard-player-scores">
                            {!playerTwoScore.length < 1 ? playerTwoScore.map((turn, index) => {
                                    return <p>Beurt {index + 1}  {turn}</p>})
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
                                    value={PPTP2}
                                    placeholder="score"
                                    onChange={((e) => {
                                        setPPTP2(e.target.value)
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