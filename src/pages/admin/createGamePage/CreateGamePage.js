import React from 'react';
import './CreateGamePage.css'
import {useEffect, useState} from 'react'
import axios from "axios";
import PlayerCard from "../../../components/playerCard/PlayerCard";
import {useHistory} from "react-router-dom";

function CreateGamePage() {
    const history = useHistory();
    const [playerOne, setPlayerOne] = useState(null);
    const [playerTwo, setPlayerTwo] = useState(null);
    const [allPlayers, setAllPlayers] = useState([])
    const [double, setDouble] = useState(false)
    const [succesFull, setSuccesFull] = useState(false)

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
        } catch (e) {
            console.error(e);
        }
    }

    useEffect(() => {
        fetchPlayers()
    }, []);

    async function createGame() {
        if (!double) {
            try {
                axios.post(
                    `http://localhost:8082/playedgame/createGame?playerOne=${playerOne}&playerTwo=${playerTwo}`,
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
                    console.log(response)
                    if (window.confirm('Wedstrijd is succesvol aangemaakt. Druk op OK om nog een wedstrijd aan te maken, druk op annuleren om terug te gaan naar de overzicht pagina')) {
                        setSuccesFull(false)
                        setPlayerOne(null)
                        setPlayerTwo(null)

                    } else history.push("/overview");

                })
            } catch (e) {
                console.error(e.message)
                setSuccesFull(false)

            }
        }

    }

    useEffect(() => {
        checkDouble()
    }, [playerOne, playerTwo]);

    return (
        <>
            {allPlayers &&
                <div className="create-game-container">
                    <div className="create-game-inner-sides">
                        <div className="create-game-inner-side-player-selected">

                        </div>

                        <div className="create-game-inner-side-player-selection">

                            <div>
                                {playerOne && <PlayerCard
                                    username={playerOne}
                                    key={playerOne}
                                    page="create"/>}
                            </div>
                            <div className="createGamePage-player-pick">
                                <form>
                                    <label htmlFor="playerOne"></label>
                                    <select name="playerOneSelect" id="p1"
                                            onChange={(e) => setPlayerOne(e.target.value)}>
                                        {allPlayers.map((p1, index) => {
                                            return <option key={index} value={p1.username}>{p1.firstName}</option>
                                        })}
                                    </select>
                                </form>
                            </div>
                        </div>
                    </div>
                    {succesFull
                        ?
                        <div className="create-game-inner-middle">
                            <h1>Wedstrijd is klaargezet</h1>
                        </div>
                        :
                        <div className="create-game-inner-middle">
                            {playerOne !== null && playerTwo !== null & !double ?
                                <div onClick={createGame} className="create-game-inner-button">START</div> :
                                <h1>Kies twee (verschillende) spelers</h1>}

                        </div>
                    }
                    <div className="create-game-inner-sides">


                        <div className="create-game-inner-side-player-selection">
                            <div>
                                {playerTwo && <PlayerCard
                                    username={playerTwo}
                                    key={playerTwo}
                                    page="create"/>}
                            </div>
                            <form className="createGamePage-player-pick">
                                <label htmlFor="playerTwo"></label>
                                <select name="playerTwoSelect" id="p2"
                                        onChange={(e) => setPlayerTwo(e.target.value)}>
                                    {allPlayers.map((p2, index) => {
                                        return <option key={index} value={p2.username}>{p2.firstName}</option>
                                    })}
                                </select>
                            </form>
                        </div>
                    </div>
                </div>}
        </>
    );
}

export default CreateGamePage;
