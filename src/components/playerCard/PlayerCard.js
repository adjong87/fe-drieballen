import NoImage from "../../assets/nopicture.png";
import {ImWrench} from "react-icons/im";
import {AiOutlineSave} from "react-icons/ai";
import React from 'react';
import {useContext, useEffect, useState} from 'react'
import {AuthContext} from "../context/AuthContext";
import './PlayerCard.css'
import {Link, useHistory} from 'react-router-dom';
import {RiDeleteBinLine} from "react-icons/ri";
import ApiService from "../../services/ApiService";
import notificationManager from "react-notifications/lib/NotificationManager";
import {NotificationManager} from "react-notifications";

function PlayerCard({username, page, remove}) {
    const {user} = useContext(AuthContext)
    const [playerData, setPlayerData] = useState({})
    const [edit, toggleEdit] = useState(false)
    const [file, setFile] = useState([]);
    const [previewUrl, setPreviewUrl] = useState('');
    const history = useHistory();

    useEffect(() => {
        ApiService.fetchPlayer(username)
            .then(res => {
                setPlayerData(res.data)
            }).catch(err => {
            console.log(err)
        })
    }, [edit])

    function deletePhoto() {
        if (window.confirm('Weet je zeker dat je deze foto wilt verwijderen?')) {
            ApiService.deletePhoto(playerData.username).catch(err => console.error(err))
            {user.gebruikersrollen.includes('ROLE_ADMIN') ? history.push("/overview") : history.push("/")}
        }
    }

    function deleteProfile(e) {
        e.preventDefault();
        if (window.confirm('Weet je zeker dat je deze gebruiker wilt verwijderen?')) {
            remove(username)
            ApiService.deleteProfile(username).catch(e => console.error(e))
            {user.gebruikersrollen.includes('ROLE_ADMIN') ? history.push("/overview") : history.push("/")}
        }
    }

    function handleImageChange(e) {
        const uploadedFile = e.target.files[0];
        setFile(uploadedFile);
        setPreviewUrl(URL.createObjectURL(uploadedFile));
    }

    function sendImage(e) {
        e.preventDefault();
        const formData = new FormData();
        formData.append("file", file);
        ApiService.uploadPhoto(
            playerData.username,
            formData)
            .then(() => {
                setPreviewUrl('')
                toggleEdit(!edit)
                NotificationManager.success('Je foto is geupload', 'HET IS GELUKT')
                {user.gebruikersrollen.includes('ROLE_ADMIN') ? history.push("/overview") : history.push("/")}
            }).catch(e => console.error(e))
    }

    return (
        <>
            {playerData &&
                <div className="playerCard-container">

                    <div className="playerCard-content">
                        <div className="playerCard-content-name">
                            <h2>
                                {playerData.firstName} {playerData.lastName}
                            </h2>
                        </div>

                        {page === "admin"
                            ?
                            <Link to={`/profile/${playerData.username}`}>
                                <div className="playerCard-content-photo">
                                    {playerData.photo
                                        ?
                                        <img src={playerData.photo.url} alt="profielfoto"/>
                                        :
                                        <img src={NoImage} alt="geen profielfoto"/>
                                    }
                                </div>
                            </Link>
                            :
                            <div className="playerCard-content-photo">
                                {playerData.photo
                                    ? <img src={playerData.photo.url} alt="profielfoto"/>
                                    :
                                    <img src={NoImage} alt="geen profielfoto"/>
                                }
                            </div>
                        }
                        {playerData.playedGames &&
                            <div className="playerCard-content-stats">
                                <span>
                                    Te behalen score: {playerData.aimScore}
                                </span>
                                <span>
                                    Aantal gespeelde wedstrijden: {playerData.playedGames.length}
                                </span>
                                <span>
                                    Aantal gewonnen wedstrijden: {playerData.playedGames.length}
                                </span>
                                <span
                                >Aantal verloren partijen: {playerData.playedGames.length}
                                </span>
                            </div>
                        }

                        <div className="playerCard-content-button">
                            {page !== "create" && page !== "fill" && !edit &&
                                <button
                                    onClick={() => toggleEdit(!edit)}>
                                    <ImWrench size={20}/>
                                </button>
                            }
                        </div>
                    </div>
                </div>
            }

            {edit &&
                <div className="playerCard-content-edit-open">
                    <div className="playerCard-container">
                        <div className="playerCard-content">
                            <div className="playerCard-content-name">
                                <h2>
                                    {playerData.firstName} {playerData.lastName}
                                </h2>
                            </div>
                            <div className="playerCard-content-edit-photo">
                                {previewUrl &&
                                    <label>
                                        <img src={previewUrl}
                                             alt="Foto preview"
                                             className="image-preview"/>
                                    </label>}

                            </div>

                            <form
                                className="playerCard-upload-form"
                                id="photo-form"
                                onSubmit={sendImage}>
                                <input type="button"
                                       id="delete-photo"
                                       onClick={deletePhoto}
                                />
                                <input type="file"
                                       id="upload-photo"
                                       name="files[]"
                                       accept="image/*"
                                       onChange={handleImageChange}/>
                                {previewUrl ?
                                    <label id="upload-photo-label" htmlFor="upload-photo">Kies een andere
                                        foto</label>
                                    :
                                    <label id="upload-photo-label" htmlFor="upload-photo">Kies een foto</label>
                                }
                                {!previewUrl && playerData.photo &&
                                    <label id="upload-photo-label" htmlFor="delete-photo">Verwijder huidige
                                        foto</label>}
                                {previewUrl &&
                                    <button
                                        id="upload-button"
                                        type="submit"
                                        form="photo-form"
                                        value="Upload">
                                        Upload
                                    </button>
                                }
                            </form>

                            <div className="playerCard-content-button">
                                {user.gebruikersrollen.includes('ROLE_ADMIN') && <button
                                    onClick={deleteProfile}>
                                    <RiDeleteBinLine size={20}/>
                                </button>}
                                {edit &&
                                    <button onClick={() => toggleEdit(!edit)}>
                                        <AiOutlineSave size={20}/>
                                    </button>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            }
        </>
    )
}


export default PlayerCard;