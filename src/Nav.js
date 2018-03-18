import React from 'react';
import { Link } from 'react-router-dom';

const Nav = ()=> {
//  const path = location.pathname;
  return (
    <ul>
      <li>
        <h2><Link to='/users'>Users</Link></h2>
      </li>
      <li>
        <h2><Link to='/products'>Products</Link></h2>
      </li>
      <li>
        <h2><Link to='/users/create'>Create User</Link></h2>
      </li>
    </ul>
  );
}

export default Nav;
