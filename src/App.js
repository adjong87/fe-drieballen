import React, {useContext} from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';
import NavBar from './components//navBar/NavBar';
import Profile from './pages//profile/Profile';
import {AuthContext} from './components/context/AuthContext';
import './App.css';
import LoginPage from "./pages/loginPage/LoginPage";
import Overview from "./pages/admin/overview/Overview";
import CreateGame from "./pages/admin/createGame/CreateGame";
import AddMember from "./pages/admin/addMember/AddMember";
import ScoreCard from "./components/scoreCard/ScoreCard";

function App() {
    const {isAuth} = useContext(AuthContext);

    return (
        <>
            <NavBar/>
                <Switch>
                    <Route exact path="/">
                        <LoginPage/>
                    </Route>
                    <Route exact path="/addMember">
                        <AddMember/>
                    </Route>
                    <Route exact path="/overview">
                        <Overview/>
                    </Route>
                    <Route exact path="/create">
                        <CreateGame/>
                    </Route>
                    <Route path="/profile">
                        <Profile/>
                    </Route>
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