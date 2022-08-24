import React, {useEffect, useState} from 'react';
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
import checkAverage from "../../../components/helpers/checkAverage";
import ApiService from "../../../services/ApiService";
import checkHighest from "../../../components/helpers/checkHighest";
import {Zoom} from "react-awesome-reveal";
import SR from "../../../components/SR";
import Speech from "../../../components/Speech";

function FillPage() {
    const history = useHistory();
    const { id } = useParams();
    const [scoreCard, setScoreCard] = useState({})
    const p1Score = []
    const p2Score = []
    const [PPT, setPPT] = useState(0)
    const [P1Active, setP1Active] = useState(true)
    const [finished, toggleFinished] = useState(false)
    const [successful, toggleSuccessful] = useState(false)
    const [restP1, setRestP1] = useState()
    const [restP2, setRestP2] = useState()
    const [playerOne, setPlayerOne] = useState({})
    const [playerTwo, setPlayerTwo] = useState({})
    const [edit, toggleEdit] = useState(false)
    const [turns, setTurns] = useState(0)

    const [data, setData] = useState({
        highestSerieP1: 0,
        highestSerieP2: 0,
        remainderP1: 0,
        remainderP2: 0,
        averageP1: 0,
        averageP2: 0,
        nrOfTurns: 0
    })

    useEffect(() => {
        document.title = "de Drie Ballen - Wedstrijd invullen"

        ApiService
            .getScoreCard(id)
            .then(result => {
                setScoreCard(result.data);
                setPlayerOne(result.data[0].profile)
                setPlayerTwo(result.data[1].profile)
                console.log(result.data)
            }).catch(error => console.log(error))
    }, [id]);

    function submitScore() {
        setData({
            ...data,
            highestSerieP1: checkHighest(p1Score),
            highestSerieP2: checkHighest(p2Score),
            remainderP1: restP1,
            remainderP2: restP2,
            averageP1: checkAverage(p1Score),
            averageP2: checkAverage(p2Score),
            nrOfTurns: turns
        })
        ApiService
            .fillScore(id, data)
            .then(() => {
                toggleSuccessful(true)
                setTimeout(() => {
                    history.push("/gamecheck")
                }, 2000)
            }).catch(error => console.log(error))
    }

    function checkRemainder(aimScore, sum) {
        if (sum !== 0 && aimScore - sum > 0) {
            return aimScore - sum;
        } else if (aimScore - sum < 0) {
            return 0
        }
    }

    function handlePlus() {
        setPPT(PPT + 1)
    }

    function handleMinus() {
        PPT > 1 ? setPPT(PPT - 1) : setPPT(0)
    }

    function addTurn() {
        P1Active && setTurns(turns + 1)
    }

    function passTurn(punten) {
        turns === 30 && toggleFinished(true)
        addTurn()
        Speech.say(P1Active ? "Einde Beurt! " + checkSum(p1Score) + " punten voor wit" : "Einde Beurt! " + checkSum(p2Score) + " punten voor geel.", 'Google NL Dutch')

        P1Active ? p1Score.push((punten)) : p2Score.push(parseInt(punten))

        P1Active && (checkWinner(playerOne.aimScore, checkSum(p1Score))) && setP1Active(!P1Active)

        {
            (!P1Active && checkWinner(playerOne.aimScore, checkSum(p1Score))) ? toggleFinished(true) : setP1Active(!P1Active)
        }
        {
            (checkWinner(playerTwo.aimScore, checkSum(p2Score))) ? toggleFinished(true) : setP1Active(!P1Active)
        }

        setRestP1(checkRemainder(playerOne.aimScore, checkSum(p1Score)))
        setRestP2(checkRemainder(playerTwo.aimScore, checkSum(p2Score)))
        Speech.say(P1Active ? PPT + "punten voor " + playerOne.firstName : PPT + "punten voor " + playerTwo.firstName, 'Google NL Dutch');
        setPPT(0)

    }


    return (
        <>
            <SR
                playerActive={P1Active}
                turnScore={PPT}
                setTurnScore={setPPT}
                nextTurn={passTurn}
                p1score={p1Score}
                p2score={p2Score}
            />



            {scoreCard && playerOne && playerTwo && <div className="FillPage-container">

                <div className="FillPage-sides-container">
                    <div className="FillPage-sides-game-content">
                        <h1>{checkSum(p1Score)}</h1>
                    </div>
                    {checkWinner(playerOne.aimScore, checkSum(p1Score)) && <div id="game-winner">
                        <GiPodiumWinner size={70}/>
                    </div>}
                    <Zoom>
                        <div className="FillPage-sides-player-content">

                            {playerOne && <PlayerCard
                                username={playerOne.username}
                                page="fill"
                                key={playerOne.username}/>}
                            ;
                        </div>
                    </Zoom>
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
                            }) : <p>Er is nog niet gespeeld</p>}
                        </div>
                        <div className="FIllPage-middle-score-display-column">
                            {!p2Score.length < 1 ? p2Score.map((turn, index) => {
                                return <Turn
                                    key={index + "p2"}
                                    index={index}
                                    turn={turn}
                                    score={p2Score}/>
                            }) : <p>Er is nog niet gespeeld</p>}
                        </div>

                    </div>
                    {scoreCard && !finished && <div className="scorecard-game-info-middle">
                        {P1Active ? <div id="turn-info">
                            <TbArrowBigLeftLines size={80}/>
                            <h2> {playerOne.firstName} aan de beurt</h2>

                        </div> : <div id="turn-info">

                            <h2>  {playerTwo.firstName} aan de beurt</h2>
                            <TbArrowBigRightLines size={80}/>

                        </div>}
                    </div>}
                    {finished && !successful ? <div className="FillPage-middle-score-submit">
                        <div
                            onClick={submitScore}>
                            Scores opslaan
                        </div>
                    </div> : <div className="FillPage-middle-score-input">
                        {!edit && <div id="score-buttons">
                            <button onClick={handleMinus}>
                                <HiMinusCircle size={70}/>
                            </button>
                            <h1>
                                {PPT}
                            </h1>
                            <button onClick={handlePlus}>
                                <HiPlusCircle size={70}/>
                            </button>
                        </div>}
                        <section>
                            {!edit && <div id="score-edit-button-active"
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
                    {checkWinner(playerTwo.aimScore, checkSum(p2Score)) && <div id="game-winner">
                        <GiPodiumWinner size={70}/>
                    </div>}
                    <Zoom>
                    <div className="FillPage-sides-player-content">

                        {playerTwo && <PlayerCard
                            username={playerTwo.username}
                            page="fill"
                            key={playerTwo.username}/>}
                    </div>
                    </Zoom>
                </div>
            </div>
            }
        </>
    )
}

export default FillPage