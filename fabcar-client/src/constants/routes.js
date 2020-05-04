/* eslint-disable react/prop-types */
import React from 'react';
import { Redirect } from 'react-router-dom';
import 'src/styles/global.scss';
import Dashboard from 'src/pages/dashboard';
import Login from 'src/pages/sign-in';

const routes = [
  {
    exact: true,
    path: '/',
    main: () => (
      <Redirect
        to={{
          pathname: '/login'
        }}
      />
    )
  },
  {
    name: 'Login',
    exact: true,
    path: '/login',
    isPublic: true,
    main: ({ history, username }) => {
      return username ? (
        <Redirect
          to={{
            pathname: '/dashboard'
          }}
        />
      ) : (
        <Login history={history} />
      );
    }
  },
  {
    name: 'Dashboard',
    exact: true,
    path: '/dashboard',
    isPublic: true,
    main: ({ history, username }) => {
      return !username ? (
        <Redirect
          to={{
            pathname: '/login'
          }}
        />
      ) : (
        <Dashboard history={history} />
      );
    }
  }
];

export default routes;
