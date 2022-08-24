import React from 'react';
import {useEffect, useState} from 'react';
import './Overview.css'
import PlayerCard from "../../../components/playerCard/PlayerCard";
import ApiService from "../../../services/ApiService";
import {Zoom} from "react-awesome-reveal";

function Overview() {
    const [playersData, setPlayersData] = useState([]);

    function removePlayer(username) {
        playersData.filter(player => player.username !== username);
    }

    useEffect(() => {
        document.title = `ADMIN - de Drie Ballen - Ledenoverzicht pagina`
        ApiService
            .getAllProfiles()
            .then(res => setPlayersData(res.data))
            .catch(err => console.log(err))
    }, []);

    return (
        <>
            <div className="playerCard-overview">
                <Zoom direction="right"  cascade>

                {playersData?.map((player, index) => {
                    return <PlayerCard
                        username={player.username}
                        page="admin"
                        key={index}
                        remove={removePlayer}
                    />
                })}
                </Zoom>
            </div>
        </>
    )
}

export default Overview;