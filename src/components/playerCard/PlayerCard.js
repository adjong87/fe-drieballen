import NoImage from "../../assets/nopicture.png";
import {ImWrench} from "react-icons/im";
import {AiOutlineSave} from "react-icons/ai";
import React from 'react';
import {useContext, useEffect, useState} from 'react'
import axios from "axios";
import {AuthContext} from "../context/AuthContext";
import './PlayerCard.css'
import {Link, useHistory} from 'react-router-dom';
import { RiDeleteBinLine } from "react-icons/ri";

function PlayerCard({username, page}) {

    const {user} = useContext(AuthContext)
    const [playerData, setPlayerData] = useState({})
    const [edit, toggleEdit] = useState(false)
    const [file, setFile] = useState([]);
    const [previewUrl, setPreviewUrl] = useState('');
    const history = useHistory();

    useEffect(() => {
        async function fetchPlayer() {
            try {
                const response = await axios.get(`http://localhost:8082/profiles/profile?username=${username}`,
                    {
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": `Bearer ${localStorage.getItem("token")}`
                        }
                    })
                setPlayerData(response.data);
                console.log(response.data);
            } catch (e) {
                console.error(e);
            }
        }

        fetchPlayer();
    }, [edit]);

    async function handleClick(e) {
        // Voorkom een refresh op submit
        e.preventDefault();
        // maak een nieuw FormData object (ingebouwd type van JavaScript)
        const formData = new FormData();
        // Voeg daar ons bestand uit de state aan toe onder de key "file"
        formData.append("file", file);

        try {
            // verstuur ons formData object en geef in de header aan dat het om een form-data type gaat
            // Let op: we wijzigen nu ALTIJD de afbeelding voor student 1001, als je een andere student wil kiezen of dit dynamisch wil maken, pas je de url aan!
            const result = await axios.delete(`http://localhost:8082/profiles/delete/${playerData.username}`,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                        "Authorization": `Bearer ${localStorage.getItem("token")}`
                    },
                })
        } catch (e) {
            console.error(e)
        }
        history.push("/overview");    }

    function handleImageChange(e) {
        // Sla het gekozen bestand op
        const uploadedFile = e.target.files[0];
        console.log(uploadedFile);
        // Sla het gekozen bestand op in de state
        setFile(uploadedFile);
        // Sla de preview URL op zodat we deze kunnen laten zien in een <img>
        setPreviewUrl(URL.createObjectURL(uploadedFile));
    }

    async function sendImage(e) {
        // Voorkom een refresh op submit
        e.preventDefault();
        // maak een nieuw FormData object (ingebouwd type van JavaScript)
        const formData = new FormData();
        // Voeg daar ons bestand uit de state aan toe onder de key "file"
        formData.append("file", file);

        try {
            // verstuur ons formData object en geef in de header aan dat het om een form-data type gaat
            // Let op: we wijzigen nu ALTIJD de afbeelding voor student 1001, als je een andere student wil kiezen of dit dynamisch wil maken, pas je de url aan!
            const result = await axios.post(`http://localhost:8082/upload/${playerData.username}/photo`, formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                        "Authorization": `Bearer ${localStorage.getItem("token")}`
                    },
                })
            console.log(result.data);
            toggleEdit(!edit)
        } catch (e) {
            console.error(e)
        }
    }

    return (
        <>
            {playerData &&
                <div className="playerCard-container">

                    <div className="playerCard-content">
                        <div className="playerCard-content-name">
                            <h2>{playerData.firstName} {playerData.lastName}</h2>
                        </div>

                        {page === "admin" ?
                            <Link to={`/profile/${playerData.username}`}>
                                <div className="playerCard-content-photo">
                                    {playerData.photo ? <img src={playerData.photo.url}/> :
                                        <img src={NoImage}/>}
                                </div>
                            </Link> :
                            <div className="playerCard-content-photo">
                                {playerData.photo ? <img src={playerData.photo.url}/> :
                                    <img src={NoImage}/>}
                            </div>}

                        {playerData.playedGames &&
                            <div className="playerCard-content-stats">
                                <span>Te behalen score: {playerData.aimScore}</span>
                                <span>Aantal gespeelde wedstrijden: {playerData.playedGames.length}</span>
                                <span>Aantal gewonnen wedstrijden: {playerData.playedGames.length}</span>
                                <span>Aantal verloren partijen: {playerData.playedGames.length}</span>
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
                                <button onClick={handleClick}><RiDeleteBinLine size={20}/></button>
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