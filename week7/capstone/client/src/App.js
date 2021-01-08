import React from 'react';
import Home from './components/Home';
import AddPerson from './components/AddPerson';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Profile from './components/Profile';
import Search from './components/Search';

const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/add" component={AddPerson} />
        <Route path="/people/:id" component={Profile} />
        <Route path="/search" component={Search} />
      </Switch>
  </Router>
  );
}

export default App;
