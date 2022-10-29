import { getAuth, signInWithPopup, GoogleAuthProvider, signOut, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile, FacebookAuthProvider, } from "firebase/auth";
import firebaseConfig from './firebase-config';
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs  } from 'firebase/firestore'

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Get a list of cities from your database
export async function initializeLogin(db) {
    const citiesCol = collection(db, 'cities');
    const citySnapshot = await getDocs(citiesCol);
    const cityList = citySnapshot.docs.map(doc => doc.data());
    return cityList;
}

/////// google signIN

const auth = getAuth();

//////// forGoogleSignIn
export const handleGoogleSignIn = () => {
    const provider = new GoogleAuthProvider();
    return signInWithPopup(auth, provider)
        .then(res => {
            const { photoURL, displayName, email } = res.user;

            const signInUser = {
                isSignIn: true,
                name: displayName,
                email: email,
                photo: photoURL,
                success: true,
            };

            return signInUser;
        })
        .catch((error) => {
            console.log(error);
        })
}

////////// sign Out
export const handleSignOut = () => {
    return signOut(auth)
        .then(() => {
            const outUser = {
                isSignIn: false,
                name: '',
                email: '',
                photo: '',
                password: '',
                error: '',
                success: false,
            }

            return outUser;
        })
        .catch((err) => {
            console.log(err);
        })
}

/////// ForFacebookSignIN
export const handleFbSignIN = () => {
    const fbProvider = new FacebookAuthProvider();
    return signInWithPopup(auth, fbProvider)
        .then(res => {
            return res;
        })
        .catch((error) => {
            console.log(error);
        });
}


/////////// User create Email and pass


 export const emailPasswordUserCreate = (name, email, password) => {
    return createUserWithEmailAndPassword(auth, email, password, name)
        .then((res) => {
            const updateSucess = res.user;
            const successMessage = true;
            updateSucess.success = successMessage;
            updateSucess.error = '';
            updateName(name);

            return updateSucess;
        })
        .catch((error) => {
            const userInfo = {};
            const errorMessage = error.message;
            userInfo.error = errorMessage;
            userInfo.success = false;
            return userInfo;
        });
}

export const loginWithEmailPassword = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password)
        .then((res) => {
            const updateSucess = res.user;
            const successMessage = true;
            updateSucess.success = successMessage;
            updateSucess.error = '';

            return updateSucess;
            // setUser(updateSucess);
            // setLoginUser(updateSucess);
            // navigate(from);
        })
        .catch((error) => {
            const userInfo = {};
            const errorMessage = error.message;
            userInfo.error = errorMessage;
            userInfo.success = false;

            return userInfo;
        });
}

const updateName = name => {
    updateProfile(auth.currentUser, {
        displayName: name,
    }).then(() => {
        console.log('Username Update successfully');
    }).catch((error) => {
        console.log(error);
    });
}
