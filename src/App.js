import React, {useContext} from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';
import NavBar from './components//navBar/NavBar';
import Profile from './pages//profilePage/Profile';
import {AuthContext} from './components/context/AuthContext';
import './App.css';
import LoginPage from "./pages/loginPage/LoginPage";
import Overview from "./pages/admin/overview/Overview";
import CreateGamePage from "./pages/admin/createGamePage/CreateGamePage";
import AddMember from "./pages/admin/addMember/AddMember";
import ScoreCard from "./components/scoreCard/ScoreCard";

function PrivateRoute({ children, isAuth, ...rest}) {
    // omdat we nog steeds alle mogelijke properties zoals exact etc. op Route willen zetten, kunnen we met de ...rest operator zeggen:
    // al die andere props die je verder nog ontvangt, zet die ook allemaal maar op <Route>
    return (
        <Route {...rest}>
            {isAuth ? children : <Redirect to="/login" />}
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
                    <PrivateRoute exact path="/profile" isAuth={isAuth}>
                        <Profile />
                    </PrivateRoute>
                    <PrivateRoute exact path="/scorecards/:id" isAuth={isAuth}>
                        <ScoreCard />
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