import React, {useEffect, useState} from 'react';
import {motion, AnimatePresence} from "framer-motion";
import PlayedGame from "./PlayedGame";

function PlayedGameList({playedGames}) {
    const [pg, setPG] = useState(playedGames)

    useEffect(() => {
        setPG(playedGames)
        console.log(playedGames)
    }, []);


    return (
        playedGames && playedGames.length > 0 ?
            <AnimatePresence>
                {pg.map((game, index) => {
                    return (
                        <motion.div key={game.scoreCard.id}>
                            <PlayedGame key={game.scoreCard.id} id={game.scoreCard.id}/>
                        </motion.div>
                    )
                }
                )}
            </AnimatePresence>
            :
            <div>No games played</div>

    )
}

export default PlayedGameList;
