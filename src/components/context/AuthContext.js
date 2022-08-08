import React, {createContext, useEffect, useState} from 'react';
import {useHistory} from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import axios from 'axios';
import isTokenValid from '../helpers/isTokenValid';

export const AuthContext = createContext({});

function AuthContextProvider({children}) {
    const [userRoles, setUserRoles] = useState([])
    const [isAuth, toggleIsAuth] = useState({
        isAuth: false,
        user: null,
        status: 'done',
    });
    const history = useHistory();

    useEffect(() => {
        const token = localStorage.getItem('token');

        if (token && isTokenValid(token)) {
            const decoded = jwt_decode(token);
            console.log(decoded)
            fetchUserData(decoded.sub, token);
        } else {
            // als er GEEN token is doen we niks, en zetten we de status op 'done'
            toggleIsAuth({
                isAuth: false,
                user: {
                    username: null,
                    email: null,
                    gebruikersrollen: []
                },
                status: 'done',
            });
        }
    }, []);

    function login(response) {
        localStorage.setItem('token', response.data.accessToken);
        setUserRoles(response.data.roles)
        toggleIsAuth({
            ...isAuth,
            isAuth: true,
            user: {
                username: response.data.username,
                email: response.data.email,
                gebruikersrollen: response.data.roles,

            },
            status: 'done',
        })
        history.push("/");
    }

    function logout() {
        localStorage.removeItem("token");

        toggleIsAuth({
            isAuth: false,
            user: {
                username: null,
                email: null,
                gebruikersrollen: []
            },
            status: 'done',
        });

        console.log('Gebruiker is uitgelogd!');


        history.push('/');
    }


    // Omdat we deze functie in login- en het mounting-effect gebruiken, staat hij hier gedeclareerd!
    async function fetchUserData(id, token, redirectUrl) {
        try {
            // haal gebruikersdata op met de token en id van de gebruiker
            const result = await axios.get(`http://localhost:8082/profiles/getUserData/${id}`, {
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
                    gebruikersrollen: [...result.data.roles],

                },
                status: 'done',

            })
            // als er een redirect URL is meegegeven (bij het mount-effect doen we dit niet) linken we hiernnaartoe door
            // als we de history.push in de login-functie zouden zetten, linken we al door voor de gebuiker is opgehaald!
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
                gebruikersrollen: [],
            });
        }
    }

    const contextData = {
        isAuth: isAuth.isAuth,
        user: isAuth.user,
        gebruikersrollen: [...userRoles],

        login: login,
        logout: logout,
    };

    return (
        <AuthContext.Provider value={contextData}>
            {isAuth.status === 'done' ? children : <p>Loading...</p>}
            {isAuth.status === 'pending' && <p>Loading...</p>}
            {isAuth.status === 'error' && <p>Error! Refresh de pagina!</p>}
        </AuthContext.Provider>
    );
}

export default AuthContextProvider;