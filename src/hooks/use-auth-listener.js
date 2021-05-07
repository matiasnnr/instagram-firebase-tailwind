import { useState, useEffect, useContext } from 'react';
import FirebaseContext from '../context/firebase';

const useAuthListener = () => {

    const [user, setUser] = useState(JSON.parse(localStorage.getItem('authUser')));
    const { firebase } = useContext(FirebaseContext);

    useEffect(() => {
        const listener = firebase.auth().onAuthStateChanged((authUser) => {
            // we have an user... therefore we can store the user in localStorage
            if (authUser) {
                localStorage.setItem('authUser', JSON.stringify(authUser));
                setUser(authUser);
            } else {
                // we don have an authUser, therefore clear the localStorage
                localStorage.removeItem('authUser');
                setUser(null);
            }
        });

        return () => listener();
    }, [firebase])

    return { user };
}

export default useAuthListener;
