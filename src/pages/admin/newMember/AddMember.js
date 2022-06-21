import React from 'react';
import {useForm} from 'react-hook-form';
import './AddMember.css'
import {useState} from 'react';

export default function AddMember() {

    const [successful, setSuccessful] = useState(false);

    const {
        register,
        formState: {errors},
        handleSubmit,
    } = useForm();
    const onSubmit = (data) => {
        setSuccessful(!successful)
        console.log(data)
    };

    return (
        <>
            {!successful ?

                <div className="add-member-container">
            <div className="add-member-form">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-group">
                        <label htmlFor="username">Gebruikersnaam</label>
                        <input
                            type="text"
                            placeholder="voornaam"
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
                            placeholder="wachtwoord"
                            {...register('password', {
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
                        {errors.password && errors.password.message}
                        <br/>
                        <br/>
                    </div>
                    <div className="form-group">

                        <label htmlFor="firstName">Voornaam</label>
                        <input
                            type="text"
                            placeholder="voornaam"
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
                            placeholder="achternaam"
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

                        <label htmlFor="email">Email</label>
                        <input
                            placeholder="email@email.com"
                            type="email"
                            {...register('email', {
                                required: 'Dit veld is verplicht',
                                pattern: {
                                    value:
                                        /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                                    message: 'Invalid email address',
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
                    <div className="form-group">
                        <label>
                            <input
                                name="admin"
                                type="checkbox"
                                value="Watermelon"
                                ref={...register('role')}
                            />{' '}
                            Admin
                        </label>
                        <label>
                            <input
                                name="fruit[4]"
                                type="checkbox"
                                value="Raspberry"
                                ref={register({ required: 'Please select a fruit' })}
                            />{' '}
                            Raspberry
                        </label>
                    </div>
                    <button type="submit">Submit</button>
                </form>
            </div>
        </div> : <div>Nieuwe gebruiker aangemaakt!</div>}
        </>
    );
}