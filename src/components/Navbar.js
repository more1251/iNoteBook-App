/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import { Link, useLocation, useNavigate } from "react-router-dom";



export const Navbar = () => {

    let location = useLocation();

    let navigate = useNavigate();
    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('name');
        navigate("/login");
    }
    
   

    
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">iNoteBook</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <Link className={`nav-link ${location.pathname === "/" ? "active" : ""}`} aria-current="page" to="/">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className={`nav-link ${location.pathname === "/about" ? "active" : ""}`} to="/about">About</Link>
                        </li>
                        
                        {localStorage.getItem('token')? 
                         <li className="nav-item">
                            <p className="nav-link active" style={{position: "absolute", right: "0", marginRight:"200px"}}>Hi, {localStorage.getItem('name')}</p>
                         </li>
                         : "<h1>ABCD</h1>"}
                        
                    </ul>
                </div>
            </div>

            {!localStorage.getItem('token') ?
                <form className="d-flex mx-4 ">
                    <Link className="btn btn-success mx-3 px-4" to="/login" role="button">Login</Link>
                    <Link className="btn btn-success px-4" to="/signup" role="button">SignUp</Link>
                </form>
                :
                <button className="btn btn-primary mx-4" onClick={handleLogout}>Logout</button>
            }
        </nav>
    )
}
