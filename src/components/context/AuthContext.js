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
            setUserRoles(decoded.roles)
            toggleIsAuth({
                ...isAuth,
                isAuth: true,
                user: {
                    username: decoded.sub,
                    gebruikersrollen: userRoles
                }
            })
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
            history.push("/");
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
                gebruikersrollen: userRoles
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
                gebruikersrollen: []
            },
            status: 'done',
        });
        history.push('/');
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