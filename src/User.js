import React, { Component } from 'react';
import store, { updateUserText, updateUserThunk } from './store';

class User extends Component {

  constructor() {
    super();
    this.state = store.getState().users;
    this.onChangeName = this.onChangeName.bind(this);
    this.onSubmitName = this.onSubmitName.bind(this);
  }

  componentWillUnmount () {
    this.unsubscribe();
  }

  componentDidMount() {
    this.unsubscribe = store.subscribe( ()=> this.setState(store.getState().users));
  }

  onChangeName(ev) {
    //console.log(ev.target.value)
    const action = updateUserText(ev.target.value);
    store.dispatch(action);
  }

  onSubmitName(ev) {
    ev.preventDefault();
    const name = this.state.name;
    const id = Number(window.location.href.charAt(window.location.href.length - 1));
    const postUserThunk = updateUserThunk(id, name);
    store.dispatch(postUserThunk);
  }

  render() {
    const { users } = this.state;
    const id = Number(window.location.href.charAt(window.location.href.length-1));
    const user = users.find( user => user.id === id);
    const { onChangeName, onSubmitName } = this;

    return (
      <div className = 'row'>
        <h4>Hello { user.name } </h4>
        <form onSubmit = { onSubmitName }>
          <div className = 'col-lg-4'>
            <div className = 'input-group'>
              <span className = 'input-group-btn'>
                <button className='btn btn-danger' type='submit'>Delete</button>
              </span>
              <input
                type = 'text'
                className = 'form-control'
                onChange = { onChangeName }
                value = { user.name } />
              <span className = 'input-group-btn'>
                <button className = 'btn btn-primary' type = 'submit'>Update</button>
              </span>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default User;
