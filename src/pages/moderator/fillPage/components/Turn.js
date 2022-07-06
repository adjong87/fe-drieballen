import React, {useState} from 'react';
import {AiOutlineSave} from "react-icons/ai";
import {ImWrench} from "react-icons/im";

function Turn({index, turn, score}) {

    const [correct, toggleCorrect] = useState(true)
    const [correctScore, setCorrectScore] = useState(turn)

    function handleSubmit(e) {
        score[index] = parseInt(correctScore)
        console.log(correctScore)
        toggleCorrect(!correct)
        console.log(score)
        console.log(index)
    }

    return (
        <>
            {correct ?
                <div
                    className="player-turn">
                    <span>Beurt{index + 1} : {correctScore}</span>
                    <button onClick={(() => {
                        toggleCorrect(false)
                    })}><ImWrench/>
                    </button>
                </div>
                :
                <div className="player-turn-correct">
                    <input
                        type={"number"}
                        id="correction"
                        placeholder={score[index]}
                        onChange={((e) => {
                            setCorrectScore(e.target.value)
                        })}>
                    </input>
                    <button onClick={handleSubmit}><AiOutlineSave/>
                    </button>
                </div>
            }
        </>
    )
}


export default Turn;