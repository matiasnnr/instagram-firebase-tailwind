import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import FirebaseContext from '../context/firebase';
import * as ROUTES from '../constants/routes';

const Login = () => {

    const history = useHistory();
    const { firebase } = useContext(FirebaseContext);

    const [emailAddress, setEmailAddress] = useState('');
    const [password, setPassword] = useState('');

    const [error, setError] = useState('');
    const isInvalid = password === '' || emailAddress === '';

    const handleLogin = async (event) => {
        event.preventDefault();

        try {
            await firebase.auth().signInWithEmailAndPassword(emailAddress, password);
            history.push(ROUTES.DASHBOARD)
        } catch (error) {
            setEmailAddress('');
            setPassword('');
            setError(error.message);
        }
    };

    useEffect(() => {
        document.title = 'Login - Instagram';
    }, []);

    return (
        <div className="container flex justify-center flex-col mx-auto max-w-screen-md items-center h-screen md:flex-row">

            <div className="flex w-3/5">
                <img
                    src="/images/iphone-with-profile.jpg"
                    alt="iPhone with Instagram App" />
            </div>

            <div className="flex flex-col w-2/5">

                <div className="flex flex-col items-center bg-white p-4 
                border border-gray-primary rounded mb-4">
                    <h1 className="flex justify-center w-full">
                        <img
                            className="mt-2 w-6/12 mb-4"
                            src="/images/logo.png"
                            alt="Instagram" />
                    </h1>

                    {error && <p className="mb-4 text-xs text-red-primary">{error}</p>}

                    <form onSubmit={handleLogin} method="POST">
                        <input
                            type="text"
                            aria-label="Ingresa tu correo elecrónico"
                            placeholder="Correo electrónico"
                            className="text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border 
                        border-gray-primary rounded mb-2"
                            onChange={({ target }) => setEmailAddress(target.value)}
                        />
                        <input
                            type="password"
                            aria-label="Ingresa tu contraseña"
                            placeholder="Contraseña"
                            className="text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border 
                        border-gray-primary rounded mb-2"
                            onChange={({ target }) => setPassword(target.value)}
                        />
                        <button
                            disabled={isInvalid}
                            type="submit"
                            className={
                                `bg-blue-medium text-white w-full rounded h-8 font-bold
                            ${isInvalid && ' opacity-50 cursor-default'}`
                            }
                        >
                            Iniciar sesión
                    </button>
                    </form>
                </div>

                <div className="flex justify-center items-center flex-col w-full bg-white 
            p-4 border border-gray-primary rounded">
                    <p className="text-sm">¿No tienes una cuenta?{` `}
                        <Link
                            className="font-bold text-blue-medium"
                            to="/signup">
                            Regístrate
                                </Link>
                    </p>
                </div>

            </div>

        </div>
    )
}

export default Login;

// text-red-primary -> hex values
// text-gray-base -> hex values
// border-gray-primary -> hex values