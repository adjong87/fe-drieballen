import axios from 'axios';

const PLAYED_GAME_API_BASE_URL = "http://localhost:8082/playedgame";
const SCORECARD_API_BASE_URL = "http://localhost:8082/scorecards"
const PROFILE_API_BASE_URL = "http://localhost:8082/profiles"
const API_BASE_URL = "http://localhost:8082"
let token = localStorage.getItem("token");

const PHOTO_CONFIG = {
    headers:
        {
            "Content-Type": "multipart/form-data",
            "Authorization": `Bearer ${(token)}`
        }
}

const CONFIG = {
    headers:
        {
            'Content-Type': 'application/json',
            "Authorization": `Bearer ${(token)}`
        }
}


class ApiService {

    setToken(inputToken) {
        token = inputToken;
    }


    getProfile(username) {
        return axios.get(
            PLAYED_GAME_API_BASE_URL + "/find?username=" + username,
            CONFIG,
        )
    }

    getScoreCard(id) {
        return axios.get(
            PLAYED_GAME_API_BASE_URL + "/findbyid?id=" + id,
            CONFIG);
    }

    fillScore(id, data) {
        return axios.put(
            SCORECARD_API_BASE_URL + "/fill?id=" + id,
            data,
            CONFIG);
    }

    getPlayedGame(id) {
        return axios.get(
            SCORECARD_API_BASE_URL + "/donecard?id=" + id,
            CONFIG)
    }

    fetchPlayer(username) {
        return axios.get(
            PROFILE_API_BASE_URL + "/profile?username=" + username,
            CONFIG
        )
    }

    checkGames() {
        return axios.get(
            SCORECARD_API_BASE_URL + "/referee",
            CONFIG
        )
    }

    createGame(player1, player2) {
        return axios.get(
            PLAYED_GAME_API_BASE_URL + "/createGame?playerOne=" + player1 + "&playerTwo=" + player2,
            CONFIG
        )
    }

    getAllProfiles() {
        return axios.get(
            PROFILE_API_BASE_URL + "/all",
            CONFIG)
    }

    deleteProfile(username) {
        return axios.delete(
            PROFILE_API_BASE_URL + "/delete/" + username,
            CONFIG)
    }

    deletePhoto(username) {
        return axios.delete(
            API_BASE_URL + "/delete/" + username + "/photo",
            CONFIG)
    }

    uploadPhoto(username, foto) {
        return axios.post(
            "http://localhost:8082/upload/" + username + "/photo",
            foto,
            PHOTO_CONFIG)
    }

    addMember(data) {
        return axios.post(
            API_BASE_URL + "/api/auth/signUp",
            data,
            CONFIG)
    }

    Login(data) {
        return axios.post(
            API_BASE_URL + "/api/auth/signIn",
            data)
    }
}

export default new ApiService();