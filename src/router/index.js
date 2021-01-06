import * as React from 'react';
import { Switch, Route } from 'react-router-dom';

import {
    Posts,
    Users,
    Entry
  } from '../pages/index';

class AppRouter extends React.Component {
    componentDidMount() {

    }

    render() {
      return (
        <React.Fragment>
            <Switch>
                <Route path="/" exact component={Entry} />
                <Route path="/users" component={Users} />
                <Route path="/posts" component={Posts} />
                <Route component={Entry} />
            </Switch>
        </React.Fragment>
      );
    }
  }
  
  export default AppRouter;