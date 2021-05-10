import { firebase, FieldValue } from '../lib/firebase';

export async function doesUsernameExists(username) {
    const result = await firebase
        .firestore()
        .collection('users')
        .where('username', '==', username)
        .get();

    return result.docs[0]?.exists || false;
}

export async function getUserByUsername(username) {
    const result = await firebase
        .firestore()
        .collection('users')
        .where('username', '==', username)
        .get();

    const user = result.docs.map((item) => ({
        ...item.data(),
        docId: item.id
    }));

    return user[0];
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
    profileId, // the id of the user that we (the user logged in) requests to follow or unfollow
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
    suggestedProfileDocId, // the doc id of the user that we (the user logged in) requests to follow or unfollow
    loggedInUserId, // currently logged in user id
    isFollowingProfile // true/false (am i currently following this person?)
) {
    return firebase
        .firestore()
        .collection('users')
        .doc(suggestedProfileDocId)
        .update({
            followers: isFollowingProfile
                ? FieldValue.arrayRemove(loggedInUserId)
                : FieldValue.arrayUnion(loggedInUserId)
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

export async function getUserPhotosByUserId(userId) {
    const result = await firebase
        .firestore()
        .collection('photos')
        .where('userId', '==', userId)
        .get();

    return result.docs.map((photo) => ({
        ...photo.data(),
        docId: photo.id
    }));
}

export async function isUserFollowingProfile(loggedInUserUsername, profileUserId) {
    const result = await firebase
        .firestore()
        .collection('users')
        .where('username', '==', loggedInUserUsername)
        .where('following', 'array-contains', profileUserId)
        .get();

    const [response = {}] = result.docs.map(item => ({
        ...item.data(),
        docId: item.id
    }));

    return response.userId ? true : false;
}

export async function toggleFollow(
    isFollowingProfile,
    loggedInUserDocId,
    loggedInUserId,
    profileDocId,
    profileUserId
) {
    await updateLoggedInUserFollowing(
        loggedInUserDocId, // currently logged in user document id
        profileUserId, // the id of the user that we (the user logged in) requests to follow or unfollow
        isFollowingProfile // true/false (am i currently following this person?)
    )

    await updateFollowedUserFollowers(
        profileDocId, // the doc id of the user that we (the user logged in) requests to follow or unfollow
        loggedInUserId, // currently logged in user id
        isFollowingProfile // true/false (am i currently following this person?)
    )
}

export async function createPost({ userId }, caption, imageSrc) {
    await firebase
        .firestore().collection('photos').add({
            userId,
            imageSrc,
            caption,
            likes: [],
            comments: [],
            userLatitude: '40.7128°',
            userLongitude: '74.0060°',
            dateCreated: Date.now()
        });
}

// función que se encargará de subir el archivo
export async function uploadImage(file, user) {
    // creo una referencia al lugar donde guardaremos el archivo
    var refStorage = firebase.storage().ref().child(`${user.username}-${user.userId}/${Date.now()}`);
    // Comienzo la tarea de upload
    var uploadTask = refStorage.put(file);

    return uploadTask.then(snapshot => {
        return snapshot.ref.getDownloadURL();
    })
        .then((url) => {
            return url
        });
}