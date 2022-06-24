import React, {createContext, useEffect, useState} from 'react';
import {useHistory} from "react-router-dom";
import jwtDecode from "jwt-decode";
import axios from "axios";

export const AuthContext = createContext({});

function AuthContextProvider({children}) {

    const [auth, toggleAuth] = useState({
        isAuth: false,
        user: {
            username: '',
            email: '',
            roles: {}
        },
        status: "pending"
    });
    const history = useHistory()

    useEffect(() => {
        const token = localStorage.getItem("token");

        if (token) {
            async function getUserData() {
                const decodedToken = jwtDecode(token)
                try {
                    const response = await axios.get(`http://localhost:8082/members/profile?username=${decodedToken.sub}`, {
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: `Bearer ${token}`,
                        }
                    })
                    console.log("dit is een test" + response.data)
                    toggleAuth({
                        isAut: true,
                        user: {
                            username: response.data.username,
                            email: response.data.email,
                            roles: response.data.roles
                        },
                        status: "done",
                    });
                } catch (e) {
                    console.log(e)
                    toggleAuth({
                        ...auth,
                        status: 'error',
                    });
                    localStorage.clear()
                    console.log(e)
                }
            }

            getUserData()
        } else {
            toggleAuth({
                ...auth,
                status: "done",
            });
        }
    }, [])


    function login(token) {
        const decodedToken = jwtDecode(token)
        console.log(decodedToken)
        localStorage.setItem("token", token);
        console.log("De gebruiker is ingelogd!");
        toggleAuth({
            ...auth,
            isAuth: true,
            user: {
                username: decodedToken.sub,
                email: decodedToken.email,
                roles: decodedToken.roles
            },
            status: "done",
        });
        history.push(`/profile/${decodedToken.sub}`);
    }

    function logout() {
        console.log("De gebruiker is uitgelogd!");
        toggleAuth({
            isAuth: false,
            user: null,
            status: "done",
        });
        history.push("/");
    }

    const contextData = {
        isAuth: auth.isAuth,
        user: auth.user,
        login: login,
        logout: logout,
    };
    return (
        <AuthContext.Provider value={contextData}>
            {auth.status === 'done' && children}
            {auth.status === 'pending' && <p>Loading...</p>}
            {auth.status === 'error' && <p>Error! Refresh de pagina!</p>}
        </AuthContext.Provider>
    )
}

export default AuthContextProvider;