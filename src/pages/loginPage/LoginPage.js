import React, {useContext, useEffect, useState} from 'react';
import './LoginPage.css'
import axios from "axios";
import {useHistory} from "react-router-dom";
import balls from '../../assets/balls.png'
import {useForm} from 'react-hook-form';
import {AuthContext} from "../../components/context/AuthContext";


function LoginPage() {
    const {login, isAuth, toggleIsAuth} = useContext(AuthContext);
    const {register, handleSubmit, formState: {errors}} = useForm()

    const onFormSubmit = async data => {
        try {
            await axios.post(
                "http://localhost:8082/api/auth/signIn",
                data,
                {headers: {'Content-Type': 'application/json'}}
            ).then(response => {
                login(response)
                console.log(response)

            })
        } catch (e) {
            console.error(e.message)
        }

    };

    return (
        <>
            <div className="login-outer-container">
                <div className="login-fill-container">
                </div>
                <div className="login-center-container">
                    <div className="login-center-inner-container">
                        <div className="login-center-container-top">
                            <img src={balls} alt="ballen"/>
                            <h1>Inloggen bij de Drie Ballen</h1>
                        </div>
                        <div className="login-center-container-bottom">
                            <form onSubmit={handleSubmit(onFormSubmit)}>
                                <div className="login-form-group">
                                    <label htmlFor="username">
                                        Gebruikersnaam
                                        <input
                                            type="text"
                                            id="username"
                                            {...register("username", {
                                                required: "Username mag niet leeg zijn.",
                                            })}
                                            placeholder="username"/>
                                    </label>
                                    {errors.username && <p>{errors.username.message}</p>}
                                </div>
                                <div className="login-form-group">
                                    <label htmlFor="password">
                                        Wachtwoord:
                                        <input
                                            type="password"
                                            id="password"
                                            {...register("password")}
                                            placeholder="wachtwoord"
                                        />
                                    </label>
                                    {errors.password && <p>{errors.password.message}</p>}
                                </div>
                                <div className="login-form-group">
                                    <button className="btn btn-primary btn-block">
                                        <span>Login</span>
                                    </button>
                                </div>

                            </form>
                        </div>
                    </div>
                </div>
                <div className="login-fill-container">
                </div>
            </div>
        </>
    )

}

export default LoginPage;
