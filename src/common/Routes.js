import React from 'react';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';
import RouteWithSubRoutes from './RouteWithSubRoutes';
import NotFound from '../components/NotFound/NotFound';
import Login from '../pages/Login/Login';
import Admin from '../pages/Admin/Admin';
import Home from '../pages/Home/Home';
import User from '../pages/User/User';
import DeviceList from '../pages/DeviceList/DeviceList';
import DeviceDistribution from '../pages/DeviceDistribution/DeviceDistribution';
import DeviceVersion from '../pages/DeviceVersion/DeviceVersion';

const routesConfig = [
  {
    path: '/home',
    component: Home
  },
  {
    path: '/user',
    component: User
  },
  {
    path: '/device/list',
    component: DeviceList,
    children: []
  },
  {
    path: '/device/distribution',
    component: DeviceDistribution,
    children: []
  },
  {
    path: '/device/version',
    component: DeviceVersion,
    children: []
  }
];

// const subpath = process.env.SUB_PATH;

export default () => (
  <Router>
    <Switch>
      <Route path="/login" component={Login} />
      <Admin>
        <Switch>
          {routesConfig.map((route, i) => (
            <RouteWithSubRoutes key={i} {...route} />
          ))}
          <Route component={NotFound} />
        </Switch>
      </Admin>
    </Switch>
  </Router>
);
