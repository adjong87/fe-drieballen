import React from 'react';
import {useEffect, useState} from 'react';
import axios from "axios";
import './Overview.css'
import plus from '../../../assets/plus.png'
import PlayerCard from "./component/PlayerCard";
import {Link} from "react-router-dom";

function Overview() {
    const [playersData, setPlayersData] = useState([]);


    useEffect(() => {

        async function fetchData() {
            try {
                const result = await axios.get("http://localhost:8082/profiles/all",
                    {
                        headers:
                            {
                                'Content-Type': 'application/json',
                                "Authorization": `Bearer ${localStorage.getItem("token")}`
                            }
                    })
                setPlayersData(result.data);
            } catch (e) {
                console.error(e);
                console.log(e.response.data)
            }
        }
        fetchData()
    }, []);

    return (
        <>
            <div className="player-profile-container">
                {playersData && playersData.map((player, index) => {
                    return <PlayerCard
                        username={player.username}
                        firstName={player.firstName}
                        lastName={player.lastName}
                        aimScore={player.aimScore}
                        key={index}
                    />
                })}
                <Link to="/AddMember">
                    <div className="player-profile-card" key="newPlayer">
                        <img src={plus} alt="addMember"/>
                    </div>
                </Link>
            </div>
        </>
    )
}

export default Overview