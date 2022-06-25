import React, {useEffect, useState} from 'react';
import axios from "axios";
import './FillPage.css'
import CheckAverage from '../../../components/helpers/checkAverage'
import CheckHighest from "../../../components/helpers/checkHighest";
import {useParams} from "react-router-dom";
import Plus from '../../../assets/plus.png';
import Minus from '../../../assets/minus.png';
import checkSum from "../../../components/helpers/checkSum";
import showTurn from "../../../components/helpers/showTurn";

function FillPage() {

    const [scoreCard, setScoreCard] = useState({})
    const [p1Score] = useState([])
    const [p2Score] = useState([])
    const [PPT, setPPT] = useState(0)
    const [P1Active, setP1Active] = useState(true)
    const [finished, toggleFinished] = useState(false)
    const [succesfull, toggleSuccesfull] = useState(false)
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


    function submitScore() {
        try {
            axios.put(
                `http://localhost:8082/scorecards/fill?scoreCardNumber=${id}`, {
                    playerOneScore: p1Score,
                    playerTwoScore: p2Score
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        "Authorization": `Bearer ${localStorage.getItem("token")}`
                    }
                }
            )
        } catch (e) {
            console.error(e.message)
        }
        toggleSuccesfull(!succesfull)
    };


    function handlePlus() {
        setPPT(PPT + 1)
    }

    function handleMinus() {
        {
            PPT > 1 ? setPPT(PPT - 1) : setPPT(0)
        }
    }

    function passTurn() {
        if (p1Score.length === 5 && p2Score.length === 5) {
            toggleFinished(true)
            console.log(finished)

        } else if (!finished) {
            P1Active ? p1Score.push(PPT) : p2Score.push(PPT)
            setPPT(null)
            setP1Active(!P1Active)
        }
    }


    return (
        <>
            {scoreCard &&
                <div className="scorecard-container">
                    <div className="scorecard-fill-container">
                        {P1Active && !finished &&
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
                            <h1>{checkSum(p1Score)}</h1>
                        </div>
                        {P1Active ?
                            <div className="scorecard-current-turn">
                                <h2>BEURT {showTurn(p1Score)}</h2>
                                <h1>{PPT}</h1>
                            </div> : <div className="scorecard-current-turn"></div>}
                        <div className="scorecard-player-info-container">
                            <div className="scorecard-player-winner">

                            </div>
                            <div className="scorecard-player-info">

                                <h1>{scoreCard.playerOneName} ({scoreCard.aimScoreP1})</h1>
                                <h3>Hoogste
                                    serie: {p1Score.length < 1 ? "?" : CheckHighest(p1Score)} </h3>
                                <h3>Gemiddelde: {CheckAverage(p1Score) <= 0 ? "?" : CheckAverage(p1Score)}</h3>
                            </div>
                        </div>
                        <div className="scorecard-player-scores">
                            {!p1Score.length < 1 ? p1Score.map((turn, index) => {
                                    return <p><b>Beurt {index + 1} </b> : {turn}</p>
                                })
                                : <p>Er is nog niet gespeeld</p>}
                        </div>
                    </div>
                    <div className="scorecard-game-info-container">
                        <div className="scorecard-game-info-top">
                            {succesfull && <h1>SCORES SUCCESVOL DOORGESTUURD</h1>}
                        </div>
                        <div className="scorecard-game-info-middle">
                            {P1Active ? <h2>{scoreCard.playerOneName} aan de beurt</h2> :
                                <h2> {scoreCard.playerTwoName} aan de beurt</h2>}
                        </div>
                        <div className="scorecard-game-info-bottom"></div>

                        {finished && !succesfull &&
                            <div className="successfull">
                                <button
                                    onClick={submitScore}>
                                    scores doorgeven
                                </button>
                            </div>}
                    </div>

                    <div className="scorecard-player-container">
                        <div className="scorecard-current-score">
                            <h1>{checkSum(p2Score)}</h1>
                        </div>
                        {!P1Active ?
                            <div className="scorecard-current-turn">
                                <h2>BEURT {showTurn(p2Score)}</h2>
                                <h1>{PPT}</h1>
                            </div> : <div className="scorecard-current-turn"></div>}
                        <div className="scorecard-player-info-container">
                            <div className="scorecard-player-winner">

                            </div>
                            <div className="scorecard-player-info">

                                <h1>{scoreCard.playerTwoName} ({scoreCard.aimScoreP2})</h1>
                                <h3>Hoogste
                                    serie: {p2Score.length < 1 ? "?" : CheckHighest(p2Score)} </h3>
                                <h3>Gemiddelde: {CheckAverage(p2Score) <= 0 ? "?" : CheckAverage(p2Score)}</h3>
                            </div>
                        </div>
                        <div className="scorecard-player-scores">
                            {!p2Score.length < 1 ? p2Score.map((turn, index) => {
                                    return <p>Beurt {index + 1} {turn}</p>
                                })
                                : <p>Er is nog niet gespeeld</p>}
                        </div>
                    </div>
                    <div className="scorecard-fill-container">
                        {!P1Active && !finished &&
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