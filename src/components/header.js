import React, { useContext, useState } from 'react';
import FirebaseContext from '../context/firebase';
import * as ROUTES from '../constants/routes';
import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';
import useUser from '../hooks/use-user';
import UploadImageModal from './modals/upload-image-modal';

const Header = () => {

    const { firebase } = useContext(FirebaseContext);
    const { user } = useUser();
    const [show, setShow] = useState(false);
    const history = useHistory();

    return (
        <header className="h-16 bg-white border-b border-gray-primary mb-8 mx-2 lg:mx-0">
            <div className="container mx-auto max-w-screen-lg h-full">
                <div className="flex justify-between h-full">
                    <div className="text-gray-700 text-center flex items-center align-items
                    cursor-pointer">
                        <h1 className="flex justify-center w-full">
                            <Link to={ROUTES.DASHBOARD} aria-label="Instagram logo">
                                <img
                                    className="mt-1 w-6/12"
                                    src="/images/logo.png"
                                    alt="Instagram"
                                />
                            </Link>
                        </h1>
                    </div>
                    <div className="text-gray-700 text-center flex items-center align-items">
                        {
                            Object.entries(user).length
                                ?
                                <>
                                    <Link to={ROUTES.DASHBOARD} aria-label="Inicio">
                                        <svg
                                            className="w-6 md:w-8 mr-4 md:mr-6 text-black-light cursor-pointer"
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                                            />
                                        </svg>
                                    </Link>

                                    <button
                                        type="button"
                                        title="Subir imagen"
                                        onClick={() => setShow(true)}
                                    >

                                        <svg
                                            className="w-6 md:w-8 mr-4 md:mr-6 text-black-light cursor-pointer"
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none" viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                                            />
                                        </svg>
                                    </button>

                                    <button
                                        type="button"
                                        title="Salir"
                                        onClick={() => {
                                            firebase.auth().signOut();
                                            history.push(ROUTES.LOGIN)
                                        }}
                                    >
                                        <svg
                                            className="w-6 md:w-8 mr-4 md:mr-6 text-black-light cursor-pointer"
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                                            />
                                        </svg>
                                    </button>

                                    <div className="flex items-center cursor-pointer">
                                        <Link to={`/profile/${user.username}`}>
                                            <img
                                                className="rounded-full h-8 w-8 flex"
                                                src={`/images/avatars/${user.username !== 'orwell' &&
                                                    user.username !== 'karl' &&
                                                    user.username !== 'dali' &&
                                                    user.username !== 'raphael'
                                                    ? 'default' : user.username
                                                    }.${user.username !== 'orwell' &&
                                                        user.username !== 'karl' &&
                                                        user.username !== 'dali' &&
                                                        user.username !== 'raphael'
                                                        ? 'png' : 'jpg'}`}
                                                alt={`${user.username} profile`}
                                            />
                                        </Link>
                                    </div>
                                </>
                                :
                                <>
                                    <Link to={ROUTES.LOGIN}>
                                        <button
                                            className="bg-blue-medium 
                                        font-bold text-sm rounded text-white w-20 h-8"
                                            type="button"
                                        >
                                            Entrar
                                            </button>
                                    </Link>
                                    <Link to={ROUTES.SIGNUP}>
                                        <button
                                            className="font-bold text-sm rounded text-blue-medium w-20 h-8"
                                            type="button"
                                        >
                                            Registro
                                            </button>
                                    </Link>
                                </>
                        }
                    </div>
                </div>
            </div>
            <UploadImageModal show={show} setShow={setShow} user={user} />
        </header>
    )
}

export default Header;
