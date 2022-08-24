import {useEffect, useState} from 'react'
import './GameCheckPage.css'
import React from 'react';
import {Link} from "react-router-dom";
import ApiService from "../../../services/ApiService";
import {Slide} from "react-awesome-reveal";

function GameCheckPage() {
    const [scoreCardData, setScoreCardData] = useState([]);

    useEffect(() => {
        document.title = "de Drie Ballen - Spellen overzicht"
        ApiService
            .checkGames()
            .then(response => setScoreCardData(response.data))
            .catch(error => console.log(error))
        {console.log(scoreCardData)}

    }, [])

    return (
        <div className="gamecheck-container">
            {(scoreCardData < 1) ? <h1> Vraag de voorzitter om een wedstrijd klaar te zetten </h1> :
                <h1>Nog te spelen wedstrijden</h1>}
            <Slide direction="right" cascade>
            {scoreCardData && scoreCardData?.map((scoreCard, index) => {
                return (
                    <Link to={`/fill/${scoreCard.id}`}
                          style={{textDecoration: 'none'}}
                          key={scoreCard.id + index}>
                        <div className="gamecheck-contents">
                            <div className="gamecheck-contents-sides">
                                <h1>
                                    {scoreCard.aimScoreP1}
                                </h1>
                                <h2>
                                    {scoreCard.playerOneName}
                                </h2>
                            </div>
                            <div className="gamecheck-contents-middle">
                                <b>
                                    {scoreCard.gespeeldOp}
                                </b>
                            </div>
                            <div className="gamecheck-contents-sides">

                                <h2>
                                    {scoreCard.playerTwoName}
                                </h2>
                                <h1>
                                    {scoreCard.aimScoreP2}
                                </h1>
                            </div>
                        </div>
                    </Link>)
            })}
            </Slide>
        </div>

    )
}

export default GameCheckPage