import React, {useEffect, useState} from 'react';
import axios from "axios";
import './FillPage.css'
import {useParams} from "react-router-dom";
import checkSum from "../../../components/helpers/checkSum";
import checkWinner from "../../../components/helpers/checkWinner";
import PlayerCard from "../../../components/playerCard/PlayerCard";
import {HiMinusCircle, HiPlusCircle} from "react-icons/hi";
import Turn from "./components/Turn";

function FillPage() {
    const {id} = useParams();
    const [scoreCard, setScoreCard] = useState({})
    const [p1Score] = useState([])
    const [p2Score] = useState([])
    const [PPT, setPPT] = useState(0)
    const [P1Active, setP1Active] = useState(true)
    const [finished, toggleFinished] = useState(false)
    const [successful, toggleSuccessful] = useState(false)
    const [restP1, setRestP1] = useState(null)
    const [restP2, setRestP2] = useState(null)
    const [playerOne, setPlayerOne] = useState()
    const [playerTwo, setPlayerTwo] = useState()
    const [edit, toggleEdit] = useState(false)


    async function getScoreCard() {

        console.log("getscorecard wordt aangeroepen")
        try {
            const result = await axios.get(`http://localhost:8082/playedgame/findbyid?id=${id}`,
                {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${localStorage.getItem("token")}`
                    }
                })
            setScoreCard(result.data);
            setPlayerOne(result.data[0].profile.username)
            setPlayerTwo(result.data[1].profile.username)
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

    function checkRemainder(aimScore, sum) {
        if (aimScore - sum > 0) {
            return aimScore - sum;
        } else {
            return 0
        }
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
                <div className="FillPage-container">

                    <div className="FillPage-sides-container">
                        <div className="FillPage-sides-content-top">
                            <h1>{checkSum(p1Score)}</h1>
                        </div>

                        <div className="FillPage-sides-content-bottom">
                            <PlayerCard username={playerOne} key={playerOne}/>
                        </div>
                    </div>
                    <div className="FillPage-middle-column">
                        <div className="FIllPage-middle-score-display">
                            <div className="FIllPage-middle-score-display-column">
                                {!p1Score.length < 1 ? p1Score.map((turn, index) => {
                                        return <Turn
                                            key={index + "p1"}
                                            index={index}
                                            turn={turn}
                                            score={p1Score}
                                            edit={edit}/>
                                    })
                                    : <p>Er is nog niet gespeeld</p>}
                            </div>
                            <div className="FIllPage-middle-score-display-column">
                                {!p2Score.length < 1 ? p2Score.map((turn, index) => {
                                        return <Turn
                                            key={index + "p2"}
                                            index={index}
                                            turn={turn}
                                            score={p2Score}/>
                                    })
                                    : <p>Er is nog niet gespeeld</p>}
                            </div>

                        </div>

                        <div className="FillPage-middle-score-input">
                            {!edit &&
                                <section id="score-buttons">
                                    <button onClick={handlePlus}>
                                        <HiPlusCircle size={40}/>
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
                                        <HiMinusCircle size={40}/>
                                    </button>
                                    <button
                                        onClick={passTurn}>BEURT DOORGEVEN
                                    </button>
                                </section>}
                            <section id="score-edit-button">
                                <button onClick={(() => {
                                    toggleEdit(!edit)
                                })}>
                                    {!edit ? "CORRECTIE" : "CORRECTIE OPSLAAN"}
                                </button>
                            </section>
                        </div>
                    </div>
                    <div className="FillPage-sides-container">
                        <div className="FillPage-sides-content-top">
                            <h1>{checkSum(p2Score)}</h1>
                        </div>

                        <div className="FillPage-sides-content-bottom">
                            <PlayerCard username={playerTwo} key={playerTwo}/>
                        </div>
                    </div>
                </div>
            }
        </>
    )
}

export default FillPage