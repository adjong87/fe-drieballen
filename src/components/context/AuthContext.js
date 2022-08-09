import React, {createContext, useEffect, useState} from 'react';
import {useHistory} from 'react-router-dom';
import jwt_decode from 'jwt-decode';
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
            toggleIsAuth({
                ...isAuth,
                isAuth: true,
                user: {
                    username: decoded.sub,
                    gebruikersrollen: [...decoded.roles]
                },
                status: 'done'
            })
        } else {
            // als er GEEN token is doen we niks, en zetten we de status op 'done'
            toggleIsAuth({
                isAuth: false,
                user: {
                    username: null,
                    gebruikersrollen: [],
                },
                status: 'done',

            });
        }
    }, []);

    function login(response) {
        localStorage.setItem('token', response.data.accessToken);
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
        history.push('/login');
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
            {isAuth.status === 'pending' && <p>Loading...</p>}
            {isAuth.status === 'error' && <p>Error! Refresh de pagina!</p>}
        </AuthContext.Provider>
    );
}

export default AuthContextProvider;