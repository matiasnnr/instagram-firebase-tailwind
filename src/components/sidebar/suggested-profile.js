import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { updateLoggedInUserFollowing, updateFollowedUserFollowers } from '../../services/firebase';

const SuggestedProfile = ({ suggestedProfileDocId, username, profileId, userId, loggedInUserDocId }) => {

    const [followed, setFollowed] = useState(false);

    async function handleFollowUser() {
        setFollowed(true);
        // firebase: create 2 services (functions)
        // update the following array of the logged in user (in this case, my profile)
        await updateLoggedInUserFollowing(loggedInUserDocId, profileId, false);
        // update the followers array of the user who has been followed
        await updateFollowedUserFollowers(suggestedProfileDocId, userId, false);
    }

    return !followed
        ?
        (
            <div className="flex items-center align-items">
                <div className="flex items-center">
                    <img
                        className="rounded-full w-8 flex mr-4"
                        src={`/images/avatars/${username === 'nico' ? 'karl' : username}.jpg`}
                        // alt={`${username} avatar`}
                        alt=""
                    />
                </div>
                <div className="flex flex-col md:flex-row items-center align-items justify-between w-full">
                    <Link to={`/profile/${username}`}>
                        <p className="font-bold text-sm">{username}</p>
                    </Link>
                    <button
                        className="text-xs font-bold text-blue-medium"
                        type="button"
                        onClick={handleFollowUser}
                    >
                        Seguir
                    </button>
                </div>
            </div>
        )
        :
        null;
}

export default SuggestedProfile;

SuggestedProfile.propTypes = {
    suggestedProfileDocId: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    profileId: PropTypes.string.isRequired,
    userId: PropTypes.string.isRequired,
    loggedInUserDocId: PropTypes.string.isRequired
}