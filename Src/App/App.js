import React, { lazy, Suspense } from "react";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";
// import styled, { createGlobalStyle } from "styled-components";
// import { Helmet } from "react-helmet";
import Loader from "react-loader-spinner";
// import * as variable from "Base/Variables";
// import i18n from "../i18";
import i18n from "i18next";
import "./app.scss";
import Auth from "Components/HOC/Auth";
import { withTranslation } from "react-i18next";
// import BgMining from "Pages/Dashboard/Mining2.0/assets/bg-mining@2x.jpg";
const Login = lazy(() => import("Pages/Auth/Login"));
const Mining2 = lazy(() => import("Pages/Dashboard/Mining2.0/Mining2"));
const Profile = lazy(() => import("Pages/Dashboard/Profile/Profile"));
const Logout = lazy(() => import("Pages/Logout/Logout"));
const SignUp = lazy(() => import("Pages/Auth/Signup"));
const ForgotPassword = lazy(() => import("Pages/Auth/ForgotPassword"));
const ChangePassword = lazy(() => import("Pages/Auth/Change_password"));

class App extends React.Component {
  /**
   * Create the constructor
   * @param props
   *
   */
  constructor(props) {
    super(props);

    this.state = {
      // background: BgMining,
      isLoading: false,
    };
  }

  componentWillUnmount() {
    this.setState({
      isLoading: true,
    });
  }
  isLoadingFalse = () => {
    this.setState({
      isLoading: false,
    });
  };
  changeLanguage = (lang) => {
    i18n.changeLanguage(lang);
  };
  render = (props) => {
    // const { background, imageList } = this.state;
    // const { AuthStore } = this.props;
    let { isLoading } = this.state;

    return (
      <div className={isLoading ? "main" : "main-div"}>
        {isLoading && (
          <div className="loader">
            <Loader type="Oval" color="#CDD5DB" width="180" height="180" />
          </div>
        )}
        <Router>
          <Suspense fallback="">
            <Switch>
              <Auth
                exact
                path="/login"
                render={(props) => (
                  <Login
                    {...props}
                    changeLanguage={(e) => this.changeLanguage(e)}
                  />
                )}
              />

              <Route
                exact
                path="/signup"
                render={(props) => (
                  <SignUp
                    {...props}
                    changeLanguage={(e) => this.changeLanguage(e)}
                  />
                )}
              />
              <Route
                exact
                path="/forgot-password"
                render={(props) => (
                  <ForgotPassword
                    {...props}
                    changeLanguage={(e) => this.changeLanguage(e)}
                  />
                )}
              />
              <Route
                exact
                path="/change-password/:token"
                render={(props) => (
                  <ChangePassword
                    {...props}
                    changeLanguage={(e) => this.changeLanguage(e)}
                  />
                )}
              />
              <Auth
                exact
                path="/dashboard/logout"
                render={(props) => (
                  <Logout
                    {...props}
                    changeLanguage={(e) => this.changeLanguage(e)}
                  />
                )}
              />

              <Route
                exact
                path="/team_mining"
                render={(props) => (
                  <Mining2
                    {...props}
                    changeLanguage={(e) => this.changeLanguage(e)}
                  />
                )}
              />

              <Auth
                exact
                path="/dashboard/profile"
                assets={false}
                render={(props) => (
                  <Profile
                    {...props}
                    changeLanguage={(e) => this.changeLanguage(e)}
                  />
                )}
              />
              <Redirect to="/login" />
            </Switch>
          </Suspense>
        </Router>
      </div>
    );
  };
}
export default withTranslation()(App);
