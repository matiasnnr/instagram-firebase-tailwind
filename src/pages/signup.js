import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import FirebaseContext from '../context/firebase';
import { doesUsernameExists } from '../services/firebase';
import * as ROUTES from '../constants/routes';

const SignUp = () => {

    const history = useHistory();
    const { firebase } = useContext(FirebaseContext);

    const [username, setUsername] = useState('');
    const [fullName, setFullName] = useState('')
    const [emailAddress, setEmailAddress] = useState('');
    const [password, setPassword] = useState('');

    const [error, setError] = useState('');
    const isInvalid = password === '' || emailAddress === '';

    const handleSignUp = async (event) => {
        event.preventDefault();

        const usernameExists = await doesUsernameExists(username);

        if (!usernameExists) {
            try {
                const createdUserResult = await firebase
                    .auth()
                    .createUserWithEmailAndPassword(emailAddress, password);

                // authentication
                // -> emailAddress & password & username (displayName)
                await createdUserResult.user.updateProfile({
                    displayName: username
                });

                // firebase user collection (create a document)
                await firebase.firestore().collection('users').add({
                    userId: createdUserResult.user.uid,
                    username: username.toLowerCase(),
                    fullName,
                    emailAddress: emailAddress.toLowerCase(),
                    following: [],
                    followers: [],
                    dateCreated: Date.now()
                });

                history.push(ROUTES.DASHBOARD);
            } catch (error) {
                setFullName('');
                setEmailAddress('');
                setPassword('');
                setError(error.message);
            }
        } else {
            setUsername('');
            setError('Este nombre de usuario no está disponible, por favor intenta con otro.')
        }

        try {
        } catch (error) {
        }
    };

    useEffect(() => {
        document.title = 'Registro - Instagram';
    }, []);

    return (
        <div className="container flex justify-center flex-col my-4 mx-auto max-w-screen-md items-center h-screen md:flex-row">

            <div className="flex mb-6 w-2/5 sm:w-3/5 sm:mb-0">
                <img
                    src="/images/iphone-with-profile.jpg"
                    alt="iPhone with Instagram App" />
            </div>

            <div className="flex flex-col w-3/5 sm:w-2/5">

                <div className="flex flex-col items-center bg-white p-4 
                border border-gray-primary rounded mb-4">
                    <h1 className="flex justify-center w-full">
                        <img
                            className="mt-2 w-6/12 mb-4"
                            src="/images/logo.png"
                            alt="Instagram" />
                    </h1>

                    {error && <p className="mb-4 text-xs text-red-primary">{error}</p>}

                    <form onSubmit={handleSignUp} method="POST">
                        <input
                            type="text"
                            aria-label="Ingresa tu nombre de usuario"
                            placeholder="Nombre de usuario"
                            className="text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border 
                        border-gray-primary rounded mb-2"
                            onChange={({ target }) => setUsername(target.value)}
                            value={username}
                        />
                        <input
                            type="text"
                            aria-label="Ingresa tu nombre completo"
                            placeholder="Nombre y apellido"
                            className="text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border 
                        border-gray-primary rounded mb-2"
                            onChange={({ target }) => setFullName(target.value)}
                            value={fullName}
                        />
                        <input
                            type="text"
                            aria-label="Ingresa tu correo elecrónico"
                            placeholder="Correo electrónico"
                            className="text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border 
                        border-gray-primary rounded mb-2"
                            onChange={({ target }) => setEmailAddress(target.value)}
                            value={emailAddress}
                        />
                        <input
                            type="password"
                            aria-label="Ingresa tu contraseña"
                            placeholder="Contraseña"
                            className="text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border 
                        border-gray-primary rounded mb-2"
                            onChange={({ target }) => setPassword(target.value)}
                            value={password}
                        />
                        <button
                            disabled={isInvalid}
                            type="submit"
                            className={
                                `bg-blue-medium text-white w-full rounded h-8 font-bold
                            ${isInvalid && ' opacity-50 cursor-default'}`
                            }
                        >
                            Regístrate
                    </button>
                    </form>
                </div>

                <div className="flex justify-center items-center flex-col w-full bg-white 
            p-4 border border-gray-primary rounded">
                    <p className="text-sm">¿Ya tienes una cuenta?{` `}
                        <Link
                            className="font-bold text-blue-medium"
                            to={ROUTES.LOGIN}>
                            Inicia sesión
                                </Link>
                    </p>
                </div>

            </div>

        </div>
    )
}

export default SignUp;

// text-red-primary -> hex values
// text-gray-base -> hex values
// border-gray-primary -> hex values