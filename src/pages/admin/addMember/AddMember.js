import React from 'react';
import {useForm} from 'react-hook-form';
import './AddMember.css'
import {useState} from 'react';
import axios from "axios";
import {AiOutlineUserAdd} from "react-icons/ai";

export default function AddMember() {

    const [successful, setSuccessful] = useState(false);
    const {
        register,
        formState: {errors},
        handleSubmit,
    } = useForm();

    const onSubmit = data => {
        try {
            axios.post(
                "http://localhost:8082/api/auth/signUp",
                data,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        "Authorization": `Bearer ${localStorage.getItem("token")}`
                    }
                }
            )
            setSuccessful(true)
        } catch (e) {
            console.error(e.message)
            setSuccessful(false)
        }
    };

    return (
        <>
            <div className="add-member-container">
                {!successful
                    ?
                    <div className="add-member-form">
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="form-group">
                                <label htmlFor="username">Gebruikersnaam</label>
                                <input
                                    type="text"
                                    placeholder="Kies een gebruikersnaam"
                                    {...register('username', {
                                        required: 'Dit veld is verplicht',
                                        minLength: {
                                            value: 2,
                                            message: 'Minstens 2 tekens invoeren'
                                        },
                                        maxLength: {
                                            value: 20,
                                            message: 'Maximale invoer is 20 tekens',
                                        },
                                    })}
                                />
                                {errors.username && errors.username.message}
                                <br/>
                                <br/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="password">Wachtwoord</label>
                                <input
                                    type="password"
                                    placeholder="Vul hier je wachtwoord in"
                                    {...register('password', {
                                        required: 'Dit veld is verplicht',
                                        minLength: {
                                            value: 6,
                                            message: 'Minstens 6 tekens invoeren'
                                        },
                                        maxLength: {
                                            value: 20,
                                            message: 'Maximale invoer is 20 tekens',
                                        },
                                    })}
                                />
                                {errors.password && errors.password.message}
                                <br/>
                                <br/>
                            </div>
                            <div className="form-group">

                                <label htmlFor="firstName">Voornaam</label>
                                <input
                                    type="text"
                                    placeholder="Vul hier je voornaam in"
                                    {...register('firstName', {
                                        required: 'Dit veld is verplicht',
                                        minLength: {
                                            value: 2,
                                            message: 'Minstens 2 tekens invoeren'
                                        },
                                        maxLength: {
                                            value: 20,
                                            message: 'Maximale invoer is 20 tekens',
                                        },
                                    })}
                                />

                                {errors.firstName && errors.firstName.message}
                                <br/>
                                <br/>
                            </div>
                            <div className="form-group">

                                <label htmlFor="lastName">Achternaam</label>
                                <input
                                    type="text"
                                    placeholder="Vul hier je achternaam in"
                                    {...register('lastName', {
                                        required: 'Dit veld is verplicht',
                                        minLength: {
                                            value: 2,
                                            message: 'Minstens 2 tekens invoeren'
                                        },
                                        maxLength: {
                                            value: 20,
                                            message: 'Maximale invoer is 20 tekens',
                                        },
                                    })}
                                />
                                {errors.lastName && errors.lastName.message}
                                <br/>
                                <br/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="age">Leeftijd</label>
                                <input
                                    type="number"
                                    placeholder="Voer hier je leeftijd in"
                                    {...register('age', {
                                        required: 'Dit veld is verplicht',
                                        min: {
                                            value: 1,
                                            message: 'Minimale invoer is 1'
                                        },
                                        max: {
                                            value: 99,
                                            message: 'Hoger dan 99 kan niet',
                                        },
                                    })}
                                />

                                {errors.age && errors.aimScore.age}
                                <br/>
                                <br/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="email">Email</label>
                                <input
                                    placeholder="email@email.com"
                                    type="Vul hier je e-mailadres in"
                                    {...register('email', {
                                        required: 'Dit veld is verplicht',
                                        pattern: {
                                            value:
                                                /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                                            message: 'Dit is geen juist email adres',
                                        },
                                    })}
                                />

                                {errors.email && errors.email.message}
                                <br/>
                                <br/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="aimScore">Te behalen score:</label>
                                <input
                                    type="number"
                                    placeholder="Voer hier de te behalen score in"
                                    {...register('aimScore', {
                                        required: 'Dit veld is verplicht',
                                        min: {
                                            value: 1,
                                            message: 'Minimale invoer is 1'
                                        },
                                        max: {
                                            value: 99,
                                            message: 'Hoger dan 99 kan niet',
                                        },
                                    })}
                                />
                                {errors.aimScore && errors.aimScore.message}
                                <br/>
                                <br/>
                            </div>
                            <div className="form-group-bottom">
                                <div className="form-group">
                                    <p>Kies de gewenste gebruikersrollen</p>
                                    <label>
                                        <input
                                            name="role"
                                            type="checkbox"
                                            value="ADMIN"
                                            {...register('role', {
                                                required: 'Dit veld is verplicht'
                                            })}/>{' '}
                                        Admin
                                    </label>
                                    <label>
                                        <input
                                            name="role"
                                            type="checkbox"
                                            value="MOD"
                                            {...register('role', {
                                                required: 'Dit veld is verplicht'
                                            })}/>{' '}
                                        Scheidsrechter
                                    </label>
                                    <label>
                                        <input
                                            name="role"
                                            type="checkbox"
                                            value="USER"
                                            {...register('role', {
                                                required: 'Dit veld is verplicht'

                                            })}/>{' '}
                                        Gebruiker
                                    </label>
                                    {errors.role && <p>{errors.role.message}</p>}
                                </div>
                                <div className="form-group-bottom-button">
                                    <button type="submit"><AiOutlineUserAdd size={70}/></button>
                                </div>
                            </div>
                        </form>
                    </div>
                    :
                    <div>
                        <h1>Nieuwe gebruiker aangemaakt!</h1>
                    </div>
                }
            </div>
        </>
    );
}