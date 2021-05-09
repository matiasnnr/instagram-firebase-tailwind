import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Skeleton from 'react-loading-skeleton';
import useUser from '../../hooks/use-user';
import { isUserFollowingProfile, toggleFollow } from '../../services/firebase';

const Header = ({
    photosCount,
    profile: {
        docId:
        profileDocId,
        userId: profileUserId,
        fullName,
        followers = [],
        following = [],
        username: profileUsername
    },
    followerCount,
    setFollowerCount
}) => {

    const { user: loggedInUser } = useUser();
    const [isFollowingProfile, setIsFollowingProfile] = useState(false);
    const activeButtonFollow = profileUsername !== loggedInUser.username;

    const handleToggleFollow = async () => {
        setIsFollowingProfile(!isFollowingProfile);
        setFollowerCount({
            followerCount: isFollowingProfile ? followerCount - 1 : followerCount + 1
        });

        await toggleFollow(
            isFollowingProfile,
            loggedInUser.docId,
            loggedInUser.userId,
            profileDocId,
            profileUserId
        );
    }

    useEffect(() => {
        const isLoggedInUserFollowingProfile = async () => {
            const isFollowing = await isUserFollowingProfile(loggedInUser.username, profileUserId);
            setIsFollowingProfile(isFollowing);
        }

        if (loggedInUser.username && profileUserId) isLoggedInUserFollowingProfile();
    }, [loggedInUser.username, profileUserId]);

    return (
        <div className="grid grid-cols-3 justify-between mx-auto max-w-screen-lg px-2 md:px-0">
            <div className="container flex justify-center items-center col-span-1">
                <img
                    className="rounded-full h-20 md:h-40 w-20 md:w-40 flex"
                    src={`/images/avatars/${profileUsername !== 'orwell' &&
                        profileUsername !== 'karl' &&
                        profileUsername !== 'dali' &&
                        profileUsername !== 'raphael'
                        ? 'default' : profileUsername
                        }.${profileUsername !== 'orwell' &&
                            profileUsername !== 'karl' &&
                            profileUsername !== 'dali' &&
                            profileUsername !== 'raphael'
                            ? 'png' : 'jpg'}`}
                    alt={`${profileUsername} profile`}
                />
            </div>
            <div className="flex items-center justify-center flex-col col-span-2">
                <div className="container flex items-center">
                    <p className="text-2xl mr-4">{profileUsername}</p>
                    {
                        activeButtonFollow
                        &&
                        (
                            <button
                                className="bg-blue-medium font-bold text-sm rounded text-white w-auto h-auto py-1 md:h-8 md:py-0 px-2"
                                type="button"
                                onClick={handleToggleFollow}
                            >
                                {isFollowingProfile ? 'Dejar de seguir' : 'Seguir'}
                            </button>
                        )
                    }
                </div>
                <div className="container flex mt-4">
                    {
                        followers === undefined && following === undefined
                            ?
                            (
                                <Skeleton count={1} with={677} height={24} />
                            )
                            :
                            (
                                <>
                                    <p className="mr-5 text-center">
                                        <span className="font-bold">{photosCount}</span>
                                        {` `}{photosCount === 1 ? 'foto' : 'fotos'}
                                    </p>
                                    <p className="mr-5 text-center">
                                        <span className="font-bold">{followerCount}</span>
                                        {` `}{followerCount === 1 ? 'seguidor' : 'seguidores'}
                                    </p>
                                    <p className="mr-5 text-center">
                                        <span className="font-bold">{following.length}</span>
                                        {` `}siguiendo
                                    </p>
                                </>
                            )
                    }
                </div>
                <div className="container mt-4">
                    <p className="font-medium">
                        {
                            !fullName
                                ?
                                <Skeleton count={1} with={200} height={24} />
                                :
                                fullName
                        }
                    </p>
                </div>
            </div>
        </div>
    )
}


export default Header;

Header.propTypes = {
    photosCount: PropTypes.number.isRequired,
    followerCount: PropTypes.number.isRequired,
    setFollowerCount: PropTypes.func.isRequired,
    profile: PropTypes.shape({
        userId: PropTypes.string,
        fullName: PropTypes.string,
        following: PropTypes.array,
        followers: PropTypes.array,
        emailAddress: PropTypes.string,
        docId: PropTypes.string
    }).isRequired
}