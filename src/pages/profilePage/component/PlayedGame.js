import React, {useState} from 'react';
import {Link} from "react-router-dom";
import axios from "axios";
import {useEffect} from 'react'
import './PlayedGame.css'
import {GiPodiumWinner} from "react-icons/gi";


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
                            {scoreData.remainderP1 === 0 && <GiPodiumWinner/>}
                            <span><h2>{scoreData.playerOneName}</h2></span>
                            {scoreData && <div> {scoreData.aimScoreP1-scoreData.remainderP1} van de {scoreData.aimScoreP1} </div>}
                        </div>
                        <div className="playedGame-contents-middle">
                            {scoreData.gespeeldOp}
                        </div>
                        <div className="playedGame-contents-sides">
                            {scoreData.remainderP2 === 0 && <GiPodiumWinner/>}
                            <span><h2>{scoreData.playerTwoName}</h2></span>
                            {scoreData && <div>{scoreData.aimScoreP2-scoreData.remainderP2} van de {scoreData.aimScoreP2}</div>}

                        </div>


                    </div>}
            </div>
        </>
    );
}

export default PlayedGame;