import { firebase, FieldValue } from '../lib/firebase';

export async function doesUsernameExists(username) {
    const result = await firebase
        .firestore()
        .collection('users')
        .where('username', '==', username)
        .get();

    return result.docs[0]?.exists || false;
}

// get user from the firestore where userId == userId (passed from the Auth)
export async function getUserByUserId(userId) {
    const result = await firebase
        .firestore()
        .collection('users')
        .where('userId', '==', userId)
        .get();

    const user = result.docs.map((item) => ({
        ...item.data(),
        docId: item.id
    }));

    return user;
}

export async function getSuggestedProfiles(userId, following) {
    const result = await firebase
        .firestore()
        .collection('users')
        .limit(10)
        .get();

    return result.docs.map((user) => ({ ...user.data(), docId: user.id })) // we get all users
        .filter((profile) => profile.userId !== userId && !following.includes(profile.userId)); // isn't my profile and people we dont following
}

export async function updateLoggedInUserFollowing(
    loggedInUserDocId, // currently logged in user document id
    profileId, // the user that we (the user logged in) requests to follow or unfollow
    isFollowingProfile // true/false (am i currently following this person?)
) {
    return firebase
        .firestore()
        .collection('users')
        .doc(loggedInUserDocId)
        .update({
            following: isFollowingProfile
                ? FieldValue.arrayRemove(profileId)
                : FieldValue.arrayUnion(profileId)
        });
}

export async function updateFollowedUserFollowers(
    suggestedProfileDocId, // the user that we (the user logged in) requests to follow or unfollow
    loggedInUserDocId, // currently logged in user document id
    isFollowingProfile // true/false (am i currently following this person?)
) {
    return firebase
        .firestore()
        .collection('users')
        .doc(suggestedProfileDocId)
        .update({
            followers: isFollowingProfile
                ? FieldValue.arrayRemove(loggedInUserDocId)
                : FieldValue.arrayUnion(loggedInUserDocId)
        });
}

export async function getPhotos(loggedUserId, following) {
    const result = await firebase
        .firestore()
        .collection('photos')
        .where('userId', 'in', following)
        .orderBy('dateCreated', 'desc')
        .get();

    const userFollowedPhotos = result.docs.map((photo) => ({
        ...photo.data(),
        docId: photo.id
    }));

    const photosWithUserDetails = await Promise.all(
        userFollowedPhotos.map(async (photo) => {
            let userLikedPhoto = false;
            if (photo.likes.includes(loggedUserId)) {
                userLikedPhoto = true;
            }

            const user = await getUserByUserId(photo.userId);
            const { username } = user[0];

            return { username, ...photo, userLikedPhoto };
        })
    );

    return photosWithUserDetails;
}