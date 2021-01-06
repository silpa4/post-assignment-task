/* @flow */
import * as React from 'react';
import { Switch, Route } from 'react-router-dom';

import PostList from './post-list';
import PostDetail from './post-detail';
const Posts = (props) => (
  <div>
    <div>
      <div>
        <Switch>
          <Route path={`${props.match.url}/post-detail/:postId`} component={PostDetail} />
          <Route component={PostList} />
        </Switch>
      </div>
    </div>
  </div>
);
export default Posts;
