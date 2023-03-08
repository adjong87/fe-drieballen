import React, { useContext } from 'react';
import './Button.css';

import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

function Button() {
  const { logout } = useContext(AuthContext);
  const { isAuth } = useContext(AuthContext);

  return (
    <>
      {isAuth
        ? (
          <button
            className="btn"
            onClick={logout}
          >
            Uitloggen
          </button>
        )
        : (
          <Link to="/Login">
            <button className="btn">
              Inloggen
            </button>
          </Link>
        )}
    </>
  );
}

export default Button;
