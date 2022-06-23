import React, {createContext, useState} from 'react';
import {useHistory} from 'react-router-dom';
import jwtDecode from "jwt-decode";

export const AuthContext = createContext({});

function AuthContextProvider({children}) {
    const history = useHistory();
    const [user, setUser] = useState({
        email: '',
        username: '',
        role: {}
    })


    function login(token) {
        console.log(token)
        const decodedToken = jwtDecode(token)
        console.log(decodedToken)
        localStorage.setItem('token', token)
        // setUser({
        //     email: decodedToken.email,
        //     username: decodedToken.username,
        //     role: decodedToken.role
        // })
        history.push('/profile');
    }

    function logout() {
        console.log('Gebruiker is uitgelogd!');
        toggleAuth(false);
        history.push('/');
    }

    const contextData = {
        isAuth: Auth,
        login: login,
        logout: logout,
    };

    return (
        <AuthContext.Provider value={contextData}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthContextProvider;