import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import { LeftNavLink } from './LeftNavLink';
import { SupNavLink } from './SupNavLink';
import { useAuth } from "./auth";
import { Login } from "./Login";
import { UserModal } from "./UserModal";

export const Home = () => {
    const auth = useAuth()
    const [sidebarVisible, setSidebarVisible] = useState(true);
    const toggleSidebar = () => {
        setSidebarVisible(!sidebarVisible);
  };

    if (!auth.user){
        return <Login/>;
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
