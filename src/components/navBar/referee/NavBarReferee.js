import {useHistory} from "react-router-dom";
import {useContext} from 'react';
import {AuthContext} from "../../context/AuthContext";

function NavBarReferee() {
    const { user } = useContext(AuthContext);
    const history = useHistory();
    return (
        <div>
            <nav>
                <ul className="navbar-referee">
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
        </div>
    )
}

export default NavBarReferee
