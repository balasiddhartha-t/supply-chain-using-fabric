import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import routes from 'src/constants/routes';
import useGlobal from 'src/stores';

const Router = () => {
  const [{ user }] = useGlobal();
  const { username } = user;
  return (
    <BrowserRouter>
      {routes.map(route => {
        return (
          <Route
            key={route.path}
            exact={route.exact}
            path={route.path}
            render={({ history }) => route.main({ history, username })}
          />
        );
      })}
    </BrowserRouter>
  );
};

export default Router;
