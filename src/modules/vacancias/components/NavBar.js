import React from 'react';
import { NavLink } from "react-router-dom";
import useAuth from '../hooks/useAuth';



const NavBar = () => {
    


    const { logout,userGoogle } = useAuth();
    return (
        <nav className="navbar navbar-expand-lg bg-light">
            <div className="container-fluid">
                <NavLink  className="navbar-brand" to="/admin/home">{userGoogle.email}</NavLink >
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <NavLink  to="/admin/home" className="nav-link" activeClassName="active" >Carga de Layout</NavLink >
                        </li>
                    </ul>

                    <ul className="navbar-nav mr-auto mb-2 mb-lg-0">
                        <li className="nav-item" style={{ cursor: 'pointer' }} onClick={logout}>
                            <span>Cerrar sesión</span>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default NavBar