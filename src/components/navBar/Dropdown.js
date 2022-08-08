import React, {useState} from 'react'
import {AdminDropdown} from './component/navItems';
import './Dropdown.css'
import {Link} from 'react-router-dom'

function Dropdown() {
    const [adminDropDown, setAdminDropdown] = useState(false);

    return (

        <ul className={adminDropDown ? "leden-submenu clicked" : "leden-submenu"}
            onClick={() => setAdminDropdown(!adminDropDown)}>

            {AdminDropdown.map((item) => {
                return (
                    <li key={item.id}>
                        <Link to={item.path}
                              className={item.cName}
                              onClick={() => setAdminDropdown(false)}
                        >
                            {item.title}
                        </Link>
                    </li>
                );
            })}

        </ul>
    )
}

export default Dropdown;