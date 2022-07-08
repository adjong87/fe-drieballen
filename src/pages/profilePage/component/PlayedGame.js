import React, {useState} from 'react';
import {Link} from "react-router-dom";
import axios from "axios";
import {useEffect} from 'react'
import './PlayedGame.css'
import {GiPodiumWinner} from "react-icons/gi";
import CheckAverage from "../../../components/helpers/checkAverage";
import CheckHighest from "../../../components/helpers/checkHighest";

function PlayedGame({id}) {
    const [scoreData, setScoreData] = useState({})


    async function fetchScores() {
        try {
            const result = await axios.get(`http://localhost:8082/scorecards/donecard?id=${id}`,
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

    return (
        <>
            <div className="playedGame-container">
                {scoreData &&
                    <div className="playedGame-contents">
                        <div className="playedGame-contents-sides">


                            <section>
                                {scoreData &&
                                    <div>
                                        {scoreData.aimScoreP1 - scoreData.remainderP1} van de {scoreData.aimScoreP1}


                                    </div>
                                }
                                {scoreData.playerOneScore && <span>
                                    <p>Hoogste serie: {scoreData.playerOneScore.length < 1
                                        ?
                                        "?"
                                        :
                                        CheckHighest(scoreData.playerOneScore)}
                                    </p>
                                <p>Gemiddelde: {CheckAverage(scoreData.playerOneScore) <= 0
                                    ?
                                    "?"
                                    :
                                    CheckAverage(scoreData.playerOneScore)}
                                </p>
                                </span>
                                }
                            </section>
                            <div id="player-name">
                                {scoreData.remainderP1 === 0 &&
                                    <GiPodiumWinner size={40}/>
                                }
                                <h2>
                                    {scoreData.playerOneName}
                                </h2>
                            </div>
                        </div>
                        <div className="playedGame-contents-middle">
                            {scoreData.gespeeldOp}
                        </div>
                        <div className="playedGame-contents-sides">
                            <div id="player-name">
                                {scoreData.remainderP2 === 0 &&
                                    <GiPodiumWinner size={40}/>
                                }
                                <h2>
                                    {scoreData.playerTwoName}
                                </h2>
                            </div>
                            <section>
                                {scoreData &&
                                    <div>
                                        {scoreData.aimScoreP2 - scoreData.remainderP2} van de {scoreData.aimScoreP2}
                                    </div>
                                }
                                {scoreData.playerTwoScore &&
                                    <span>
                                        <p>Hoogste serie: {scoreData.playerTwoScore.length < 1
                                            ?
                                            "?"
                                            :
                                            CheckHighest(scoreData.playerTwoScore)}
                                        </p>
                                <p>Gemiddelde: {CheckAverage(scoreData.playerTwoScore) <= 0
                                    ?
                                    "?"
                                    :
                                    CheckAverage(scoreData.playerTwoScore)}
                                </p>
                                    </span>
                                }
                            </section>

                        </div>


                    </div>
                }
            </div>
        </>
    );
}

export default PlayedGame;