import React from 'react';
import Store from './effectorStore';
import { useStore } from 'effector-react'
import { BrowserRouter as Router, Redirect, Switch, Route } from "react-router-dom";

import Controllers from './controllers/';

import HeaderComponent from './components/headerComponent';
import { MenuComponent } from './components/menuComponent';
import { UserComponent } from './components/userComponent/';
import { VersionsComponent } from './components/versionComponent/';
import ChatComponent from './components/chatComponent/';
import { ErrorPage } from './components/errorComponent/';
import { AuthorizationComponent } from './components/authComponent/';
import { FooterComponent } from './components/footerComponent';
import { ForecastComponent } from './components/forecastComponents/';


function PrivateRoute({ children, ...rest }) {
  const UserCredentials = useStore(Store.userCredentials.store);
  return (
    <Route
      {...rest}
      render={({ location }) =>
      UserCredentials && UserCredentials.jwt ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/",
              state: { from: location }
            }}
          />
        )
      }
    />
  );
}

function ExitFunc() {
  return (<Redirect to="/" />);
}

function MainComponent() {
  const UserCredentials = useStore(Store.userCredentials.store);
  if (!UserCredentials.jwt) Controllers.authController.getLocalStorageJWT();

  return (
    <React.Fragment>
      <Router>
        <Switch>
          <Route exact path="/">
            { UserCredentials && UserCredentials.jwt ? <Redirect to="/menu" /> : <AuthorizationComponent />}
          </Route>
          { UserCredentials && UserCredentials.jwt ? (
            <>
              <PrivateRoute path="/menu">
                <HeaderComponent />
                <MenuComponent />
              </PrivateRoute>

              <PrivateRoute path="/forecast">
                <HeaderComponent />
                <ForecastComponent Store={ UserCredentials } />
              </PrivateRoute>

              <PrivateRoute path="/chat">
                <HeaderComponent />
                <ChatComponent />
              </PrivateRoute>

              <PrivateRoute path="/usermanager">
                <HeaderComponent />
                <UserComponent Store={ UserCredentials } />
              </PrivateRoute>

              <PrivateRoute path="/settings">
                <HeaderComponent />
              </PrivateRoute>

              <PrivateRoute path="/versions">
                <HeaderComponent />
                <VersionsComponent Store={ UserCredentials } />
              </PrivateRoute>

              <PrivateRoute path="/exit">
                <ExitFunc />
              </PrivateRoute>
            </>
          ) : null }
          <Route path="*">
            <ErrorPage />
          </Route>
        </Switch>
      </Router>
      <FooterComponent />
    </React.Fragment>
  );
}

export default MainComponent;