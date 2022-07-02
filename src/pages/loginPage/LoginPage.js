import React, {useEffect, useState} from 'react';
import './LoginPage.css'
import axios from "axios";
import {useHistory} from "react-router-dom";


function LoginPage() {
    // state voor het formulier
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    // state voor functionaliteit
    const [error, toggleError] = useState(false);
    const [loading, toggleLoading] = useState(false);

    // we maken een canceltoken aan voor ons netwerk-request
    const source = axios.CancelToken.source();
    const history = useHistory();

    // mocht onze pagina ge-unmount worden voor we klaar zijn met data ophalen, aborten we het request
    useEffect(() => {
        return function cleanup() {
            source.cancel();
        }
    }, []);

    async function handleSubmit(e) {
        e.preventDefault();
        toggleError(false);
        toggleLoading(true);


        try {
            await axios.post('http://localhost:8082/api/auth/signIn', {
                username: username,
                password: password
            }, {
                headers: {'Content-Type': 'application/json'},
                cancelToken: source.token,
            });

            // als alles goed gegaan is, linken we dyoor naar de login-pagina
            history.push('/signin');
        } catch (e) {
            console.error(e);
            toggleError(true);
        }

        toggleLoading(false);
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="gebruikersnaam">
                        Gebruikersnaam:
                        <input
                            type="text"
                            id="gebruikersnaam"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="Vul hier je gebruikersnaam in"
                        />
                    </label>
                </div>
                <div className="form-group">

                    <label htmlFor="wachtwoord">
                        Wachtwoord:
                        <input
                            type="password"
                            id="wachtwoord"
                            name="password"
                            value={password}
                            placeholder="Vul hier je wachtwoord in"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </label>
                </div>
                {error && <p className="error">Er bestaat reeds een gebruiker op basis van deze gegevens.</p>}
                <button
                    type="submit"
                    className="form-button"
                    disabled={loading}
                >
                    Login
                </button>
            </form>
        </>
    )


}

export default LoginPage;