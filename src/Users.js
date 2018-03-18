import React, { Component } from 'react';
import store, { fetchUsers } from './store';
import { Link } from 'react-router-dom';
//import axios from 'axios';


class Users extends Component {
  constructor() {
    super();
    this.state = store.getState().users;
  }

  //why different?
  //this.state = store.getState().users; -> mine
  //this.state = { -> prof
  //users: store.getState().users;
  //}
  componentWillUnMount() {
    this.unsubscribe();
  }

  componentDidMount() {
    const fetchMessagesThunk = fetchUsers();
    store.dispatch(fetchMessagesThunk);
    this.unsubscribe = store.subscribe(()=> this.setState( store.getState().users));
  }

  render(){
    const { users } = this.state;
    return (
      <div>
        <h3>Users { users.length }</h3>
        <ul>
          {
            users.map( user => {
              return (
                <li key={ user.id }>
                  <h4>
                    <Link to={`/users/${ user.id }`}>
                    { user.name }
                    </Link>
                  </h4>
                </li>
              )}
            )
          }
        </ul>
      </div>
    );
  }
}

export default Users;

