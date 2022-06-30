import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import axios from "axios";
import './ProfilePage.css';
import Header from "../../components/header/Header";
import PlayedGame from "./component/PlayedGame";
import {AiFillCaretDown} from "react-icons/ai";
import {AiFillCaretUp} from "react-icons/ai";

function ProfilePage() {

    const {username} = useParams();
    const [userData, setUserData] = useState({})
    const [playedGames, setPlayedGames] = useState([])
    const [isShown, toggleShown] = useState(true)

    function handleClick() {
        toggleShown(!isShown)
    }

    async function fetchData() {
        try {
            const result = await axios.get(`http://localhost:8082/profiles/profile?username=${username}`,
                {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${localStorage.getItem("token")}`
                    }
                })
            setUserData(result.data);
            setPlayedGames(result.data.playedGames)

        } catch (e) {
            console.error(e);
            console.log(e.response.data)
        }
    }

    useEffect(() => {
        fetchData()
    }, []);


    useEffect(() => {
        fetchData()
    }, [username]);


    return (
        <>
            {userData.playedGames &&
                <Header
                    title="Profiel van: "
                    data={userData}
                    photo='none'
                />}
            <div className="profile-page-outer-container">
                <div className="profile-page-inner-container">
                    {isShown && <div className="profile-page-playedgames-list">
                        {playedGames && playedGames.map((game, index) => {
                            return <PlayedGame
                                id={game.id.id}
                                key={index}/>
                        })}
                    </div>}
                </div>
                {isShown ? <button className="toggle" onClick={handleClick}><h1><AiFillCaretUp/></h1></button> :
                    <button className="toggle" onClick={handleClick}><h1><AiFillCaretDown/></h1></button>}
            </div>
        </>
    )
}

export default ProfilePage