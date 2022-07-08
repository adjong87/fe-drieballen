import {useEffect, useState} from 'react'
import axios from "axios";
import './ScoreCardOverview.css'
import React from 'react';
import {Link} from "react-router-dom";

function ScoreCardOverview() {
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
            console.log(scoreCardData)
        } catch (e) {
            console.error(e);
            console.log(e.response.data)
        }
    }

    useEffect(() => {
        fetchData()
    }, [])

    return (
        <div className="scorecard-overview-outer-container">
            {(scoreCardData < 1) ? <h2> Vraag de voorzitter om een wedstrijd klaar te zetten </h2> : <h2>Ready to rumble</h2>}
            <div className="scorecard-overview-inner-container">
                {scoreCardData && scoreCardData.map((scoreCard, index) => {
                    return (
                        <Link to={`/fill/${scoreCard.id}`}>
                        <div className="scorecard-overview-card" key={scoreCard.id + index}>
                            <span><h4>Speeldatum: {scoreCard.gespeeldOp}</h4></span>
                            <span><h2>{scoreCard.playerOneName} ({scoreCard.aimScoreP1}) versus {scoreCard.playerTwoName} ({scoreCard.aimScoreP2})</h2></span>
                        </div>
                </Link>
                )
                })}
            </div>
        </div>

    )
}

export default ScoreCardOverview