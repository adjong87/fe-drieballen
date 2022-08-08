import React from 'react'
import './Button.css'
import {useContext} from 'react';
import {AuthContext} from "../../context/AuthContext";
import {Link} from "react-router-dom";

function Button() {
    const {logout} = useContext(AuthContext)
    const {isAuth} = useContext(AuthContext)

    return (
        <>
            {isAuth ?
                <button className="btn"
                        onClick={logout}>
                    Uitloggen
                </button>
                :
                <Link to="/Login">
                    <button className="btn">
                        Inloggen
                    </button>
                </Link>}
        </>
    )
}

export default Button;