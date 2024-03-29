import React, { useEffect, useState } from 'react';
import './CreateGamePage.css';

import { useHistory } from 'react-router-dom';
import { NotificationManager } from 'react-notifications';
import PlayerCard from '../../../components/playerCard/PlayerCard';
import ApiService from '../../../services/ApiService';

function CreateGamePage() {
  const history = useHistory();
  const [playerOne, setPlayerOne] = useState(null);
  const [playerTwo, setPlayerTwo] = useState(null);
  const [allPlayers, setAllPlayers] = useState([]);
  const [double, setDouble] = useState(false);
  const [succesFull, setSuccesFull] = useState(false);

  function checkDouble() {
    if (playerOne === playerTwo) {
      setDouble(true);
    } else {
      setDouble(false);
    }
  }

  useEffect(() => {
    document.title = 'ADMIN - de Drie Ballen - Wedstrijd klaarzetten';
    ApiService
      .getAllProfiles()
      .then((res) => setAllPlayers(res.data))
      .catch((err) => console.error(err));
  }, []);

  function createGame() {
    if (double) {
      setSuccesFull(false);
    } else {
      ApiService
        .createGame(playerOne, playerTwo)
        .then(() => {
          setSuccesFull(false);
          setPlayerOne(null);
          setPlayerTwo(null);
          NotificationManager
            .success(
              'Klik hier om nog een wedstrijd aan te maken',
              'Wedstrijd succesvol aangemaakt',
              5000,
              () => history.push('/create'),
            );
          history.push('/overview');
        })
        .catch((err) => {
          NotificationManager.warning('Probeer het opnieuw', 'Er ging wat mis!!', 3500);
          console.error(err);
        });
    }
  }

  useEffect(() => {
    checkDouble();
  }, [playerOne, playerTwo]);

  return (
    <>
      {allPlayers
                && (
                <div className="create-game-container">
                  <div className="create-game-inner-sides">
                    <div className="create-game-inner-side-player-selected" />

                    <div className="create-game-inner-side-player-selection">

                      <div>
                        {playerOne && (
                        <PlayerCard
                          username={playerOne}
                          key={playerOne}
                          page="create"
                        />
                        )}
                      </div>
                      <div className="createGamePage-player-pick">
                        <form>
                          <label htmlFor="playerOne" />
                          <select
                            name="playerOneSelect"
                            id="p1"
                            onChange={(e) => setPlayerOne(e.target.value)}
                          >
                            {allPlayers.map((p1, index) => {
                                <option key={index} value={p1.username}>{p1.firstName}</option>
                            })}
                          </select>
                        </form>
                      </div>
                    </div>
                  </div>
                  {succesFull
                    ? (
                      <div className="create-game-inner-middle">
                        <h1>Wedstrijd is klaargezet</h1>
                      </div>
                    )
                    : (
                      <div className="create-game-inner-middle">
                        {playerOne !== null && playerTwo !== null && !double
                          ? <div onClick={createGame} className="create-game-inner-button">START</div>
                          : <h1>Kies twee (verschillende) spelers</h1>}

                      </div>
                    )}
                  <div className="create-game-inner-sides">

                    <div className="create-game-inner-side-player-selection">
                      <div>
                        {playerTwo && (
                        <PlayerCard
                          username={playerTwo}
                          key={playerTwo}
                          page="create"
                        />
                        )}
                      </div>
                      <form className="createGamePage-player-pick">
                        <label htmlFor="playerTwo" />
                        <select
                          name="playerTwoSelect"
                          id="p2"
                          onChange={(e) => setPlayerTwo(e.target.value)}
                        >
                          {allPlayers.map((p2, index) => (
                            <option key={index} value={p2.username}>
                              {p2.firstName}
                            </option>
                          ))}
                        </select>
                      </form>
                    </div>
                  </div>
                </div>
                )}
    </>
  );
}

export default CreateGamePage;
