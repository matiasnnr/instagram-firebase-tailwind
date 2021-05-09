import React, { useReducer, useEffect } from 'react';
import PropTypes from 'prop-types';
import Header from './header';
import Photos from './photos';
import { getUserPhotosByUserId } from '../../services/firebase';

const UserProfile = ({ user }) => {

    const { userId, fullName, following, followers = [], emailAddress, docId } = user;
    const reducer = (state, newState) => ({ ...state, ...newState });
    const initialState = {
        profile: {},
        photosCollection: [],
        followerCount: 0
    };

    const [{ profile, photosCollection, followerCount }, dispatch]
        = useReducer(reducer, initialState);

    useEffect(() => {
        async function getProfileInfoAndPhotos() {
            const photos = await getUserPhotosByUserId(userId);
            dispatch({ profile: user, photosCollection: photos, followerCount: followers.length });
        }

        getProfileInfoAndPhotos();
    }, [user]);

    return (
        <>
            <Header
                photosCount={photosCollection.length}
                profile={profile}
                followerCount={followerCount}
                setFollowerCount={dispatch}
            />
            <Photos photos={photosCollection} />
        </>
    )
}

export default UserProfile;

UserProfile.propTypes = {
    user: PropTypes.shape({
        userId: PropTypes.string.isRequired,
        fullName: PropTypes.string.isRequired,
        following: PropTypes.array.isRequired,
        followers: PropTypes.array,
        emailAddress: PropTypes.string.isRequired,
        docId: PropTypes.string.isRequired
    }).isRequired
}