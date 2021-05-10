import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { createPost, uploadImage } from '../../services/firebase';
import ButtonSpinner from '../button-spinner';
import PropTypes from 'prop-types';

const UploadImageModal = ({ show, setShow, user }) => {

    const [caption, setCaption] = useState('');
    const [fileToUpload, setFileToUpload] = useState(null);
    const [loading, setLoading] = useState(false);

    const onDrop = useCallback(acceptedFile => {
        const file = {
            type: "image", // para definir el tipo de file 
            file: acceptedFile[0], // se envía para guardar en la db
            preview: URL.createObjectURL(acceptedFile[0]) // esta se usa para hacer una vista previa
        }
        setFileToUpload(file);
    }, [])

    const { getRootProps, getInputProps } = useDropzone({ onDrop });

    return (
        // <!-- This example requires Tailwind CSS v2.0+ -->
        <div
            className={`${show ? 'block' : 'hidden'} fixed z-10 inset-0 overflow-y-scroll`}
            aria-labelledby="modal-title"
            role="dialog"
            aria-modal="true"
        >
            <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                {/* <!--
              Background overlay, show/hide based on modal state.
        
              Entering: "ease-out duration-300"
                From: "opacity-0"
                To: "opacity-100"
              Leaving: "ease-in duration-200"
                From: "opacity-100"
                To: "opacity-0"
            --> */}
                <div className="fixed inset-0 bg-gray-modal_500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>

                {/* <!-- This element is to trick the browser into centering the modal contents. --> */}
                <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

                {/* <!--
              Modal panel, show/hide based on modal state.
        
              Entering: "ease-out duration-300"
                From: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                To: "opacity-100 translate-y-0 sm:scale-100"
              Leaving: "ease-in duration-200"
                From: "opacity-100 translate-y-0 sm:scale-100"
                To: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            --> */}
                {/* este div tiene el contenido del modal */}
                <div className="border border-gray-primary inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                    <div className="bg-white">
                        <div className="sm:items-start">

                            <div
                                disabled={loading}
                                className={`${fileToUpload ? 'hidden' : 'block'} w-full h-60 bg-gray-primary p-2`}
                                {...getRootProps()}
                            >
                                <div className="h-full border rounded-md border-dashed border-black-faded text-black-faded flex items-center justify-center p-4">
                                    <input
                                        {...getInputProps()}
                                    />
                                    <p className="">Arrastra la imagen o haz click acá para poder seleccionarla</p>
                                </div>
                            </div>

                            {
                                fileToUpload
                                &&
                                (
                                    <div className="relative">
                                        <img
                                            className="w-full"
                                            src={fileToUpload.preview}
                                            alt={caption}
                                        />
                                        <button
                                            disabled={loading}
                                            className="absolute bottom-0 right-0 h-8 w-8 bg-blue-medium rounded m-2"
                                            onClick={() => setFileToUpload(null)}
                                        >
                                            <svg
                                                className="h-6 w-6 m-1 text-white"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor">
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                            </svg>
                                        </button>
                                    </div>
                                )
                            }

                            <div className="px-4 mt-3 text-center">

                                <div className="border rounded-md border-gray-primary">
                                    <input
                                        disabled={loading}
                                        type="text"
                                        aria-label="Agrega un título"
                                        autoComplete="off"
                                        className="text-sm text-gray-base w-full mr-3 py-5 px-4"
                                        name="add-comment"
                                        placeholder="Agrega un título..."
                                        value={caption}
                                        onChange={({ target }) => setCaption(target.value)}
                                    />
                                </div>

                            </div>
                        </div>
                    </div>
                    <div className="bg-gray-modal_50 px-4 py-3 sm:flex">
                        <button
                            disabled={loading}
                            className={`w-full flex justify-center rounded-md border border-blue-medium shadow-sm px-4 py-2 bg-blue-medium text-base font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 ${(user && caption) ? 'focus:ring-blue-medium' : 'focus:ring-red-primary'} sm:text-sm`}
                            onClick={async () => {
                                setLoading(true);
                                if (user && caption) {
                                    const imageSrc = await uploadImage(fileToUpload.file, user);
                                    await createPost(user, caption, imageSrc)
                                    // setTimeout(() => {
                                    setShow(false);
                                    setCaption('');
                                    setFileToUpload(null);
                                    setLoading(false);
                                    // }, 5000);
                                } else {
                                    console.log(`Error User`, user);
                                    console.log(`Error Caption`, caption);
                                    setLoading(false);
                                }
                            }}
                            type="button"
                        >
                            {
                                loading
                                    ?
                                    <ButtonSpinner />
                                    :
                                    'Subir foto'
                            }


                        </button>
                        <button
                            disabled={loading}
                            className="mt-3 w-full flex justify-center rounded-md border border-gray-base shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-base hover:bg-red-primary hover:border-red-primary hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                            type="button"
                            onClick={() => setShow(false)}
                        >
                            Cerrar
                </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UploadImageModal;

UploadImageModal.propTypes = {
    show: PropTypes.bool.isRequired,
    setShow: PropTypes.func.isRequired,
    user: PropTypes.shape({
        userId: PropTypes.string,
        fullName: PropTypes.string,
        following: PropTypes.array,
        followers: PropTypes.array,
        emailAddress: PropTypes.string,
        docId: PropTypes.string
    }).isRequired
}