import {useEffect, useState} from 'react'
import axios from "axios";
import './GameCheckPage.css'
import React from 'react';
import {Link} from "react-router-dom";

function GameCheckPage() {
    const [scoreCardData, setScoreCardData] = useState([]);

    async function fetchData() {
        try {
            const result = await axios.get("http://localhost:8082/scorecards/referee",
                {
                    headers:
                        {
                            'Content-Type': 'application/json',
                            "Authorization": `Bearer ${localStorage.getItem("token")}`
                        }
                })
            setScoreCardData(result.data);
        } catch (e) {
            console.error(e);
            console.log(e.response.data)
        }
    }

    useEffect(() => {
        fetchData()
    }, [])

    return (

        <div className="gamecheck-container">
            {(scoreCardData < 1) ? <h1> Vraag de voorzitter om een wedstrijd klaar te zetten </h1> :
                <h1>Nog te spelen wedstrijden</h1>}
            {scoreCardData && scoreCardData.map((scoreCard, index) => {
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
        </div>

    )
}

export default GameCheckPage