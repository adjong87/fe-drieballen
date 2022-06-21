import React from 'react';
import './CreateGame.css'
import {useEffect, useState} from 'react'
import axios from "axios";

export default CreateGame;

function CreateGame() {

    const [playerOne, setPlayerOne] = useState("Piet");
    const [playerTwo, setPlayerTwo] = useState("Henk");
    const [allPlayers, setAllPlayers] = useState({})
    const [double, setDouble] = useState(false)

    async function fetchData() {
        try {
            const result = await axios.get(`http://localhost:8082/members/`)
            setAllPlayers(result.data);
            console.log(allPlayers)
        } catch (e) {
            console.error(e);
            console.log(e.response.data)
        }
    }

    async function createGame() {
        try {
            const result = await axios.post(`http://localhost:8082/playedGame/create?playerOne=${playerOne}?playerTwo=${playerTwo}`)
            setAllPlayers(result.data);
            console.log(allPlayers)
        } catch (e) {
            console.error(e);
            console.log(e.response.data)
        }
    }


    useEffect(() => {
        fetchData()
    }, []);


    useEffect(() => {
        checkDouble()
    }, [playerOne, playerTwo]);

    function checkDouble() {
        if (playerOne === playerTwo) {
            setDouble(true)
        } else {
            setDouble(false)
        }
    }

    return (
        <>
            <div className="create-game-container">
                <div className="player-containers">
                    <form className="player-forms" action="#">
                        <label htmlFor="playerOne">Mét pit</label>
                        <select name="playerOneSelect" id="p1" onChange={(e) => setPlayerOne(e.target.value)}>
                            {/*<option value={playerOne}>{playerOne}</option>*/}
                            <option value="Sjaak">Sjaak</option>
                            <option value="Henk">Henk</option>
                            <option value="Sjors">Sjors</option>
                            <option value="Sjakie">Sjakie</option>
                            <option value="Sjak">Sjak</option>
                            <option value="Sjenkie">Sjenkie</option>
                            <option value="Sjimmie">Sjimmie</option>


                            {/*<option value={playerTwo}>{playerTwo}</option>*/}
                        </select>
                    </form>
                </div>
                <div className="game-info-container">
                    {!double ?
                        <h1>{playerOne} VS {playerTwo}</h1> : <h1>Dit kan niet</h1>}
                </div>
                <div className="player-containers">
                    <form className="player-forms" action="#">
                        <label htmlFor="playerTwo">Zonder pit</label>
                        <select name="playerTwoSelect" id="p2" onChange={(f) => setPlayerTwo(f.target.value)}>
                            <option value="Sjaak">Sjaak</option>
                            <option value="Henk">Henk</option>
                            <option value="Sjors">Sjors</option>
                            <option value="Sjakie">Sjakie</option>
                            <option value="Sjak">Sjak</option>
                            <option value="Sjenkie">Sjenkie</option>
                            <option value="Sjimmie">Sjimmie</option>
                        </select>
                    </form>
                </div>
            </div>
        </>
    );
}

