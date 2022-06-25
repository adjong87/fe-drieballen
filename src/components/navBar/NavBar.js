import {useHistory} from "react-router-dom";
import {useState} from "react";
import NavBarAdmin from './admin/NavBarAdmin'
import './NavBar.css'
import NavBarReferee from "./referee/NavBarReferee";

function NavBar() {
    const history = useHistory();
    const [role, setRole] = useState('MODERATOR')
    return (
        <>
            {role === "ADMIN" &&
                <NavBarAdmin/>}
            {role === "MODERATOR" &&
                <NavBarReferee/>}
        </>
    );
}

export default NavBar;