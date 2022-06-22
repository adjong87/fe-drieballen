import React, {useContext} from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';
import NavBar from './components//navBar/NavBar';
import Profile from './pages//profile/Profile';
import {AuthContext} from './components/context/AuthContext';
import './App.css';
import Login from "./pages/login/Login";
import Overview from "./pages/admin/overview/Overview";
import CreateGame from "./pages/admin/createGame/CreateGame";
import AddMember from "./pages/admin/addMember/AddMember";
import ScoreCard from "./components/scoreCard/ScoreCard";

function App() {
    const {isAuth} = useContext(AuthContext);

    return (
        <>
            <NavBar/>
            <div className="content">
                <Switch>
                    <Route exact path="/">
                        <Login/>
                    </Route>
                    <Route exact path="/newMember">
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
                    {/*<Route exact path="/login">*/}
                    {/*    <Login />*/}
                    {/*</Route>*/}
                    {/*<Route exact path="/addMember">*/}
                    {/*/!*    <NewMember />*!/*/}
                    {/*</Route>*/}
                </Switch>
            </div>
        </>
    );
}

export default App;