import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import FirebaseContext from '../../context/firebase';
import useUser from '../../hooks/use-user';

const AddComment = ({ docId, comments, setComments, commentInput, photos, setPhotos }) => {

    const [comment, setComment] = useState('');
    const { firebase, FieldValue } = useContext(FirebaseContext);
    const {
        user: { username: displayName }
    } = useUser();

    const handleSubmitComment = (event) => {
        event.preventDefault();

        // this give me a new array []
        // put the new comment in there
        // add the old comments
        // then we have a new array with the new comment and the older comments
        setComments([...comments, { displayName, comment }]); // this setComments come from the father component
        setComment('');

        // this is used to update comments from profile photos
        if (photos) {
            photos = photos.map((photo) => {
                if (photo.docId === docId) {
                    photo.comments = [...photo.comments, { displayName, comment }];
                }
                return photo;
            });
            setPhotos(photos);
        }

        return firebase
            .firestore()
            .collection('photos')
            .doc(docId)
            .update({
                comments: FieldValue.arrayUnion({ displayName, comment })
            });
    }

    return <div className="border-t border-gray-primary">
        <form
            className="flex justify-between pl-0 pr-5"
            action=""
            method="POST"
            onSubmit={(event) => comment.length >= 1 ? handleSubmitComment(event) : event.preventDefault()}
        >
            <input
                type="text"
                aria-label="Agrega un comentario"
                autoComplete="off"
                className="text-sm text-gray-base w-full mr-3 py-5 px-4"
                name="add-comment"
                placeholder="Agrega un comentario..."
                value={comment}
                onChange={({ target }) => setComment(target.value)}
                ref={commentInput}
            />
            <button
                className={`text-sm font-bold text-blue-medium ${!comment && 'opacity-25'}`}
                type="button"
                disabled={comment.length < 1}
                onClick={handleSubmitComment}
            >
                Enviar
            </button>
        </form>
    </div>;
}

export default AddComment;

AddComment.propTypes = {
    docId: PropTypes.string.isRequired,
    comments: PropTypes.array.isRequired,
    setComments: PropTypes.func.isRequired,
    commentInput: PropTypes.object
}