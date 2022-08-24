import React from 'react';
import './CreateGamePage.css'
import {useEffect, useState} from 'react'
import PlayerCard from "../../../components/playerCard/PlayerCard";
import {useHistory} from "react-router-dom";
import ApiService from "../../../services/ApiService";
import {NotificationManager} from "react-notifications";
import {Flip, Rotate} from "react-awesome-reveal";

function CreateGamePage() {
    const history = useHistory();
    const [playerOne, setPlayerOne] = useState({});
    const [playerTwo, setPlayerTwo] = useState({});
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

    useEffect(() => {
        document.title = `ADMIN - de Drie Ballen - Wedstrijd klaarzetten`
        ApiService
            .getAllProfiles()
            .then(res => setAllPlayers(res.data))
            .catch(err => console.error(err))
    }, []);

    function createGame() {
        if (double) {
            setSuccesFull(false)
        } else {
            ApiService
                .createGame(playerOne, playerTwo)
                .then(() => {
                    setSuccesFull(false)
                    setPlayerOne(null)
                    setPlayerTwo(null)
                    NotificationManager
                        .success(
                            'Klik hier om nog een wedstrijd aan te maken',
                            'Wedstrijd succesvol aangemaakt',
                            5000,
                            () => history.push('/create'))
                    history.push('/overview')
                })
                .catch(err => {
                    NotificationManager.warning('Probeer het opnieuw', 'Er ging wat mis!!', 3500);
                    console.error(err)
                })
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

                            <Flip>
                                {playerOne && <PlayerCard
                                    username={playerOne}
                                    key={playerOne}
                                    page="create"/>}
                            </Flip>
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
                            {playerOne !== null && playerTwo !== null && !double ?
                                <div onClick={createGame} className="create-game-inner-button">START</div> :
                                <h1>Kies twee (verschillende) spelers</h1>}

                        </div>
                    }
                    <div className="create-game-inner-sides">


                        <div className="create-game-inner-side-player-selection">
                            <div>
                                <Flip>
                                {playerTwo && <PlayerCard
                                    username={playerTwo}
                                    key={playerTwo}
                                    page="create"/>}
                                </Flip>
                            </div>
                            <form className="createGamePage-player-pick">
                                <label htmlFor="playerTwo"></label>
                                <select name="playerTwoSelect" id="p2"
                                        onChange={(e) => setPlayerTwo(e.target.value)}>
                                    {allPlayers.map((p2, index) => {
                                        return (
                                            <option key={index} value={p2.username}>
                                                {p2.firstName}
                                            </option>
                                        )
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
