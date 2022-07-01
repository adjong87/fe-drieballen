import React, {useState} from 'react';
import {Link} from "react-router-dom";

function PlayerCard({username, firstName, lastName, aimScore}) {

    return (
        <Link exact to={`./profile/${username}`}>
            <div
                className="player-profile-card">
                <span className="aimScore"><h3>{aimScore}</h3></span>
                <span><strong>{firstName} {lastName}</strong></span>
            </div>
        </Link>
    );
}


export default PlayerCard;