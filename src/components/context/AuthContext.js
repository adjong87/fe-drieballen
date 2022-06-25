import React, { createContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import axios from 'axios';
import isTokenValid from '../helpers/isTokenValid';

export const AuthContext = createContext({});

function AuthContextProvider({ children }) {
    const [isAuth, toggleIsAuth] = useState({
        isAuth: false,
        user: null,
        status: 'pending',
    });
    const history = useHistory();

    // MOUNTING EFFECT
    useEffect(() => {
        // haal de JWT op uit Local Storage
        const token = localStorage.getItem('token');

        // als er WEL een token is, haal dan opnieuw de gebruikersdata op
        if (token && isTokenValid(token)) {
            const decoded = jwt_decode(token);
            fetchUserData(decoded.sub, token);
        } else {
            // als er GEEN token is doen we niks, en zetten we de status op 'done'
            toggleIsAuth({
                isAuth: false,
                user: null,
                status: 'done',
            });
        }
    }, []);

    function login(JWT, roles) {
        // zet de token in de Local Storage
        localStorage.setItem('token', JWT);
        localStorage.setItem('roles', roles)
        // decode de token zodat we de ID van de gebruiker hebben en data kunnen ophalen voor de context
        const decoded = jwt_decode(JWT);
        console.log(decoded)
        // geef de ID, token en redirect-link mee aan de fetchUserData functie (staat hieronder)
        fetchUserData(decoded.sub, JWT, `/profile/${decoded.sub}`);
        // link de gebruiker door naar de profielpagina
        // history.push('/profilePage');
    }

    function logout() {
        localStorage.clear();
        toggleIsAuth({
            isAuth: false,
            user: null,
            status: 'done',
        });

        console.log('Gebruiker is uitgelogd!');
        history.push('/');
    }

    // Omdat we deze functie in login- en het mounting-effect gebruiken, staat hij hier gedeclareerd!
    async function fetchUserData(id, token, redirectUrl) {
        try {
            // haal gebruikersdata op met de token en id van de gebruiker
            const result = await axios.get(`http://localhost:8082/members/profile?username=${id}`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });

            // zet de gegevens in de state
            toggleIsAuth({
                ...isAuth,
                isAuth: true,
                user: {
                    username: result.data.username,
                    email: result.data.email,
                    id: result.data.id,
                },
                status: 'done',
            });

            if (redirectUrl) {
                history.push(redirectUrl);
            }

        } catch (e) {
            console.error(e);
            // ging er iets mis? Plaatsen we geen data in de state
            toggleIsAuth({
                isAuth: false,
                user: null,
                status: 'done',
            });
        }
    }

    const contextData = {
        isAuth: isAuth.isAuth,
        user: isAuth.user,
        login: login,
        logout: logout,
    };

    return (
        <AuthContext.Provider value={contextData}>
            {isAuth.status === 'done' ? children : <p>Loading...</p>}
        </AuthContext.Provider>
    );
}

export default AuthContextProvider;