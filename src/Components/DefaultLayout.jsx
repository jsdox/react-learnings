import { Navigate, Outlet } from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider";
import { useState } from "react";

export default function DefaultLayout() {
    const {user, token, deleteToken} = useStateContext();
    if (!token) {
        return <Navigate to='/login'/>
    }

    const Logout = (e) => {
        e.preventDefault();
        localStorage.setItem('ACCESS_TOKEN', '')
        deleteToken();  
    }

    return (
        <div id="defaultLayout">
         <div className="content">
            <header>
                <div>
                    Header
                </div>
                <div>
                    {user.name}
                    <a href="#" onClick={(e) => Logout(e)} className="btn-logout">Logout</a>
                </div>
            </header>
            <main>
              <Outlet />
            </main>
            </div>
        </div>
    );
}