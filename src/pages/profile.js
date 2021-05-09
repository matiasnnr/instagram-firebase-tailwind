import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { getUserByUsername } from '../services/firebase';
import * as ROUTES from '../constants/routes';
import Header from '../components/header';
import UserProfile from '../components/profile';

const Profile = () => {

    const { username } = useParams();
    const [user, setUser] = useState(null);
    const history = useHistory();

    useEffect(() => {
        async function checkUserExists() {
            const user = await getUserByUsername(username);
            if (user) {
                setUser(user);
            } else {
                history.push(ROUTES.NOTFOUND);
            }
        }

        checkUserExists();
    }, [username, history]);

    return user ? (
        <div className="bg-gray-background">
            <Header />
            <div className="mx-auto max-w-screen-lg">
                <UserProfile user={user} />
            </div>
        </div>
    ) : null;
}

export default Profile;
