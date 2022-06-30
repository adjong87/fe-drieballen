import React from 'react';
import './CreateGamePage.css'
import {useEffect, useState} from 'react'
import axios from "axios";
import Header from "../../../components/header/Header";


function CreateGamePage() {

    const [playerOne, setPlayerOne] = useState("Piet");
    const [playerTwo, setPlayerTwo] = useState("Henk");
    const [allPlayers, setAllPlayers] = useState([])
    const [double, setDouble] = useState(false)

    function checkDouble() {
        if (playerOne === playerTwo) {
            setDouble(true)
        } else {
            setDouble(false)
        }
    }

    async function fetchPlayers() {
        try {
            const result = await axios.get("http://localhost:8082/profiles/all",
                {
                    headers:
                        {
                            'Content-Type': 'application/json',
                            "Authorization": `Bearer ${localStorage.getItem("token")}`
                        }
                })
            setAllPlayers(result.data);
            console.log(allPlayers)
        } catch (e) {
            console.error(e);
            console.log(e.response.data)
        }
    }

    useEffect(() => {
        fetchPlayers()
    }, []);

    function createGame() {
        if (!double) {
            try {
                axios.post(
                    `http://localhost:8082/playedGame/createGame?playerOne=${playerOne}&playerTwo=${playerTwo}`,
                    {
                        playerOne: playerOne,
                        playerTwo: playerTwo
                    },
                    {
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": `Bearer ${localStorage.getItem("token")}`
                        }
                    }
                ).then(response => {
                    console.log("gelukt")
                })
            } catch (e) {
                console.error(e.message)
            }
        }
    }

    useEffect(() => {
        checkDouble()
    }, [playerOne, playerTwo]);


    return (
        <>
            <Header
                title="WHO's READY TO RUMBLE!?"/>
            {allPlayers &&
                <div className="create-game-container">
                    <div className="player-containers">
                        <form className="player-forms">
                            <label htmlFor="playerOne">Mét pit</label>
                            <select name="playerOneSelect" id="p1" onChange={(e) => setPlayerOne(e.target.value)}>
                                {allPlayers.map((p1, index) => {
                                    return <option key={index} value={p1.username}>{p1.firstName}</option>
                                })}
                            </select>
                        </form>
                    </div>
                    <div className="game-info-container">
                        {!double ?
                            <span><h1>{playerOne} VS {playerTwo}</h1> <button onClick={createGame}>Create game</button></span> :
                            <h1>Dit kan niet</h1>}

                    </div>
                    <div className="player-containers">
                        <form className="player-forms">
                            <label htmlFor="playerTwo">Zonder pit</label>
                            <select name="playerOneSelect" id="p2" onChange={(e) => setPlayerTwo(e.target.value)}>
                                {allPlayers.map((p2, index) => {
                                    return <option key={index} value={p2.username}>{p2.firstName}</option>
                                })}
                            </select>
                        </form>
                    </div>
                </div>}
        </>
    );
}

export default CreateGamePage;
