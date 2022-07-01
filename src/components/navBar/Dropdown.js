import Reakt, {useState} from 'react'
import {ledenDropdown} from './component/navItems';
import './Dropdown.css'
import {Link} from 'react-router-dom'

function Dropdown() {
    const [dropdown, setDropdown] = useState(false);

    return (
        <>
            <ul
                className={dropdown ? "leden-submenu clicked" : "leden-submenu"}
                onClick={() => setDropdown(!dropdown)}
            >
                {ledenDropdown.map((item) => {
                    return (
                        <li key={item.id}>
                            <Link
                                to={item.path}
                                className={item.cName}
                                onClick={() => setDropdown(false)}
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

export default Dropdown;