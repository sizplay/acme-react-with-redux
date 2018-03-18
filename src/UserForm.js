import React, { Component } from 'react';
import store, { createUserText, postUser } from './store';
//import axios from 'axios';

export default class UserForm extends Component {

  constructor() {
    super();
    this.state = store.getState().users;
    this.onChangeName = this.onChangeName.bind(this);
    this.onSubmitName = this.onSubmitName.bind(this);
  }

  componentWillUnMount() {
    this.unsubscribe();
  }

  componentDidMount() {
    this.unsubscribe = store.subscribe( ()=> this.setState(store.getState().users));
  }

  onChangeName(ev) {
    const action = createUserText(ev.target.value);
    store.dispatch(action);
  }

  onSubmitName(ev) {
    ev.preventDefault();
    const name = this.state.name;
    const postMessageThunk = postUser(name);
    store.dispatch(postMessageThunk);
  }

  render() {
    const { name } = this.state;
    const { onChangeName, onSubmitName } = this;
    return(
      <div>
        <form id='user-form' onSubmit = { onSubmitName }>
          <div>
            <input
            className = 'user-input'
            value = { name }
            onChange = { onChangeName }
            placeholder = 'Write hero name'/>
            <button disabled={ name.length === 0} type = 'submit'>Submit</button>
          </div>
        </form>
      </div>
    );
  }
}
