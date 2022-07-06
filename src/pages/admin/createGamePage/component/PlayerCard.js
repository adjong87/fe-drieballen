import NoImage from "../../../../assets/nopicture.png";
import {ImWrench} from 'react-icons/im';
import {AiOutlineSave} from 'react-icons/ai';
import React from 'react';
import {useContext, useEffect, useState} from 'react'
import axios from "axios";
import {AuthContext} from "../context/AuthContext";
import './PlayerCard.css'
import {Link} from "react-router-dom";

function PlayerCard({firstName, lastName, aimScore, playedGames}) {

    const {user} = useContext(AuthContext)
    const [playerData, setPlayerData] = useState({})

    return (
        <>
            {playerData &&
                <div className="playerCard-container">

                    <div className="playerCard-content">
                        <div className="playerCard-content-name">
                            <h2>{player.firstName} {player.lastName}</h2>
                        </div>

                        {page === "admin" ?
                            <Link to={`/profile/${playerData.username}`}>
                                <div className="playerCard-content-photo">
                                    {player.photo ? <img src={player.photo.url}/> :
                                        <img src={NoImage}/>}
                                </div>
                            </Link> :
                            <div className="playerCard-content-photo">
                                {player.photo ? <img src={player.photo.url}/> :
                                    <img src={NoImage}/>}
                            </div>}

                        {player.playedGames &&
                            <div className="playerCard-content-stats">
                                <span>Te behalen score: {player.aimScore}</span>
                                <span>Aantal gespeelde wedstrijden: {player.playedGames.length}</span>
                                <span>Aantal gewonnen wedstrijden: {player.playedGames.length}</span>
                                <span>Aantal verloren partijen: {player.playedGames.length}</span>
                            </div>}

                        <div className="playerCard-content-button">
                            {!edit && <button onClick={() => toggleEdit(!edit)}><ImWrench size={20}/></button>}
                        </div>
                    </div>
                </div>}

            {edit &&
                <div className="playerCard-content-edit-open">
                    <div className="playerCard-container">
                        <div className="playerCard-content">
                            <div className="playerCard-content-name">
                                <h2>{playerData.firstName} {playerData.lastName}</h2>
                            </div>
                            <div className="playerCard-content-edit-photo">
                                {previewUrl &&
                                    <label>
                                        <img src={previewUrl}
                                             alt="Foto preview"
                                             className="image-preview"/>
                                    </label>}

                            </div>

                            <form className="playerCard-upload-form" onSubmit={sendImage}>
                                <input type="file" id="upload-photo" name="files[]" accept="image/*"
                                       onChange={handleImageChange}/>
                                {previewUrl ?
                                    <label id="upload-photo-label" htmlFor="upload-photo">Kies een andere foto</label> :
                                    <label id="upload-photo-label" htmlFor="upload-photo">Kies een foto</label>}
                                {previewUrl && <button id="upload-button" type="submit" value="Upload!">Upload</button>}
                            </form>

                            <div className="playerCard-content-stats">
                                    <span>Te behalen score:
                                        <input
                                            type="text"
                                            id="aimScore"
                                            placeholder={playerData.aimScore}/></span>
                            </div>

                            <div className="playerCard-content-button">
                                {edit && <button onClick={() => toggleEdit(!edit)}><AiOutlineSave size={20}/></button>}
                            </div>
                        </div>
                    </div>
                </div>
            }
        </>
    )
}

export default PlayerCard;