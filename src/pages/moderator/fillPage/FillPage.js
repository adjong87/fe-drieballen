import React, {useEffect, useState} from 'react';
import axios from "axios";
import './FillPage.css'
import {useParams} from "react-router-dom";
import checkSum from "../../../components/helpers/checkSum";
import checkWinner from "../../../components/helpers/checkWinner";
import PlayerCard from "../../../components/playerCard/PlayerCard";
import {HiMinusCircle, HiPlusCircle} from "react-icons/hi";
import Turn from "./components/Turn";
import {TbArrowBigLeftLines, TbArrowBigRightLines} from "react-icons/tb";
import {GiPodiumWinner} from "react-icons/gi";
import {useHistory} from 'react-router-dom';

function FillPage() {
    const history = useHistory();
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
    const [playerOne, setPlayerOne] = useState([])
    const [playerTwo, setPlayerTwo] = useState([])
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
            setPlayerOne(result.data[0].profile)
            setPlayerTwo(result.data[1].profile)
            console.log(playerOne)
            console.log(playerTwo)
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
        history.push("/gamecheck");
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
        P1Active ? p1Score.push(PPT) : p2Score.push(PPT)

        {
            (checkWinner(playerOne.aimScore, checkSum(p1Score))) && checkTurns ? toggleFinished(true) : setP1Active(!P1Active)
        }
        {
            (checkWinner(playerTwo.aimScore, checkSum(p2Score))) && checkTurns ? toggleFinished(true) : setP1Active(!P1Active)
        }

        setRestP1(checkRemainder(playerTwo.aimScore, checkSum(p1Score)))
        setRestP2(checkRemainder(playerTwo.aimScore, checkSum(p2Score)))
        console.log(finished)
        setPPT(0)
    }

    return (
        <>
            {scoreCard &&
                <div className="FillPage-container">

                    <div className="FillPage-sides-container">
                        <div className="FillPage-sides-game-content">
                            <h1>{checkSum(p1Score)}</h1>
                        </div>
                        {checkWinner(playerOne.aimScore, checkSum(p1Score)) &&
                            <div id="game-winner">
                                <GiPodiumWinner size={70}/>
                            </div>}
                        <div className="FillPage-sides-player-content">

                            <PlayerCard username={playerOne.username} key={playerOne.username}/>
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
                        {scoreCard && !finished &&
                            <div className="scorecard-game-info-middle">
                                {P1Active
                                    ?
                                    <div id="turn-info">
                                       <TbArrowBigLeftLines size={80}/>
                                        <h2> {playerOne.firstName} aan de beurt</h2>

                                    </div>
                                    :
                                    <div id="turn-info">

                                        <h2>  {playerTwo.firstName} aan de beurt</h2>
                                            <TbArrowBigRightLines size={80}/>

                                    </div>}
                            </div>}
                        {finished && !successful ?
                            <div className="successfull">
                                <button
                                    onClick={submitScore}>
                                    scores doorgeven
                                </button>
                            </div> :
                            <div className="FillPage-middle-score-input">
                                {!edit &&
                                    <div id="score-buttons">
                                        <button onClick={handleMinus}>
                                            <HiMinusCircle size={70}/>
                                        </button>
                                        <h1>
                                            {PPT}
                                        </h1>
                                        <button onClick={handlePlus}>
                                            <HiPlusCircle size={70}/>
                                        </button>
                                    </div>
                                }
                                <section>
                                    {!edit &&
                                        <div id="score-edit-button-active"
                                             onClick={passTurn}>Score invoeren
                                        </div>}
                                    <div id={!edit ? 'score-edit-button' : 'score-edit-button-active'}
                                         onClick={(() => {
                                             toggleEdit(!edit)
                                         })}>
                                        {!edit ? "CORRECTIE" : "CORRECTIE OPSLAAN"}
                                    </div>
                                </section>
                            </div>}
                    </div>
                    <div className="FillPage-sides-container">
                        <div className="FillPage-sides-game-content">
                            <h1>{checkSum(p2Score)}</h1>
                        </div>
                        {checkWinner(playerTwo.aimScore, checkSum(p2Score)) &&
                            <div id="game-winner">
                                <GiPodiumWinner size={70}/>
                            </div>}
                        <div className="FillPage-sides-player-content">

                            <PlayerCard username={playerTwo.username} key={playerTwo.username}/>
                        </div>
                    </div>
                </div>
            }
        </>
    )
}

export default FillPage