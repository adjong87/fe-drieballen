import React, { useContext } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import NavBar from './components//navBar/NavBar';
import Profile from './pages//profile/Profile';
import Home from './pages/Home';
import { AuthContext } from './components/context/AuthContext';
import './App.css';
import Register from "./pages/register/Register";
import Login from "./pages/login/Login";

function App() {
    const { isAuth } = useContext(AuthContext);

    return (
        <>
            <NavBar />
            <div className="content">
                <Switch>
                    <Route exact path="/">
                        <Login />
                    </Route>
                    <Route exact path="/newMember">
                       <Register />
                    </Route>
                    <Route exact path="/allMembers">

                    </Route>
                    <Route path="/profile">
                        {isAuth ? <Profile /> : <Redirect to="/" />}
                    </Route>
                    {/*<Route exact path="/login">*/}
                    {/*    <Login />*/}
                    {/*</Route>*/}
                    {/*<Route exact path="/register">*/}
                    {/*/!*    <Register />*!/*/}
                    {/*</Route>*/}
                </Switch>
            </div>
        </>
    );
}

export default App;