import React from 'react';
import AuthService from './AuthService';

import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

import Login from './components/Login'
import Recovery from './components/Recovery'
import Tanks from './components/Tanks'
import Tank from './components/Tank'
import Employees from './components/Employees'
import Temporal from './components/Temporal'
import Productions from './components/Productions'
import Buoys from './components/Buoys'
import Settings from './components/Settings'

const Auth = new AuthService();

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      Auth.isAuthenticated() ? (
        <Component {...props} />
      ) : (
        <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
      )
    }
  />
);

const Routes = () => (
  <BrowserRouter>
    <Switch>
        <Route exact path='/login' component={Login} />
        <Route exact path='/recovery' component={Recovery} />
        <PrivateRoute exact path='/tanks' component={Tanks} />
        <PrivateRoute exact path='/tanks/:id' component={Tank} />
        <PrivateRoute exact path='/temporal' component={Temporal} />
        <PrivateRoute exact path='/productions' component={Productions} />
        <PrivateRoute exact path='/productions/:id' component={Temporal} /> { /* FIX */ }
        <PrivateRoute exact path='/productions/:id/edit' component={Buoys} /> { /* FIX */ }
        <PrivateRoute exact path='/users' component={Employees} />
        <PrivateRoute exact path='/users/:id' component={Temporal} /> { /* FIX */ }
        <PrivateRoute exact path='/users/:id/edit' component={Buoys} /> { /* FIX */ }
        <PrivateRoute exact path='/buoys' component={Buoys} />
        <PrivateRoute exact path='/buoys/:id' component={Temporal} /> { /* FIX */ }
        <PrivateRoute exact path='/buoys/:id/edit' component={Buoys} /> { /* FIX */ }
        <PrivateRoute exact path='/settings' component={Settings} />
        <Redirect to='/tanks' />
    </Switch>
  </BrowserRouter>
);

export default Routes;
