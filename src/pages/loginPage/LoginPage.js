import React, {useContext, useRef, useState} from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import './LoginPage.css'
import balls from '../../assets/balls.png'
import axios from "axios";
import {AuthContext} from "../../components/context/AuthContext";

const {login} = useContext(AuthContext);

const LoginPage = () => {

    const form = useRef();
    const checkBtn = useRef();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");


    const required = (value) => {
        if (!value) {
            return (
                <div className="alert alert-danger" role="alert">
                    This field is required!
                </div>
            );
        }
    };

    const onChangeUsername = (e) => {
        const username = e.target.value;
        setUsername(username);
    };

    const onChangePassword = (e) => {
        const password = e.target.value;
        setPassword(password);
    };

    const handleLogin = (e) => {
        e.preventDefault();
        setMessage("");
        setLoading(true)
        MakeLoginRequest();
    }


    async function MakeLoginRequest() {
        try {
            const response = await axios.post('http://localhost:8082/api/auth', {
                username: {username},
                password: {password},
            });
            console.log(response.data.accesToken);
            login(response.data.accesToken)
        } catch (e) {
            console.error(e);
        }
    }

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
                            <Form onSubmit={handleLogin} ref={form}>
                                <div className="login-form-group">
                                    <label htmlFor="username">Username</label>
                                    <Input
                                        type="text"
                                        className="form-control"
                                        name="username"
                                        value={username}
                                        onChange={onChangeUsername}
                                        validations={[required]}/>
                                </div>
                                <div className="login-form-group">
                                    <label htmlFor="password">Password</label>
                                    <Input
                                        type="password"
                                        className="form-control"
                                        name="password"
                                        value={password}
                                        onChange={onChangePassword}
                                        validations={[required]}
                                    />
                                </div>
                                <div className="login-form-group">
                                    <button className="btn btn-primary btn-block" disabled={loading}>
                                        {loading && (
                                            <span className="spinner-border spinner-border-sm"></span>
                                        )}
                                        <span>Login</span>
                                    </button>
                                </div>

                                {message && (
                                    <div className="login-form-group">
                                        <div className="alert alert-danger" role="alert">
                                            {message}
                                        </div>
                                    </div>
                                )}
                                <CheckButton style={{display: "none"}} ref={checkBtn}/>
                            </Form>
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