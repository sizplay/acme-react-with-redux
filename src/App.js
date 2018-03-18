import React, { Component } from 'react';
import { HashRouter as Router, Route } from 'react-router-dom';
import Users from './Users';
import Products from './Products';
import Nav from './Nav';
import store from './store';
import UserForm from './UserForm';
import User from './User';

class App extends Component {
  constructor() {
    super();
    this.state = store.getState().users;
  }

  componentWillUnMount() {
    this.unsubscribe();
  }

  componentDidMount() {
    this.unsubscribe = store.subscribe(()=> this.setState(store.getState().users));
  }

  render() {

    return (
      <Router>
        <div className = 'container'>
          <h1>Acme-react-with-redux</h1>
          <Route render = { ()=> <Nav /> } />
          <hr />
          <Route path = '/users/create' exact render = { ()=> <UserForm UserForm = { UserForm } />} />
          <Route path = '/users' exact render = { ()=> <Users Users = { Users } />} />
          <Route path = '/products' exact render = { ()=> <Products Products = { Products } />} />
          <Route path = '/users/:id' exact render = { ()=> <User User = { User } />} />
        </div>
      </Router>
    );
  }
}

export default App;
