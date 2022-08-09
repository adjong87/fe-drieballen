import {Link} from "react-router-dom";
import './NavBar.css'
import {useState, useContext} from "react";
import {AuthContext} from "../context/AuthContext";
import balls from '../../assets/balls.png'
import {navItems} from "./component/navItems";
import Button from './component/Button'
import Dropdown from "./Dropdown";

function NavBar() {
    const {isAuth, user} = useContext(AuthContext)
    const [adminDropDown, setAdminDropdown] = useState(false);

        return (
        <>
            <nav className="navbar">
                <div className="navbar-logo">
                    <img src={balls} alt="logo"/>
                    DE DRIE BALLEN
                </div>
                <ul className="nav-items">
                    {isAuth &&    <li key="1" className="nav-item">
                        <Link to="/home">Home</Link>
                    </li>}
                    {isAuth && <li key="2" className="nav-item">
                        <Link to={`/profile/${user.username}`}>Mijn profiel</Link>
                    </li>}
                    {isAuth && user.gebruikersrollen.includes('ROLE_ADMIN') && navItems.map((item, index) => {
                        if (item.title === "Leden") {
                            return (
                                <li
                                    key={item.id + index}
                                    className={item.cName}
                                    onMouseEnter={() => setAdminDropdown(true)}
                                    onMouseLeave={() => setAdminDropdown(false)}
                                >
                                    {item.path !== "" &&  <Link to={item.path}>{item.title}</Link>}
                                    {adminDropDown &&
                                        <Dropdown
                                            />}
                                </li>
                            );
                        }
                    })}
                    {isAuth && user.gebruikersrollen.includes('ROLE_MODERATOR') &&

                            <li key="4" className="nav-item">
                                <Link to="/gamecheck">Wedstrijden</Link>
                            </li>}
                </ul>
                <Button/>
            </nav>
        </>
    )

}

export default NavBar;
