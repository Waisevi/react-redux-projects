import React from 'react';
import {NavLink} from 'react-router-dom';

const Navbar = ({logInSystem}) => {
    return (
        <nav className="navbar navbar-dark navbar-expand-lg bg-primary">
            <span className="navbar-brand">
                <img src="https://svgsilh.com/svg/1316632-9c27b0.svg" width="30" height="30" className="d-inline-block align-top pr-1" alt="logo"/>
                You Tools
            </span>
            <ul className="navbar-nav mr-auto">
                <li className="nav-item">
                    <NavLink className="nav-link" to="/" exact>Currency Converter</NavLink>
                </li>
                {
                    logInSystem &&
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/note">Notes</NavLink>
                    </li>
                }
                <li className="nav-item">
                    <NavLink className="nav-link" to="/bets">Bid Ratio</NavLink>
                </li>
            </ul>
            <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                    <NavLink className="nav-link" to="/login" exact>Login</NavLink>
                </li>
            </ul>
        </nav>
    );
};
 export default Navbar;