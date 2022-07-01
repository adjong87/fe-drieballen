import React from 'react'
import './Button.css'
import {useContext} from 'react';
import {AuthContext} from "../../context/AuthContext";


function Button() {
    const {login, logout} = useContext(AuthContext)
    const {isAuth} = useContext(AuthContext)



    return (
        <>
            {isAuth ?
                <button className="btn"
                        onClick={logout}>
                    Uitloggen
                </button> : <button className="btn"
                                    onClick={login}>
                    Inloggen
                </button>}
        </>


    )
}

export default Button;