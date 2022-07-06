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
import checkWinner from "../../../components/helpers/checkWinner";
import Winner from '../../../assets/winner.svg'
import Turn from "./components/Turn";

function FillPage() {

    const [scoreCard, setScoreCard] = useState({})
    const [p1Score] = useState([])
    const [p2Score] = useState([])
    const [PPT, setPPT] = useState(0)
    const [P1Active, setP1Active] = useState(true)
    const [finished, toggleFinished] = useState(false)
    const [successful, toggleSuccessful] = useState(false)
    const [restP1, setRestP1] = useState(null)
    const [restP2, setRestP2] = useState(null)

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
                `http://localhost:8082/scorecards/fill?id=${id}`, {
                    playerOneScore: p1Score,
                    playerTwoScore: p2Score,
                    remainderP1: restP1,
                    remainderP2: restP2
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
        toggleSuccessful(!successful)
    };

    function checkRemainder(aimScore, sum){
        if(aimScore - sum > 0){
            return aimScore - sum;
        } else { return 0}
    }

    function handlePlus() {
        setPPT(PPT + 1)
    }

    function handleMinus() {
        PPT > 1 ? setPPT(PPT - 1) : setPPT(0)
    }

    function checkTurns() {
        return p1Score.length === p2Score.length;
    }

    function passTurn() {

        checkTurns()
        {
            P1Active ? p1Score.push(PPT) : p2Score.push(PPT)
        }
        {
            (checkWinner(scoreCard.aimScoreP1, checkSum(p1Score))) && checkTurns ? toggleFinished(true) : setP1Active(!P1Active)
        }
        {
            (checkWinner(scoreCard.aimScoreP2, checkSum(p2Score))) && checkTurns ? toggleFinished(true) : setP1Active(!P1Active)
        }

        setRestP1(checkRemainder(scoreCard.aimScoreP1, checkSum(p1Score)))
        setRestP2(checkRemainder(scoreCard.aimScoreP2, checkSum(p2Score)))
        console.log(finished)
        setPPT(0)
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
                            {checkWinner(scoreCard.aimScoreP1, checkSum(p1Score)) &&
                                <div className="scorecard-current-winner">
                                    <img src={Winner} alt="winner"/>
                                </div>
                            }
                            <h1>{checkSum(p1Score)}</h1>
                        </div>
                        {!finished && P1Active ?
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
                                    return <Turn
                                        key={index + "p1"}
                                        index={index}
                                        turn={turn}
                                        score={p1Score}/>
                                })
                                : <p>Er is nog niet gespeeld</p>}
                        </div>
                    </div>
                    <div className="scorecard-game-info-container">
                        <div className="scorecard-game-info-top">
                            {successful && <h1>SCORES SUCCESVOL DOORGESTUURD</h1>}
                        </div>
                        {!finished &&
                            <div className="scorecard-game-info-middle">
                                {P1Active ? <h2>{scoreCard.playerOneName} aan de beurt</h2> :
                                    <h2> {scoreCard.playerTwoName} aan de beurt</h2>}
                            </div>}
                        <div className="scorecard-game-info-bottom"></div>

                        {finished && !successful &&
                            <div className="successfull">
                                <button
                                    onClick={submitScore}>
                                    scores doorgeven
                                </button>
                            </div>}
                    </div>

                    <div className="scorecard-player-container">
                        <div className="scorecard-current-score">
                            {checkWinner(scoreCard.aimScoreP2, checkSum(p2Score)) &&
                                <div className="scorecard-current-winner">
                                    <img src={Winner} alt="winner"/>
                                </div>
                            }
                            <h1>{checkSum(p2Score)}</h1>
                        </div>
                        {!checkWinner(scoreCard.aimScoreP2, p2Score) && !P1Active ?
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
                            {!p1Score.length < 1 ? p2Score.map((turn, index) => {
                                    return <Turn
                                        key={index + "p2"}
                                        index={index}
                                        turn={turn}
                                        score={p2Score}/>
                                })
                                : <p>Er is nog niet gespeeld</p>}
                        </div>
                    </div>
                    <div className="scorecard-fill-container">
                        {!P1Active && !checkWinner(scoreCard.aimscoreP2, checkSum(p2Score)) &&
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