import React from "react";
import { Outlet } from "react-router-dom";
import { LeftNavLink } from '../LeftNavLink/LeftNavLink';
import { SupNavLink } from '../SupNavLink/SupNavLink';
import { useAuth } from "../Login-Logout/auth";
import { Login } from "../Login-Logout/Login";
import { UserModal } from "../ModalUser/UserModal";

export const Home = () => {
    const { authState, openModal } = useAuth();

    if (!authState.isAuthenticated) {
        return <Login />;
    }
    return(
        <div>
            <SupNavLink />
            <LeftNavLink/>
            <Outlet/>
            {(openModal) && <UserModal />}
        </div>
    )
}
