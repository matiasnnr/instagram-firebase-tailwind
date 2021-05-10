import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Skeleton from 'react-loading-skeleton';
import CommentsModal from '../modals/comments-modal';

const Photos = ({ photos: photosArrayData }) => {

    const [commentsModalObj, setCommentsModalObj] = useState({
        docId: '',
        src: '',
        captiom: ''
    });
    const [photos, setPhotos] = useState(photosArrayData);
    const [comments, setComments] = useState([]);
    const [show, setShow] = useState(false);

    useEffect(() => {
        setPhotos(photosArrayData);
    }, [photosArrayData]);

    return (
        <div className="h-auto border-t border-gray-primary my-12 pt-4">
            <div className="grid grid-cols-3 gap-4 md:gap-8 justify-items-center md:mt-4 mb-12 px-4 md:px-8 lg:px-0">
                {
                    !photos
                        ?
                        (
                            <>
                                <Skeleton count={12} with={320} height={400} />
                            </>
                        )
                        :
                        photos.length > 0
                            ?
                            (
                                photos.map((photo) => (
                                    <div
                                        className="relative group"
                                        key={photo.docId}
                                        onClick={() => {
                                            setComments(photo.comments);
                                            setCommentsModalObj({
                                                docId: photo.docId,
                                                src: photo.imageSrc,
                                                caption: photo.caption
                                            });
                                            setShow(true);
                                        }}
                                    >
                                        <img
                                            key={`${photo.caption}-${photo.photoId}-${photo.userId}`}
                                            className="object-cover h-28 w-28 sm:h-56 sm:w-56 md:h-80 md:w-80"
                                            src={photo.imageSrc}
                                            alt={photo.caption}
                                        />
                                        <div
                                            className="absolute bottom-0 left-0 bg-gray-200 z-10 
                                        w-full justify-evenly items-center h-full bg-black-faded 
                                        hidden 
                                        group-hover:flex"
                                        >
                                            <p className="flex items-center text-white font-bold">
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    viewBox="0 0 20 20"
                                                    fill="currentColor"
                                                    className="w-4 md:w-8 mr-2 md:mr-4"
                                                >
                                                    <path
                                                        fillRule="evenodd"
                                                        d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                                                        clipRule="evenodd"
                                                    />
                                                </svg>
                                                {photo.likes.length}
                                            </p>
                                            <p className="flex items-center text-white font-bold">
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    viewBox="0 0 20 20"
                                                    fill="currentColor"
                                                    className="w-4 md:w-8 mr-2 md:mr-4"
                                                >
                                                    <path
                                                        fillRule="evenodd"
                                                        d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z"
                                                        clipRule="evenodd"
                                                    />
                                                </svg>
                                                {photo.comments.length}
                                            </p>
                                        </div>
                                    </div>
                                ))
                            )
                            :
                            null
                }
            </div>

            {
                (!photos || photos.length === 0)
                &&
                (
                    <p className="text-center text-2xl text-gray-primary">No hay publicaciones todavía...</p>
                )
            }
            <CommentsModal
                docId={commentsModalObj.docId}
                comments={comments}
                setComments={setComments}
                show={show}
                setShow={setShow}
                src={commentsModalObj.src}
                caption={commentsModalObj.caption}
                setPhotos={setPhotos}
                photos={photos}
            />
        </div>
    )
}

export default Photos;

Photos.propTypes = {
    photos: PropTypes.array.isRequired
}