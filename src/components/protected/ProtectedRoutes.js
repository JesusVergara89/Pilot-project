import React from 'react'
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoutes = ({ login }) => {
    if(login){
        return <Outlet />
    } else { 
        return <Navigate to='/login' />
    }  
}

export default ProtectedRoutes