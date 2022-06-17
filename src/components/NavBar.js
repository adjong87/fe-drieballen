import {Link, useHistory} from "react-router-dom";
import './NavBar.css'

function NavBar() {
    const history = useHistory();

    return (
        <nav>
            <Link to="/">
          <span>
            <h3>
              Banana Security
            </h3>
          </span>
            </Link>

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