import React from 'react';
import {useEffect, useState} from 'react';
import axios from "axios";
import './Overview.css'
import plus from '../../../assets/plus.png'
import PlayerCard from "./component/PlayerCard";

function Overview() {
    const [playersData, setPlayersData] = useState([]);

    async function fetchData() {
        try {
            const result = await axios.get("http://localhost:8082/members/all",
                {
                    headers:
                        {
                            'Content-Type': 'application/json',
                            "Authorization": `Bearer ${localStorage.getItem("token")}`
                        }
                })
            setPlayersData(result.data);
            console.log(playersData)
        } catch (e) {
            console.error(e);
            console.log(e.response.data)
        }
    }

    useEffect(() => {
        fetchData()
    }, []);


    // const [data, setData] = useState([]);
    // const getData = () => {
    //     fetch('data.json'
    //         , {
    //             headers: {
    //                 'Content-Type': 'application/json',
    //                 'Accept': 'application/json'
    //             }
    //         }
    //     )
    //         .then(function (response) {
    //             console.log(response)
    //             return response.json();
    //         })
    //         .then(function (myJson) {
    //             console.log(myJson);
    //             setData(myJson)
    //         });
    // }
    // useEffect(() => {
    //     getData()
    // }, [])


    return (
        <div className="player-profile-container">
            <PlayerCard/>
           <div className="player-profile-card" key="newPlayer">
                <img src={plus} alt="addMember"/>
            </div>
        </div>

    )

}

export default Overview;