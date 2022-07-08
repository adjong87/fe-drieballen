import {Link, useHistory} from "react-router-dom";
import './NavBar.css'
import {useEffect, useState} from "react";
import {useContext} from 'react';
import {AuthContext} from "../context/AuthContext";
import balls from '../../assets/balls.png'
import {navItems} from "./component/navItems";
import Button from './component/Button'
import Dropdown from "./Dropdown";

function NavBar() {
    const {isAuth, user, gebruikersrollen} = useContext(AuthContext)
    const [adminDropDown, setAdminDropdown] = useState(false);
    const [refereeDropDown, setRefereeDropdown] = useState(false);

    const history = useHistory();

        return (
        <>
            <nav className="navbar">
                <Link to="/" className="navbar-logo">
                    <img src={balls} alt="logo"/>
                    DE DRIE BALLEN
                </Link>
                <ul className="nav-items">
                    <li key="1" className="nav-item">
                        <Link to="/home">Home</Link>
                    </li>
                    {isAuth && <li key="2" className="nav-item">
                        <Link to={`/profile/${user.username}`}>Mijn profiel</Link>
                    </li>}
                    {isAuth && gebruikersrollen.includes('ROLE_ADMIN') && navItems.map(item => {
                        if (item.title === "Leden") {
                            return (
                                <li
                                    key={item.id}
                                    className={item.cName}
                                    onMouseEnter={() => setAdminDropdown(true)}
                                    onMouseLeave={() => setAdminDropdown(false)}
                                >
                                    {item.path !== "" &&  <Link to={item.path}>{item.title}</Link>}

                                    {adminDropDown &&
                                        <Dropdown
                                            role='admin'/>}
                                </li>
                            );
                        }
                    })}

                    {isAuth && gebruikersrollen.includes('ROLE_MODERATOR') && navItems.map(item => {
                        if (item.title === "Wedstrijden") {
                            return (
                                <li
                                    key={item.id}
                                    className={item.cName}
                                    onMouseEnter={() => setRefereeDropdown(true)}
                                    onMouseLeave={() => setRefereeDropdown(false)}
                                >
                                    {item.path !== "" &&  <Link to={item.path}>{item.title}</Link>}
                                    {refereeDropDown && <Dropdown role='referee'/>}
                                </li>
                            );
                        }
                    })}
                </ul>
                <Button/>
            </nav>
        </>
    )

}

export default NavBar;
