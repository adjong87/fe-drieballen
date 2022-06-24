import {useHistory} from "react-router-dom";

function NavBarAdmin() {
    const history = useHistory();
    return (
        <div>
            <nav>
                <ul className="navbar-admin">
                    <li>
                        <button
                            type="button"
                            onClick={() => history.push('/profilePage')}>
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
                </ul>
            </nav>
        </div>
    )
}

export default NavBarAdmin
