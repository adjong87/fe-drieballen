import {useHistory} from "react-router-dom";
import './NavBar.css'
import {useState} from "react";
import {useContext} from 'react';
import {AuthContext} from "../context/AuthContext";


function NavBar() {
    const {user, roles} = useContext(AuthContext)
    const [userRole, setUserRole] = useState(roles)
    const history = useHistory();

    const rollen = userRole.map((role) => {
        return role.name;
    });

    if (rollen.includes('ROLE_ADMIN')) {
        return <>
            <nav className="navBar">
                <ul>
                    <li>
                        <button
                            type="button"
                            onClick={() => history.push(`/`)}>
                            Home
                        </button>
                    </li>
                    <li>
                        <button
                            type="button"
                            onClick={() => history.push(`/profile/${user.username}`)}>
                            My profile
                        </button>
                    </li>
                    <li>
                        <button
                            type="button"
                            onClick={() => history.push('/addMember')}>
                            Add new member
                        </button>
                    </li>
                    <li>
                        <button
                            type="button"
                            onClick={() => history.push('/overview')}>
                            Overview
                        </button>
                    </li>
                    <li>
                        <button
                            type="button"
                            onClick={() => history.push('/create')}>
                            Create Game
                        </button>
                    </li>
                </ul>
            </nav>
        </>
    } else if (rollen.includes('ROLE_MODERATOR')) {
        return <>
            <nav className="navBar">
                <ul>
                    <li>
                        <button
                            type="button"
                            onClick={() => history.push(`/`)}>
                            Home
                        </button>
                    </li>
                    <li>
                        <button
                            type="button"
                            onClick={() => history.push('/gamecheck')}>
                            Games to judge
                        </button>
                    </li>
                    <li>
                        <button
                            type="button"
                            onClick={() => history.push('/scorecard')}>
                            Scorecard
                        </button>
                    </li>
                </ul>
            </nav>
        </>
    } else {
        return <>
            <nav className="navBar">
                <ul>
                    <li>
                            <button
                                type="button"
                                onClick={() => history.push(`/`)}>
                                Home
                            </button>
                    </li>
                    <li>
                        <button
                            type="button"
                            onClick={() => history.push('/gamecheck')}>
                            Games to judge
                        </button>
                    </li>
                    <li>
                        <button
                            type="button"
                            onClick={() => history.push('/scorecard')}>
                            Scorecard
                        </button>
                    </li>
                </ul>
            </nav>
        </>
    }

}

export default NavBar;
