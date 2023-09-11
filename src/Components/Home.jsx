import React from "react";
import { Link, Outlet } from "react-router-dom";
import { Logout } from './Logout';
import { useAuth } from "./auth";
import { Login } from "./Login";


export const Home = () => {
    const auth = useAuth()
    if (!auth.user){
        return <Login/>;
    }
    return(
        <>
            <ul>
                <li>
                    <Link to='dashboard'>Dashboard</Link>
                </li>
                <li>
                    <Link to='room'>Room</Link>
                </li>
                <li>
                    <Link to='bookings'>Bookings</Link>
                </li>
                <li>
                    <Link to='guest'>Guest</Link>
                </li>
                <li>
                    <Link to='concierge'>Concierge</Link>
                </li>
            </ul>
            <Logout/>
            <Outlet/>
        </>
    )
}