import React, {useEffect, useState} from 'react';
import axios from "axios";
import { Link } from "react-router-dom";

function PlayerCard() {
    const [allMembers, setAllMembers] = useState({});
    const [error, toggleError] = useState(false)

    // useEffect(() => {
    //     async function fetchData() {
    //         toggleError(false)
    //         try {
    //             const result = await axios.get(`http://localhost:8082/members`);
    //             setAllMembers(result.data);
    //         } catch (e) {
    //             console.error(e);
    //             toggleError(true)
    //         }
    //     }
    //     fetchData()
    // }, [pokemon]);
    //

    const getMembers = () => {
        fetch('data.json'
            , {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            }
        )
            .then(function (response) {
                console.log(response)
                return response.json();
            })
            .then(function (myJson) {
                console.log(myJson);
                setAllMembers(myJson)
            });
    }

    useEffect(() => {
        getMembers()
    }, [])

    return (
        <>
            {error &&
                <span>
                    Er ging wat mis!
                    </span>}

            {Object.keys(allMembers).length > 0 && allMembers.map((member) => {
                return <Link
                    to={`/profile?=${member.username}`}>
                    < div className="player-profile-card" key={member.username}>
                        <span className="aimScore"><h3>{member.aimScore}</h3></span>
                        <span><strong>{member.firstName} {member.lastName}</strong></span>
                        <span>Aantal gespeelde wedstrijden:</span>
                        <span> {member.playedGames}</span>
                    </div>
                </Link>
            })
            }
        </>

    );
}


export default PlayerCard;