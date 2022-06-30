import {useHistory} from "react-router-dom";
import {useContext} from 'react';
import {AuthContext} from "../../context/AuthContext";
import './NavBarAdmin.css'

function NavBarAdmin() {
    const { user } = useContext(AuthContext);
    const history = useHistory();
    return (
        <div>
            <nav>
                <ul className="navbar-admin">
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
        </div>
    )
}

export default NavBarAdmin
