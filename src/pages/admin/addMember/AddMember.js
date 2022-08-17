import React from 'react';
import {useForm} from 'react-hook-form';
import './AddMember.css'
import {useState} from 'react';
import {AiOutlineUserAdd} from "react-icons/ai";
import ApiService from "../../../services/ApiService";
import {NotificationManager} from "react-notifications";

export default function AddMember() {

    const [successful, setSuccessful] = useState(false);
    const {
        register,
        formState: {errors},
        handleSubmit,
    } = useForm();

    const onSubmit = data => {
        ApiService
            .addMember(data)
            .then(() => {
                NotificationManager.success('Gebruiker succesvol aangemaakt', 'HET IS GELUKT')
                setSuccessful(true)
            })
            .catch((e) => {
                console.error("Error adding member" + e);
                setSuccessful(false)
            });
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
                                    name="username"
                                    placeholder="Kies een gebruikersnaam"
                                    {...register(
                                        'username',
                                        {
                                            required: 'Gebruikersnaam is verplicht',
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
                                {errors.username &&
                                    NotificationManager.error(errors.username.message, "ER GING WAT MIS")}
                                <br/>
                                <br/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="password">Wachtwoord</label>
                                <input
                                    type="password"
                                    placeholder="Vul hier je wachtwoord in"
                                    {...register('password', {
                                        required: 'Wachtwoord is verplicht',
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
                                {errors.password && NotificationManager.error(errors.password.message, "ER GING WAT MIS")}

                                <br/>
                                <br/>
                            </div>
                            <div className="form-group">

                                <label htmlFor="firstName">Voornaam</label>
                                <input
                                    type="text"
                                    placeholder="Vul hier je voornaam in"
                                    {...register('firstName', {
                                        required: 'Voornaam is verplicht',
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

                                {errors.firstName && NotificationManager.error(errors.firstName.message, "ER GING WAT MIS")}

                                <br/>
                                <br/>
                            </div>
                            <div className="form-group">

                                <label htmlFor="lastName">Achternaam</label>
                                <input
                                    type="text"
                                    placeholder="Achternaam is verplicht"
                                    {...register('lastName', {
                                        required: 'Achternaam is verplicht',
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
                                {errors.lastName && NotificationManager.error(errors.lastName.message, "ER GING WAT MIS")}

                                <br/>
                                <br/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="email">Email</label>
                                <input
                                    placeholder="email@email.com"
                                    type="Vul hier je e-mailadres in"
                                    {...register('email', {
                                        required: 'Email adres is verplicht',
                                        pattern: {
                                            value:
                                                /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                                            message: 'Dit is geen juist email adres',
                                        },
                                    })}
                                />

                                {errors.email && NotificationManager.error(errors.email.message, "ER GING WAT MIS")}

                                <br/>
                                <br/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="dob">Geboortedatum</label>
                                <input
                                    placeholder="dd-mm-jjjj"
                                    type="date"
                                    {...register('dob', {
                                        required: 'Geboortedatum is verplicht',
                                        pattern: {
                                            message: 'Dit is geen juiste datum',
                                        },
                                    })}
                                />

                                {errors.dob && NotificationManager.error(errors.dob.message, "ER GING WAT MIS")}
                                <br/>
                                <br/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="aimScore">Te behalen score:</label>
                                <input
                                    type="number"
                                    placeholder="Voer hier de te behalen score in"
                                    {...register('aimScore', {
                                        required: 'Te behalen score is verplicht',
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
                                {errors.aimScore && NotificationManager.error(errors.aimScore.message, "ER GING WAT MIS")}

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
                                                required: 'Minstens 1 rol is verplicht'
                                            })}/>{' '}
                                        Admin
                                    </label>
                                    <label>
                                        <input
                                            name="role"
                                            type="checkbox"
                                            value="MOD"
                                            {...register('role', {
                                                required: 'Minstens 1 rol is verplicht'
                                            })}/>{' '}
                                        Scheidsrechter
                                    </label>
                                    <label>
                                        <input
                                            name="role"
                                            type="checkbox"
                                            value="USER"
                                            {...register('role', {
                                                required: 'Minstens 1 rol is verplicht'
                                            })}/>{' '}
                                        Gebruiker
                                    </label>z
                                    {errors.role && NotificationManager.error(errors.role.message, "ER GING WAT MIS")}

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