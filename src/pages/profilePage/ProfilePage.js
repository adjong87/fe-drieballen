import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import axios from "axios";
import './ProfilePage.css';
import NoImage from "../../assets/nopicture.png";
import {ImWrench} from "react-icons/im";
import {AiOutlineSave} from "react-icons/ai";
import {useContext} from 'react'
import {AuthContext} from "../../components/context/AuthContext";
import {GrStatusGood} from "react-icons/gr";

function ProfilePage() {
    const {user} = useContext(AuthContext)
    const {username} = useParams();
    const [profile, setProfile] = useState()
    const [edit, toggleEdit] = useState(false)
    const [file, setFile] = useState([]);
    const [previewUrl, setPreviewUrl] = useState('');

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
            const result = await axios.post(`http://localhost:8082/upload/${user.username}/photo`, formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                        "Authorization": `Bearer ${localStorage.getItem("token")}`
                    },
                })
            console.log(result.data);
        } catch (e) {
            console.error(e)
        }
    }

    useEffect(() => {
        async function fetchProfile() {
            try {
                const response = await axios.get(`http://localhost:8082/profiles/profile?username=${username}`,
                    {
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": `Bearer ${localStorage.getItem("token")}`
                        }
                    })
                setProfile(response.data);
                console.log(response.data);
            } catch (e) {
                console.error(e);
            }
        }

        fetchProfile();
    }, []);
    return (
        <>

            {profile &&
                <div className="profile-container">
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
                    <div className="playedGame-container">
                        hier komen de score
                    </div>
                </div>}

        </>
    )
}

export default ProfilePage