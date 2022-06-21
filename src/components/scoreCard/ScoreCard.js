import {useEffect, useState} from 'react';
import axios from "axios";

function ScoreCard() {

    const [scoreCard, setScoreCard] = useState({});

    async function fetchScoreCard() {
        try {
            const result = await axios.get(`http://localhost:8082/scorecards/card?id=1`)
            setScoreCard(result.data);
            console.log(scoreCard)
        } catch (e) {
            console.error(e);
            console.log(e.response.data)
        }
    }
    useEffect(() => {
        fetchScoreCard()
    }, []);

    return (
        <>
            test
        </>
    )
}
export default ScoreCard;