import { useRef } from 'react';
import PropTypes from 'prop-types';
import Header from './header';
import Image from './image';
import Actions from './actions';
import Footer from './footer';
import Comments from './comments';

export default function Post({ content }) {

    const { docId, likes, userLikedPhoto, caption, username, comments, dateCreated } = content;

    const commentInput = useRef(null);

    const handleFocus = () => commentInput.current.focus();

    return (
        <div className="rounded border bg-white border-gray-primary mb-4 ml-2 lg:ml-0">
            <Header username={content.username} />
            <Image src={content.imageSrc} caption={content.caption} />
            <Actions docId={docId} totalLikes={likes.length} likedPhoto={userLikedPhoto} handleFocus={handleFocus} />
            <Footer caption={caption} username={username} />
            <Comments docId={docId} comments={comments} posted={dateCreated} commentInput={commentInput} />
        </div>
    )
}

Post.propTypes = {
    content: PropTypes.shape({
        username: PropTypes.string.isRequired,
        imageSrc: PropTypes.string.isRequired,
        caption: PropTypes.string.isRequired,
        docId: PropTypes.string.isRequired,
        userLikedPhoto: PropTypes.bool.isRequired,
        likes: PropTypes.array.isRequired,
        comments: PropTypes.array.isRequired,
        dateCreated: PropTypes.number.isRequired
    })
}