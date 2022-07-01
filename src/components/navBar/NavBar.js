import {Link, useHistory} from "react-router-dom";
import './NavBar.css'
import {useState} from "react";
import {useContext} from 'react';
import {AuthContext} from "../context/AuthContext";
import balls from '../../assets/balls.png'
import {navItems} from "./component/navItems";
import Button from './component/Button'
import Dropdown from "./Dropdown";

function NavBar() {
    const [dropdown, setDropdown] = useState(false);
    const {isAuth, user, roles} = useContext(AuthContext)
    const [userRole, setUserRole] = useState(roles)
    const history = useHistory();
    return (
        <>
            <nav className="navbar">
                <Link to="/" className="navbar-logo">
                    DE DRIE BALLEN
                    <img src={balls} alt="logo"/>
                </Link>
                <ul className="nav-items">
                    {isAuth && navItems.map(item => {
                        if (item.title === "Leden") {
                            return (
                                <li
                                    key={item.id}
                                    className={item.cName}
                                    onMouseEnter={() => setDropdown(true)}
                                    onMouseLeave={() => setDropdown(false)}
                                >
                                    <Link to={item.path}>{item.title}</Link>
                                    {dropdown && <Dropdown />}
                                </li>
                            );
                        }
                        return (
                            <li key={item.id} className={item.cName}>
                                <Link to={item.path}>{item.title}</Link>
                            </li>
                        );
                    })}
                </ul>
                <Button />
            </nav>
        </>
    )
}

export default NavBar;
