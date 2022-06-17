import React, { Component } from "react";
import {useEffect, useState} from "@types/react";
import axios from "axios";

function ScoreCard() {

    const [scoreCard, setScoreCard] = useState({});

    async function fetchScoreCard() {
        try {
            const result = await axios.get(`http://localhost:8082/members/profile?username=HermanD`)
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

}