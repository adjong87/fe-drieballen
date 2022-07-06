import React from 'react';
import {useEffect, useState} from 'react';
import axios from "axios";
import './Overview.css'
import PlayerCard from "../../../components/playerCard/PlayerCard";
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
            <div className="playerCard-overview">
                {playersData && playersData.map((player, index) => {
                    return <PlayerCard
                        username={player.username}
                        page="admin"
                    />
                })}
            </div>
        </>
    )
}

export default Overview