import { createStore, combineReducers, applyMiddleware } from 'redux';
import loggerMiddleware from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import axios from 'axios';

const userInitialState = {
  users: [],
  name: ''
};

//action types
const SET_USERS = 'SET_USERS';
const CREATE_USER_TEXT = 'CREATE_USER_TEXT';
const CREATE_USER = 'CREATE_USER';
const UPDATE_USER = 'UPDATE_USER';
const UPDATE_USER_TEXT = 'UPDATE_USER_TEXT';
const DELETE_USER = 'DELETE_USER';

//action creators
export const gotUsersFromServer = (users) => {
  return {
    type: SET_USERS,
    users
  };
};

export const createUserText = (name) => {
  return {
    type: CREATE_USER_TEXT,
    name
  };
};

export const createUser = (name) => {
  return {
    type: CREATE_USER,
    name
  };
};

export const updateUserText = (name) => {
  return {
    type: UPDATE_USER_TEXT,
    name
  };
};

export const updateUser = (name) => {
  return {
    type: UPDATE_USER,
    name
  };
};

export const deleteUser = (id) => {
  return {
    type: UPDATE_USER,
    id
  };
};

//Thunk creator
export function fetchUsers() {
  return function thunk(dispatch, getState) {
    axios.get('/api/users')
      .then(res => res.data)
      .then(users => {
        const action = gotUsersFromServer(users);
        dispatch(action);
      }
    );
  };
}

export function postUser(name) {
  return function thunk(dispatch, getState) {
    axios.post('/api/users', name)
      .then(res => res.data)
      .then(name => {
        store.dispatch(createUser(name));
      }
    );
  };
}

export function updateUserThunk(name) {
  return function thunk(dispatch, getState) {
    axios.put('/api/users', name)
      .then(res => res.data)
      .then(name => {
        store.dispatch(updateUser(name));
      }
      );
  };
}

//reducer
const usersReducer = (state = userInitialState, action) => {
  switch(action.type) {
    case SET_USERS:
      return Object.assign({}, state, { users: action.users });
    case CREATE_USER_TEXT:
      return Object.assign({}, state, { name: action.name });
    case CREATE_USER:
      return Object.assign({}, state, {
        users: state.users.concat(action.name)
        //users: [...state.users, action.name]
      });
    case UPDATE_USER:
     return [...state.users.filter(user => user.name !== action.name), Object.assign({}, action.name)];
    case DELETE_USER:
      return state.users.filter(state.users.name !== action.name);
    default:
      return state;
  }
};

const productsReducer = (state = [], action) => {
  return state;
};


const reducer = combineReducers( {
  users: usersReducer,
  products: productsReducer
});

const middleware = applyMiddleware(loggerMiddleware, thunkMiddleware);
const store = createStore(reducer, middleware);

export default store;
