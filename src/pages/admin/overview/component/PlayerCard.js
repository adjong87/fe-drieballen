import React, {useEffect, useState} from 'react';
import axios from "axios";
import {Link} from "react-router-dom";



function PlayerCard() {
    const [allMembers, setAllMembers] = useState({});
    const [error, toggleError] = useState(false)


    async function fetchData() {
        try {
            const result = await axios.get("http://localhost:8082/members/all",
                {
                    headers:{
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${localStorage.getItem("token")}`}
                })
            setAllMembers(result.data);
            console.log("dit komt van hier" + allMembers)
        } catch (e) {
            console.error(e);
            console.log(e.response.data)
        }
    }

    useEffect(() => {
        fetchData()
    }, []);


    return (
        <>
            {error &&
                <span>
                    Er ging wat mis!
                    </span>}

            {Object.keys(allMembers).length > 0 && allMembers.map((member, index) => {
                return <Link to={`/profile/${member.username}`}>
                    <div className="player-profile-card" key={index}>
                        <span className="aimScore"><h3>{member.aimScore}</h3></span>
                        <span><strong>{member.firstName} {member.lastName}</strong></span>
                        <span>Aantal gespeelde wedstrijden:</span>
                        <span> {member.playedGames.length}</span>
                    </div>
                </Link>
            })
            }
        </>

    );
}


export default PlayerCard;