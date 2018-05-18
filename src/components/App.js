import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { Container } from 'react-grid-system';
import Home from './Home';
import Calculation from './Calculation';
import Footer from '../containers/Footer';
import './App.css';

class App extends Component {
  render() {
    return (
      <Router>
        <Container>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/:coin/:amount/:date" component={Calculation} />

            <Redirect to="/" />
          </Switch>

          <Footer />
        </Container>
      </Router>
    );
  }
}

export default App;
