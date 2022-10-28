import { getAuth, signInWithPopup, GoogleAuthProvider, signOut, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile, FacebookAuthProvider, } from "firebase/auth";
import firebaseConfig from './firebase-config';
import { initializeApp } from "firebase/app";

export const initializeLogin = () => {
    initializeApp(firebaseConfig);
}

/////// google signIN

const auth = getAuth();

//////// forGoogleSignIn
export const handleGoogleSignin = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
        .then(res => {
            const { photoURL, displayName, email } = res.user;

            setUser({
                isSignIn: true,
                name: displayName,
                email: email,
                photo: photoURL
            });
        })
        .catch((error) => {
            console.log(error);
        })
}

////////// sign Out
export const handleSignout = () => {
    signOut(auth)
        .then(() => {
            const outUser = {
                isSignIn: false,
                name: '',
                email: '',
                photo: '',
                password: '',
                error: '',
                success: '',
            }

            setUser(outUser);
        })
        .catch((err) => {
            console.log(err);
        })
}

/////// ForFacebookSignIN
export const handleFbSignIN = () => {
    const fbProvider = new FacebookAuthProvider();
    signInWithPopup(auth, fbProvider)
        .then((res) => {
            console.log(res.user);
        })
        .catch((error) => {
            console.log(error);
        });
}