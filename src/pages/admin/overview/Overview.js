import React from 'react';
import {useEffect, useState} from 'react';
import axios from "axios";
import './Overview.css'

function Overview() {
    // const [playersData, setPlayersData] = useState([{}]);
    //
    // async function fetchData() {
    //     try {
    //         const result = await axios.get(`http://localhost:8082/members/`)
    //         setPlayersData(result.data);
    //         console.log(playersData)
    //     } catch (e) {
    //         console.error(e);
    //         console.log(e.response.data)
    //     }
    // }
    //
    // useEffect(() => {
    //     fetchData()
    // }, []);


    const [data, setData] = useState([]);
    const getData = () => {
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
                setData(myJson)
            });
    }
    useEffect(() => {
        getData()
    }, [])


    return (

        <>
            <div className="player-profile-container">
                {data ? data.map((player) => {
                        return <div className="player-profile-card">
                            <span className="aimScore"><h3>{player.aimScore}</h3></span>
                            <span><strong>{player.firstName} {player.lastName}</strong></span>
                            <span>Aantal gespeelde wedstrijden:</span>
                            <span> {player.playedGames.length}</span>
                        </div>
                    })
                    :
                    <div>en anders dit</div>
                }
            </div>
        </>
    );
}

export default Overview;