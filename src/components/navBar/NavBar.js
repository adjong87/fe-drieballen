import {useHistory} from "react-router-dom";
import './NavBar.css'
import {useState} from "react";

function NavBar() {
    const history = useHistory();
    const [role, setRole] = useState('ADMIN')
    return (
        <nav>
            <div>
                {role === "ADMIN" &&
                    <ul>
                        <li>
                            <button
                                type="button"
                                onClick={() => history.push('/profile')}>
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
                        <li>
                            <button
                                type="button"
                                onClick={() => history.push('/scorecard')}>
                                Scorecard
                            </button>
                        </li>
                    </ul>}
            </div>
        </nav>
    );
}

export default NavBar;