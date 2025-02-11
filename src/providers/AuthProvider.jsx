import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { auth } from "../firebase/firebase.config";
import axios from "axios";


export const AuthContext = createContext(null);

const AuthProvider = ({children}) => {

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [userEmail, setUserEmail] = useState('');
    const [wishList, setWishList] = useState([]);
    console.log(loading, user);
    const [isDarkMode, setIsDarkMode] = useState(window.matchMedia('(prefers-color-scheme: dark)').matches); //Temporary- For this app only

    // Google Sign-In
    const googleProvider = new GoogleAuthProvider();
    const loginWithGoogle = () => {
        setLoading(true);
        return (
            signInWithPopup(auth, googleProvider)
        );
    }

    // Email-Password Sign In
    const loginWithEmailAndPassword = (email, password) => {
        setLoading(true);
        return (
            signInWithEmailAndPassword(auth, email, password)
        );
    }

    // Create/Register/Sign-Up New User with Email-Password
    const createAccount = (email, password) => {
        setLoading(true);
        return (
            createUserWithEmailAndPassword(auth, email, password)
        );
    }

    // Update User-Profile
    const updateUserProfile = (updateInfo) => {
        setLoading(true);
        return updateProfile(auth.currentUser, updateInfo);
    }

    // Reset Password
    const resetPassword = (email) => {
        return sendPasswordResetEmail(auth, email);
                // .then(() => {
                //      const link = "mail.google.com";
                //      window.open(`//${link}`, "_blank");
                //      logOut();
                //      setLoading(false);
                // })
                // .catch(error => console.log(error.message))
    }

    // Log-Out 
    const logOut = () => {
        setLoading(true);
        return signOut(auth);
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async currentUser => {
            setUser(currentUser);
            if (currentUser?.email) {
                const {data} = await axios.post(
                    `${import.meta.env.VITE_API_URL}/jwt`,
                    {
                        email: currentUser.email,
                    },
                    { withCredentials: true }
                )
                if (data.success) {
                    axios.get(`${import.meta.env.VITE_API_URL}/wishlist?email=${currentUser.email}`,
                        {withCredentials: true}
                    )
                    .then(res => {
                        setWishList(res.data);
                        setLoading(false);
                    })
                }
            }
            else {
                const {data} = await axios.get(
                    `${import.meta.env.VITE_API_URL}/logout`,
                    { withCredentials: true }
                )
                if (data.success) {
                    setWishList([]);
                    setLoading(false);
                }
            }
        })
        return () => {
            unsubscribe();
        }
    }, [])

    const authInfo = {
        user,
        setUser,
        loginWithGoogle,
        loginWithEmailAndPassword,
        createAccount,
        loading,
        setLoading,
        updateUserProfile,
        userEmail,
        setUserEmail,
        resetPassword,
        wishList,
        setWishList,
        isDarkMode,
        setIsDarkMode,
        logOut
    }

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;