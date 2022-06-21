import {Link, useHistory} from "react-router-dom";
import './NavBar.css'

function NavBar() {
    const history = useHistory();

    return (
        <nav>
                <button
                    type="button"
                >
                    Log uit
                </button>

                <div>
                    <button
                        type="button"
                        onClick={() => history.push('/signin')}
                    >
                        Log in
                    </button>
                    <button
                        type="button"
                        onClick={() => history.push('/signup')}
                    >
                        Registreren
                    </button>
                </div>

        </nav>
    );
}

export default NavBar;