import React, {useContext} from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';
import NavBar from './components/navBar/NavBar';
import Profile from './pages/profilePage/ProfilePage';
import {AuthContext} from './components/context/AuthContext';
import './App.css';
import LoginPage from "./pages/loginPage/LoginPage";
import Overview from "./pages/admin/overview/Overview";
import CreateGamePage from "./pages/admin/createGamePage/CreateGamePage";
import AddMember from "./pages/admin/addMember/AddMember";
import ScoreCard from "./components/scoreCard/ScoreCard";
import ScoreCardOverview from "./pages/moderator/scoreCardOverview/ScoreCardOverView";
import FillPage from "./pages/moderator/fillPage/FillPage";

function PrivateRoute({ children, isAuth, ...rest}) {
    return (
        <Route {...rest}>
            {isAuth ? children : <Redirect to="/" />}
        </Route>
    )
}

function App() {
    const {isAuth} = useContext(AuthContext);

    return (
        <>
            <NavBar/>
                <Switch>
                    <Route exact path="/">
                        <LoginPage/>
                    </Route>
                    <Route exact path="/AddMember">
                        <AddMember/>
                    </Route>
                    <Route exact path="/overview">
                        <Overview/>
                    </Route>
                    <Route exact path="/create">
                        <CreateGamePage />
                    </Route>
                    <PrivateRoute exact path="/profile/:username" isAuth={isAuth}>
                        <Profile />
                    </PrivateRoute>
                    <PrivateRoute exact path="/scorecards/:id" isAuth={isAuth}>
                        <ScoreCard />
                    </PrivateRoute>
                    <PrivateRoute exact path="/gamecheck" isAuth={isAuth}>
                        <ScoreCardOverview />
                    </PrivateRoute>
                    <PrivateRoute exact path="/fill/:id" isAuth={isAuth}>
                        <FillPage />
                    </PrivateRoute>
                    <Route path="/scorecard">
                        <ScoreCard/>
                    </Route>
                    {/*<Route exact path="/loginPage">*/}
                    {/*    <Login />*/}
                    {/*</Route>*/}
                    {/*<Route exact path="/addMember">*/}
                    {/*/!*    <NewMember />*!/*/}
                    {/*</Route>*/}
                </Switch>
        </>
    );
}

export default App;