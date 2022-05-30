import { getAuth, signInWithPopup } from "firebase/auth";
import { useEffect, useState } from "react";
import { googleAuthProvider } from "../auth/firebase/firebase";

const useAuth = () => {

    const [checking, setChecking ] = useState(true);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const auth = getAuth();
        auth.onAuthStateChanged( async (user) => {
            if( user?.uid ){
                setIsLoggedIn(true);
            }else{
                setIsLoggedIn(false);
            }
            setChecking(false);
        });
    }, [ checking ] );


    const login = async () => {
        const auth = getAuth();
        const { user } = await signInWithPopup(auth, googleAuthProvider);
        if (user) {
            const domain = user.email.split('@');
            if (domain[1] !== 'iebem.edu.mx')  return true;

        }
    }

    const logout = async () => {
        const auth = getAuth();
        await auth.signOut();
    }

    return {
        login,
        logout,
        checking,
        isLoggedIn
    }



}

export default useAuth;