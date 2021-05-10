import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { formatDistance } from 'date-fns';
import { es } from 'date-fns/locale';
import { Link } from 'react-router-dom';
import AddComment from './add-comment';
import CommentsModal from '../../components/modals/comments-modal';

const Comments = ({ docId, comments: allComments, posted, commentInput, content, totalLikes, likedPhoto }) => {

    const [comments, setComments] = useState(allComments);
    const [show, setShow] = useState(false);

    return (
        <>
            <div className="p-4 pt-1 pb-4">
                {
                    comments.length >= 3
                    &&
                    (
                        <button
                            className="text-sm text-gray-base mb-1 cursor-pointer"
                            onClick={() => setShow(true)}
                        >
                            Ver todos los comentarios
                        </button>
                    )
                }

                {
                    comments.slice(0, 3).map((item) => (
                        <p
                            className="mb-1"
                            key={`${item.comment}-${item.displayName}`}>
                            <Link to={`/profile/${item.displayName}`}>
                                <span className="mr-1 font-bold">{item.displayName}</span>
                            </Link>
                            <span>{item.comment}</span>
                        </p>
                    ))
                }

                <p className="text-gray-base uppercase text-xs mt-2">Hace {formatDistance(posted, new Date(), { locale: es })}</p>
            </div>
            <AddComment
                docId={docId}
                comments={comments}
                setComments={setComments}
                commentInput={commentInput}
            />
            <CommentsModal
                docId={docId}
                comments={comments}
                setComments={setComments}
                show={show}
                setShow={setShow}
                src={content.imageSrc}
                caption={content.caption}
                totalLikes={totalLikes}
                likedPhoto={likedPhoto}
            />
        </>
    )
}

export default Comments;

Comments.propTypes = {
    docId: PropTypes.string.isRequired,
    comments: PropTypes.array.isRequired,
    posted: PropTypes.number.isRequired,
    commentInput: PropTypes.object.isRequired,
    content: PropTypes.shape({
        username: PropTypes.string.isRequired,
        imageSrc: PropTypes.string.isRequired,
        caption: PropTypes.string.isRequired,
        docId: PropTypes.string.isRequired,
        userLikedPhoto: PropTypes.bool.isRequired,
        likes: PropTypes.array.isRequired,
        comments: PropTypes.array.isRequired,
        dateCreated: PropTypes.number.isRequired
    }).isRequired,
    totalLikes: PropTypes.number.isRequired,
    likedPhoto: PropTypes.bool.isRequired
}
