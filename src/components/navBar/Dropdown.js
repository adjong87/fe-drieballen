import React, {useState} from 'react'
import {AdminDropdown, RefereeDropdown} from './component/navItems';
import './Dropdown.css'
import {Link} from 'react-router-dom'

function Dropdown({role}) {
    const [adminDropDown, setAdminDropdown] = useState(false);
    const [refereeDropDown, setRefereeDropdown] = useState(false);


    if (role === "admin") {
        return (<ul
                    className={adminDropDown ? "leden-submenu clicked" : "leden-submenu"}
                    onClick={() => setAdminDropdown(!adminDropDown)}
                >
                    {AdminDropdown.map((item) => {
                        return (
                            <li key={item.id}>
                                <Link
                                    to={item.path}
                                    className={item.cName}
                                    onClick={() => setAdminDropdown(false)}
                                >
                                    {item.title}
                                </Link>
                            </li>
                        );
                    })}
                </ul>
        )}
    else {
        return (
            <>
                <ul
                    className={refereeDropDown ? "referee-submenu clicked" : "referee-submenu"}
                    onClick={() => setRefereeDropdown(!refereeDropDown)}>
                    {RefereeDropdown.map((item) => {
                        return (
                            <li key={item.id}>
                                <Link
                                    to={item.path}
                                    className={item.cName}
                                    onClick={() => setRefereeDropdown(false)}
                                >
                                    {item.title}
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            </>
        )
    }
}

export default Dropdown;