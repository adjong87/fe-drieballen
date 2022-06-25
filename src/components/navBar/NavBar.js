import {useHistory} from "react-router-dom";
import NavBarAdmin from './admin/NavBarAdmin'
import './NavBar.css'
import NavBarReferee from "./referee/NavBarReferee";
import {useState} from "react";

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
