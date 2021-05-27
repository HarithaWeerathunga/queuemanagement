import React from 'react';
import {
    Route,
    BrowserRouter as Router,
    Switch,
} from "react-router-dom";
import Home from './Home';
import Player from './Player';
import PlayerCustom from './PlayerCustomBeta';
import PlayerCustomControl from './PlayerCustomControl';
import './App.css';
import Sidebar from './components/Sidebar';


function App() {
    return (
        <Router>

            <Switch>
            <Route exact path="/" component={Home}></Route>
            <Route path="/player/:id" component={PlayerCustomControl}></Route>
            </Switch>
        </Router>
    );
}
export default App;