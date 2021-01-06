/* @flow */
import * as React from 'react';
import { Switch, Route } from 'react-router-dom';

import UserDetail from './user-detail';
import UserList from './user-list';
const Users = (props) => (
  <div>
    <div>
      <div>
        <Switch>
          <Route path={`${props.match.url}/user-detail/:userId`} component={UserDetail} />
          <Route component={UserList} />
        </Switch>
      </div>
    </div>
  </div>
);
export default Users;
