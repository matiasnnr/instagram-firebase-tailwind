import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import AddComment from '../post/add-comment';

const CommentsModal = ({
    docId,
    comments,
    setComments,
    show,
    setShow,
    src,
    caption,
    photos,
    setPhotos
}) => {

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
                <div className="border border-gray-primary inline-block align-bottom bg-white 
                rounded-lg text-left overflow-hidden shadow-xl transform transition-all 
                sm:my-8 sm:align-middle sm:max-w-4xl sm:w-full sm:inline-flex">

                    <img
                        className="w-full bg-white sm:object-cover sm:min-h-lg sm:max-h-lg sm:min-w-lg"
                        src={src}
                        alt={caption}
                    />

                    <div className="w-full bg-gray-modal_50 px-4 flex flex-col justify-between">

                        <div className="text-center sm:mt-0 sm:mx-2 sm:text-left">

                            <div className="flex items-center my-5">
                                <svg
                                    className="w-8 text-black-light select-none cursor-pointer focus:outline-none"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    tabIndex={0}
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                                    />
                                </svg>
                                <h3 className="text-lg leading-6 font-medium text-gray-900 ml-2" id="modal-title">
                                    Todos los comentarios
                                </h3>
                            </div>

                            <div className="h-72 overflow-y-scroll">
                                {
                                    comments.map((item) => (
                                        <p
                                            className="mb-1 flex justify-start text-justify"
                                            key={`${item.comment}-${item.displayName}`}>
                                            <Link to={`/profile/${item.displayName}`}>
                                                <span className="mr-1 font-bold">{item.displayName}</span>
                                            </Link>
                                            <span>{item.comment}</span>
                                        </p>
                                    ))
                                }
                            </div>

                        </div>
                        <div className="mt-4">
                            <AddComment
                                docId={docId}
                                comments={comments}
                                setComments={setComments}
                                setPhotos={setPhotos}
                                photos={photos}
                            />
                            <button
                                className="mt-3 w-full flex justify-center items-center shadow-sm p-4 bg-white text-base font-medium text-gray-base hover:bg-gray-modal_50 focus:outline-none focus:ring-2 focus:ring-offset-2"
                                type="button"
                                onClick={() => setShow(false)}
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-6 w-6" fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CommentsModal;

CommentsModal.propTypes = {
    docId: PropTypes.string.isRequired,
    comments: PropTypes.array.isRequired,
    setComments: PropTypes.func.isRequired,
    show: PropTypes.bool.isRequired,
    setShow: PropTypes.func.isRequired,
    src: PropTypes.string.isRequired,
    caption: PropTypes.string
}

