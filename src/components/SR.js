import {useRef, useState} from "react";
import SpeechRecognition, {useSpeechRecognition} from "react-speech-recognition";
import {FaMicrophone, FaMicrophoneSlash} from "react-icons/fa";
import Speech from "../components/Speech";
import './SR.css'

function SR({p1score, p2score, turnScore, setTurnScore, nextTurn, puntErbij, playerActive}) {


    const commands = [

        {
            command: `:condition *`,
            callback: (condition) => {
                console.log(condition);
                let engPoints
                stopHandle()
                engPoints = condition.toString().split(" ")[0].valueOf()
                setTimeout(() => {
                    setTurnScore(engPoints)
                }, 1000);

                setTimeout(() => {
                    {
                        playerActive ? p1score.push(turnScore) : p2score.push(turnScore)
                    }
                }, 2000);
                setTimeout(() => {
                    nextTurn(engPoints);
                }, 2000);
                resetTranscript();
            },
        },
        {
            command: ["punt erbij", "extra punt"],
            callback: () => {
                puntErbij();
                Speech.say('erbij KRISTINA', 'Google NL Dutch', "Google NL Dutch")
                resetTranscript();

            },
        },
        {
            command: "einde beurt",
            callback: () => {
                nextTurn();
                stopHandle()
                Speech.say(playerActive ? "Einde Beurt! " + p1score + " punten voor wit" : "Einde Beurt! " + p2score + " punten voor geel.", 'Google NL Dutch')
                setTimeout(() => {
                    resetTranscript();
                    handleListing()
                }, 3000);
            }
            ,
        },
        {
            command: "reset",
            callback: () => {
                handleReset();
            },
        },
    ];
    const {transcript, resetTranscript} = useSpeechRecognition({commands});
    const [isListening, setIsListening] = useState(false);
    const microphoneRef = useRef(null);

    if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
        return (
            <div className="mircophone-container">
                Browser is not Support Speech Recognition.
            </div>
        );
    }
    const handleListing = () => {
        setIsListening(true);
        microphoneRef.current.classList.add("listening");
        SpeechRecognition.startListening({
            continuous: true,
        });
    };
    const stopHandle = () => {
        setIsListening(false);
        microphoneRef.current.classList.remove("listening");
        SpeechRecognition.stopListening();
    };
    const handleReset = () => {
        stopHandle();
        resetTranscript();
    };
    return (
        <div className="microphone-wrapper">
            <div className="mircophone-container">
                {
                    !isListening
                        ?
                        <button type={"button"}
                                ref={microphoneRef}
                                onClick={handleListing}><FaMicrophone size={50}/></button>

                        :

                        <button type="button" onClick={stopHandle}>
                            <FaMicrophoneSlash size={50}/>
                        </button>
                }
                <div className="microphone-status">
                    {isListening ? "Listening........." : "Click to start Listening"}
                </div>

            </div>
            {transcript && (
                <div className="microphone-result-container">
                    <div className="microphone-result-text">{transcript}</div>
                    <button className="microphone-reset btn" onClick={handleReset}>
                        Reset
                    </button>
                </div>
            )}
        </div>
    );
}

export default SR;