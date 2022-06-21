import {Link, useHistory} from "react-router-dom";
import './NavBar.css'
import {useState} from "react";

function NavBar() {
    const history = useHistory();
    const [role, setRole] = useState('ADMIN')
    return (
        <nav>
            <div>
                {role == "ADMIN" &&
                    <ul>
                        <li>
                            <button
                                type="button"
                                onClick={() => history.push('/newMember')}>
                                Maak gebruiker aan
                            </button>
                        </li>
                        <li>
                            <button
                                type="button"
                                onClick={() => history.push('/overview')}>
                                Overview
                            </button>
                        </li>
                    </ul>}
            </div>

        </nav>
    );
}

export default NavBar;