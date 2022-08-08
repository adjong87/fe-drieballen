import React, {createContext, useEffect, useState} from 'react';
import {useHistory} from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import axios from 'axios';
import isTokenValid from '../helpers/isTokenValid';

export const AuthContext = createContext({});

function AuthContextProvider({children}) {
    const [userRole, setUserRole] = useState([])
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
            setUserRole(decoded.roles.map((role) => { return userRole.push(role) }));
            fetchUserData(decoded, token);


        } else {
            // als er GEEN token is doen we niks, en zetten we de status op 'done'
            toggleIsAuth({
                isAuth: false,
                user: {
                    username: null,
                    gebruikersrollen: []
                },
                status: 'done',

            });
            console.log("er gaat wat mis")
        }

    }, []);

    function login(response) {
        localStorage.setItem('token', response.data.accessToken);
        setUserRole(response.data.roles.map((role) => { return userRole.push(role) }));
        toggleIsAuth({
            ...isAuth,
            isAuth: true,
            user: {
                username: response.data.username,
                gebruikersrollen: response.data.roles,
            },
            status: 'done',
        })
        history.push("/home");
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


        history.push('/login');
    }


    // Omdat we deze functie in login- en het mounting-effect gebruiken, staat hij hier gedeclareerd!
    async function fetchUserData(decoded, token) {
        try {
            // haal gebruikersdata op met de token en id van de gebruiker
            await axios.get(`http://localhost:8082/profiles/getUserData/${decoded.sub}`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            }).then(result => {
                toggleIsAuth({
                    ...isAuth,
                    isAuth: true,
                    user: {
                        username: result.data.username,
                        email: result.data.email,
                        gebruikersrollen: [...decoded.roles],

                    },
                    status: 'done',
                })
            })

            history.push("/profile")

        } catch (e) {
            console.error(e);
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
        menuRoles: isAuth.user.gebruikersrollen,
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