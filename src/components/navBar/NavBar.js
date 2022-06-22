import {useHistory} from "react-router-dom";
import {useState} from "react";
import NavBarAdmin from './NavBarAdmin'
import './NavBar.css'

function NavBar() {
    const history = useHistory();
    const [role, setRole] = useState('ADMIN')
    return (
        <>
            {role === "ADMIN" &&
                <NavBarAdmin/>}
        </>
    );
}

export default NavBar;