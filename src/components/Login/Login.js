import { useContext, useState } from 'react';
import { UserContext } from "../../App";
import { useLocation, useNavigate } from "react-router-dom";
import { emailPasswordUserCreate, handleFbSignIN, handleGoogleSignIn, handleSignOut, initializeLogin, loginWithEmailPassword } from './loginManager';

function Login() {
    const [newUser, setNewUser] = useState(false);
    const [user, setUser] = useState({
        isSignIn: false,
        name: '',
        email: '',
        photo: '',
        password: '',
        error: '',
        success: false,
    });

    ////////// Initialize from loginManager
    initializeLogin();

    ////// for context state
    const [loginUser, setLoginUser] = useContext(UserContext);

    /////////// After login redirect
    const navigate = useNavigate()
    const location = useLocation();
    const { from } = location.state ? {from: {pathname: "/shipment"}} : { from: { pathname: "/" } };

    /////// Submit handler
    const handleSubmit = (e) => {

        ////////// Sign UP code
        if (newUser && user.name && user.email && user.password) {
            emailPasswordUserCreate(user.name, user.email, user.password)
                .then(res => {
                    setUser(res);
                    setLoginUser(res);
                })
        }

        /////// Login code

        if (!newUser && user.email && user.password) {
            loginWithEmailPassword(user.email, user.password)
                .then(res => {
                    setUser(res);
                    setLoginUser(res);
                    navigate(from);
                })
        }
        e.preventDefault();
    }

    //// handle blur, lekha shes howar por kaj korbe.
    const handleBlur = (e) => {
        let isFieldValid = true;

        if (e.target.name === 'email') {
            isFieldValid = /^\S+@\S+\.\S+/.test(e.target.value);
        }
        if (e.target.name === 'password') {
            const isPassChar = e.target.value.length > 7;
            const isPassNum = /\d{1}/.test(e.target.value);

            isFieldValid = isPassChar && isPassNum;
        }

        if (isFieldValid) {
            const newUserInfo = { ...user };
            newUserInfo[e.target.name] = e.target.value;

            setUser(newUserInfo);
        }
    }

    //////// For google signIN
    const googleSignIn = () => {
        handleGoogleSignIn()
            .then(res => {
                setUser(res);
                setLoginUser(res);
                navigate(from);
            })
    }

    /////// signOut
    const googleSignOut = () => {
        handleSignOut()
            .then(res => {
                setUser(res);
                setLoginUser(res);
            })
    }

    ////// facebook signIn
    const fbSignIN = () => {
        handleFbSignIN()
            .then(res => {
                console.log(res);
            })
    }

    return (
        <div style={{ textAlign: 'center' }}>
            {
                user.isSignIn ?
                    <button onClick={googleSignOut}>Sign Out</button> :
                    <button onClick={googleSignIn}>Sign in with google</button>
            }
            <br></br>
            <button onClick={fbSignIN}>Sign in with facebook</button>

            {
                user.isSignIn && <div>
                    <h2>Name: {user.name}</h2>
                    <p>Your Email: {user.email}</p>
                    <img src={user.photo} alt="" />
                </div>
            }
            <br></br>
            <br></br>

            <form onSubmit={handleSubmit}>
                <input onChange={() => setNewUser(!newUser)} type="checkbox" name="newUser" id="signUP" />
                <label htmlFor="signUp">For new user</label>
                <br></br>
                {newUser && <input type="text" onBlur={handleBlur} name="name" id="" placeholder='Your name' required />}
                <br></br>
                <input type="email" onBlur={handleBlur} placeholder='Write your Email' name="email" id="email" required />
                <br></br>
                <input type="password" onBlur={handleBlur} name="password" id="password" placeholder='Password' required />
                <br></br>
                <input type="submit" value={newUser ? 'Sign Up' : "Sign in"} />
            </form>

            {
                user.error && <p style={{ color: 'red' }}>{user.error}</p>
            }
            {
                user.success && <p style={{ color: 'green' }}>User {newUser ? 'created' : 'Login'} successfully</p>
            }

        </div>
    );
}

export default Login;
