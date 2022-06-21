import React from 'react';
import {useEffect, useState} from 'react';
import axios from "axios";

function Overview() {

    const [playersData, setPlayersData] = useState([{}]);

    async function fetchData() {
        try {
            const result = await axios.get(`http://localhost:8082/members/`)
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

    return (
        <>
            {playersData ? playersData.map((player) => {
                    return <div className="player-profile-container">
                        hier komen alle spelers
                    </div>
                })
                :
                <div>en anders dit</div>
            }
        </>
    );
}

export default Overview;