import React, { useContext } from 'react'
import { Outlet, Navigate, } from 'react-router-dom'
import { UserContext } from '../../App'



export default function PrivateRoute() {
    const [loginUser, setLoginUser] = useContext(UserContext);
    return (
        <div>
            {loginUser.email ? <Outlet  /> : <Navigate to={{pathname: '/login'}} />};
        </div>
    )
}