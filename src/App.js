import React, {useContext} from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';
import NavBar from './components/navBar/NavBar';
import Profile from './pages/profilePage/ProfilePage';
import {AuthContext} from './components/context/AuthContext';
import './App.css';
import Overview from "./pages/admin/overview/Overview";
import CreateGamePage from "./pages/admin/createGamePage/CreateGamePage";
import AddMember from "./pages/admin/addMember/AddMember";
import GameCheckPage from "./pages/moderator/gamecheck/GameCheckPage";
import FillPage from "./pages/moderator/fillPage/FillPage";
import Home from "./pages/Home";
import LoginPage from "./pages/loginPage/LoginPage";

function PrivateRoute({children, isAuth, ...rest}) {
    return (
        <Route {...rest}>
            {isAuth ? children : <Redirect to="/login"/>}
        </Route>
    )
}

function App() {
    const {isAuth} = useContext(AuthContext);
    return (
        <>
            <div className="app">
                <div className="nav">
                    <NavBar/>
                </div>
                <div className="content">
                    <Switch>
                        <Route exact path="/">
                            <Home/>
                        </Route>
                        <PrivateRoute exact path="/addMember" isAuth={isAuth}>
                            <AddMember/>
                        </PrivateRoute>
                        <PrivateRoute exact path="/overview" isAuth={isAuth}>
                            <Overview/>
                        </PrivateRoute>
                        <PrivateRoute exact path="/create" isAuth={isAuth}>
                            <CreateGamePage/>
                        </PrivateRoute>
                        <PrivateRoute exact path="/profile/:username" isAuth={isAuth}>
                            <Profile/>
                        </PrivateRoute>

                        <PrivateRoute exact path="/gamecheck" isAuth={isAuth}>
                            <GameCheckPage/>
                        </PrivateRoute>
                        <PrivateRoute exact path="/fill/:id" isAuth={isAuth}>
                            <FillPage/>
                        </PrivateRoute>
                        <Route exact path="/login">
                            <LoginPage/>
                        </Route>

                    </Switch>
                </div>

            </div>
        </>
    );
}

export default App;