import NoImage from "../../assets/nopicture.png";
import {ImWrench} from "react-icons/im";
import {AiOutlineSave} from "react-icons/ai";
import React from 'react';
import {useEffect, useState} from "@types/react";
import {useParams} from "react-router-dom";
import axios from "axios";

function ScoreCard() {
    const [scoreCardData, setScoreCardData] = useState({})
    const { id } = useParams();

    async function fetchScoreCard() {
        try {
            const result = await axios.get(`http://localhost:8082/scorecards/donecard?id=${id}`,
                {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${localStorage.getItem("token")}`
                    }
                })
            setScoreCardData(result.data);
            console.log(scoreCardData);
        } catch (e) {
            console.error(e);
            console.log(e.response.data)
        }
    }

    useEffect(() => {
        fetchScoreCard()
    }, []);
<div className="playerCard-container">
    <div className="playerCard-content">
        <div className="playerCard-content-name">
            <h2>{profile.firstName} {profile.lastName}</h2>
        </div>
        <div className="playerCard-content-photo">
            {profile.photo ? <img src={profile.photo.url}/> :
                <img src={NoImage} alt="No image set"/>}
        </div>
        <div className="playerCard-content-stats">
            <span>Te behalen score: {profile.aimScore}</span>
            <span>Aantal gespeelde wedstrijden: {profile.playedGames.length}</span>
            <span>Aantal gewonnen wedstrijden: {profile.playedGames.length}</span>
            <span>Aantal verloren partijen: {profile.playedGames.length}</span>
        </div>
        <div className="playerCard-content-button">
            {!edit && <button onClick={() => toggleEdit(!edit)}><ImWrench size={20}/></button>}
        </div>
    </div>
</div>
{edit &&
<div className="playerCard-content-edit-open">
    <div className="playerCard-container">
        <div className="playerCard-content">
            <div className="playerCard-content-name">
                <h2>{profile.firstName} {profile.lastName}</h2>
            </div>
            <div className="playerCard-content-edit-photo">
                <form onSubmit={sendImage}>
                    {previewUrl &&
                        <label>
                            <img src={previewUrl}
                                 alt="Voorbeeld van de afbeelding die zojuist gekozen is"
                                 className="image-preview"/>
                        </label>}
                    {previewUrl  && <button type="submit">Uploaden</button>}

                </form>
                {!previewUrl && <input type="file" name="image-field" id="student-image" onChange={handleImageChange}/>}

            </div>

            <div className="playerCard-content-stats">
                                    <span>Te behalen score:
                                        <input
                                            type="text"
                                            id="aimScore"
                                            placeholder={profile.aimScore}/></span>
            </div>
            <div className="playerCard-content-button">
                {edit && <button onClick={() => toggleEdit(!edit)}><AiOutlineSave size={20}/></button>}
            </div>
        </div>
    </div>
</div>}