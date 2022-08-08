import React from 'react';
import {useEffect, useState} from 'react';
import axios from "axios";
import './Overview.css'
import PlayerCard from "../../../components/playerCard/PlayerCard";

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
            }
        }
        fetchData()
    }, []);

    return (
        <>
            <div className="playerCard-overview">
                {playersData && playersData.map((player, index) => {
                    return <PlayerCard
                        username={player.username}
                        page="admin"
                        key={index}
                    />
                })}
            </div>
        </>
    )
}

export default Overview