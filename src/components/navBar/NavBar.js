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
    const [adminDropDown, setAdminDropdown] = useState(false);
    const [refereeDropDown, setRefereeDropdown] = useState(false);
    const {isAuth, user, roles} = useContext(AuthContext)
    const [userRole, setUserRole] = useState('')
    const history = useHistory();
    console.log("i got rendered")
    function checkRole() {
        setUserRole(roles.map(role => {
            return role.name
        }))
    }
    useEffect(() => {
            checkRole();
        }
    , [])

    return (
        <>
            <nav className="navbar">
                <Link to="/" className="navbar-logo">
                    DE DRIE BALLEN
                    <img src={balls} alt="logo"/>
                </Link>
                <ul className="nav-items">
                    <li key="1" className="nav-item">
                        <Link to="/">Home</Link>
                    </li>
                    {isAuth && <li key="2" className="nav-item">
                        <Link to={`/profile/${user.username}`}>Mijn profiel</Link>
                    </li>}
                    {userRole.includes('ROLE_ADMIN') && isAuth && navItems.map(item => {
                        if (item.title === "Leden") {
                            return (
                                <li
                                    key={item.id}
                                    className={item.cName}
                                    onMouseEnter={() => setAdminDropdown(true)}
                                    onMouseLeave={() => setAdminDropdown(false)}
                                >
                                    <Link to={item.path}>{item.title}</Link>
                                    {adminDropDown && <Dropdown
                                                role='admin'/>}
                                </li>
                            );
                        }
                    })}
                    {userRole.includes('ROLE_MODERATOR') && isAuth && navItems.map(item => {
                        if (item.title === "Wedstrijden") {
                            return (
                                <li
                                    key={item.id}
                                    className={item.cName}
                                    onMouseEnter={() => setRefereeDropdown(true)}
                                    onMouseLeave={() => setRefereeDropdown(false)}
                                >
                                    <Link to={item.path}>{item.title}</Link>
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
