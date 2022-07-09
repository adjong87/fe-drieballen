import React, {useState} from 'react';
import {AiOutlineSave} from "react-icons/ai";
import {ImWrench} from "react-icons/im";

function Turn({index, turn, score, edit}) {

    const [correct, toggleCorrect] = useState(true)
    const [correctScore, setCorrectScore] = useState(turn)

    function handleSubmit() {
        score[index] = parseInt(correctScore)
        toggleCorrect(!correct)
    }

    return (
        <>
            {correct ?
                <div
                    className="player-turn">
                    <span>Beurt{index + 1} : {correctScore}</span>
                    {edit && <span><button onClick={(() => {
                        toggleCorrect(false)
                    })}>
                        <ImWrench/>
                    </button>
                        </span>}
                </div>
                :
                <div className="player-turn-correct">
                    <input
                        type={"number"}
                        id="correction"
                        placeholder={score[index]}
                        onSubmit={((e) => {
                            score[index] = parseInt(correctScore)
                        })}
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