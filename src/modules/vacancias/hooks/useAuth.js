import { getAuth, signInWithPopup } from "firebase/auth";
import { useEffect, useState } from "react";
import { googleAuthProvider } from "../auth/firebase/firebase";

const useAuth = () => {

    const [checking, setChecking ] = useState(true);
    const [userGoogle, setUserGoogle] = useState({});
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    let aux={};
    useEffect(() => {
        const auth = getAuth();
        auth.onAuthStateChanged( async (user) => {
            if( user?.uid ){
                setIsLoggedIn(true);
            }else{
                setIsLoggedIn(false);
            }
            setChecking(false);
            setUserGoogle(user);
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
        isLoggedIn,
        userGoogle
    }



}

export default useAuth;