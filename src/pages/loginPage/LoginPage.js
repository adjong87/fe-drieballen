import React, {useContext} from 'react';
import './LoginPage.css'
import balls from '../../assets/balls.png'
import {useForm} from 'react-hook-form';
import {AuthContext} from "../../components/context/AuthContext";
import ApiService from "../../services/ApiService";
import {NotificationManager} from "react-notifications";


function LoginPage() {
    const {login} = useContext(AuthContext);
    const {
        register,
        formState: {errors},
        handleSubmit,
    } = useForm();

    const onFormSubmit = data => {
        ApiService
            .Login(data)
            .then(response => login(response))
            .catch(error => console.log(error))
    }

    return (
        <>
            <div className="login-outer-container">
                <div className="login-center-container">
                    <div className="login-center-inner-container">
                        <img src={balls} alt="ballen"/>
                        <h1>Inloggen bij de Drie Ballen</h1>
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
                                                min: {
                                                    value: 1,
                                                    message: 'Minimale invoer is 1'
                                                },
                                                max: {
                                                    value: 20,
                                                    message: 'Meer dan 20 kan niet',
                                                },
                                            })}
                                            placeholder="username"/>
                                    </label>
                                    {errors.username && NotificationManager.error(errors.username.message, "ER GING WAT MIS")}
                                </div>
                                <div className="login-form-group">
                                    <label htmlFor="password">
                                        Wachtwoord:
                                        <input
                                            type="password"
                                            {...register("password", {
                                                required: "Wachtwoord mag niet leeg zijn",
                                                min: {
                                                    value: 8,
                                                    message: 'Wachtwoord moet minstens 8 tekens bevatten'
                                                },
                                                max: {
                                                    value: 20,
                                                    message: 'Wachtwoord mag maximaal 20 tekens bevatten',
                                                },
                                            })}
                                            placeholder="wachtwoord"/>
                                    </label>
                                    {errors.password && NotificationManager.error(errors.password.message, "ER GING WAT MIS")}
                                </div>
                                <div className="login-form-group">
                                    <button className="login-form-group-button">
                                        <span>Login</span>
                                    </button>
                                </div>

                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )


}

export default LoginPage;
