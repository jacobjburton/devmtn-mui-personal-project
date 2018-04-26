import React from 'react';
import { Switch, Route } from 'react-router-dom';
import AddEvent from './components/AddEvent/AddEvent';
import Home from './components/Home/Home';
// import Auth from './components/Auth/Auth';
import Events from './components/Events/Events';
import TimeStandards from './components/TimeStandards/TimeStandards';

export default (
    <Switch>
        <Route exact path='/' component={Home}/>
        <Route path='/addevent' component={AddEvent}/>
        <Route path='/timestandards' component={TimeStandards}/>
        <Route path='/events' component={Events}/>
    </Switch>
)