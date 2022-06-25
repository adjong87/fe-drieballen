import React from 'react';
import {Link} from "react-router-dom";

function PlayerCard({username, firstName, lastName, aimScore, playedGames}) {

    return (
        <Link to={`/profile/${username}`}>
            <div
                className="player-profile-card">
                <span className="aimScore"><h3>{aimScore}</h3></span>
                <span><strong>{firstName} {lastName}</strong></span>
                <span>Aantal gespeelde wedstrijden: {playedGames}</span>
            </div>
        </Link>
    );
}


export default PlayerCard;