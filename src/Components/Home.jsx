import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import { LeftNavLink } from './LeftNavLink';
import { SupNavLink } from './SupNavLink';
import { useAuth } from "./Login-Logout/auth";
import { Login } from "./Login-Logout/Login";
import { UserModal } from "./UserModal";

export const Home = () => {
    const auth = useAuth()
    const [sidebarVisible, setSidebarVisible] = useState(true);

    const toggleSidebar = () => {
        setSidebarVisible(!sidebarVisible);
    };

    if (!auth.authState.isAuthenticated) {
        return <Login />;
    }
    return(
        <div>
            <SupNavLink togglesidebar={toggleSidebar} sidebarvisible={sidebarVisible.toString()}/>
            {sidebarVisible && <LeftNavLink/>} 
            <Outlet/>
            {(auth.openModal) && <UserModal />}
        </div>
    )
}
