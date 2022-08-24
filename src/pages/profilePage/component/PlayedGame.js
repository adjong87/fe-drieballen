import React, {useState} from 'react';
import {useEffect} from 'react'
import './PlayedGame.css'
import {GiPodiumWinner} from "react-icons/gi";
import ApiService from "../../../services/ApiService";

function PlayedGame({id}) {
    const [scoreData, setScoreData] = useState({})

    useEffect(() => {
        ApiService
            .getPlayedGame(id)
            .then(res => setScoreData(res.data))
            .catch(err => console.log(err))
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
                                {scoreData && <span>
                                    <p>
                                        Hoogste serie: {scoreData.highestSerieP1}
                                    </p>
                                <p>Gemiddelde: {scoreData.averageP1}
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
                            <b>{scoreData.gespeeldOp}</b>
                            <p>Aantal Beurten {scoreData.nrOfTurns}</p>
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
                                {scoreData && <span>
                                    <p>
                                        Hoogste serie: {scoreData.highestSerieP2}
                                    </p>
                                <p>
                                    Gemiddelde: {scoreData.averageP2}
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