import React from "react";
import { inject, observer } from "mobx-react";
import { withRouter } from "react-router-dom";

@inject("AuthStore")
@observer
class Authentication extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this._checkAndRedirect();
  }
  /**
   *
   *
   * @param prevProps
   */
  componentDidUpdate(prevProps) {
    const { AuthStore } = this.props;
    if (AuthStore.token && AuthStore.name === null) {
      this._checkAndRedirect();
    }
  }
  // UNSAFE_componentWillMount() {
  //   // console.log(".......");
  // }
  // componentWillReceiveProps(nextProps) {
  //   if (this.props !== nextProps) {
  //     this._checkAndRedirect();
  //   }
  // }
  _checkAndRedirect() {
    const { AuthStore, history } = this.props;

    //stop redirection after google login
    // if (window.ethereum) {
    //   window.ethereum.on("accountsChanged", () => {
    //     AuthStore.logout();
    //     history.push("/login");
    //   });
    // }

    setTimeout(() => {
      if (!AuthStore.token) {
        history.push("/login");
      }

      if (AuthStore.token) {
        const token = AuthStore.token;
        AuthStore.loginUserWithToken(token).then((res) => {
          if (res.user.username) {
            AuthStore.setState("name", res.user.username);
            AuthStore.setState("email", res.user.email);
            AuthStore.setState("userPool", res.userPool);
            AuthStore.setState("user_boost", res.user.boost);
            AuthStore.setState("mm_address", res.user.mm_address);
            AuthStore.setState(
              "google_id",
              res.user.google_id ? res.user.google_id : null
            );
            AuthStore.setState(
              "facebook_id",
              res.user.facebook_id ? res.user.facebook_id : null
            );
            localStorage.setItem(
              "cloudminingPool",
              JSON.stringify(res.CloudminingPool)
            );
          } else {
            history.push("/login");
          }
        });
      }
    }, 1000);
  }
  //   _checkAndRedirect() {
  //     const { AuthStore, history } = this.props;

  //     /**
  //      * Create the bridge between the Login system
  //      * We check for local storage bearer_token_bridge
  //      * If this exists we can auto login the user based on this token
  //      */
  //     if (localStorage.getItem("bearer_token_bridge") !== null) {
  //       const ls = JSON.parse(localStorage.getItem("bearer_token_bridge"));

  //       if (ls.token) {
  //         const { history } = this.props;
  //         const token = ls.token;

  //         // We only allow users to login via token now
  //         // Trying to consolidate the signup process to only the website
  //         AuthStore.loginUserWithToken(token).then((res) => {
  //           console.log(res);
  //           if (res.username) {
  //             AuthStore.setState("name", res.username);
  //             AuthStore.setState("token", ls.token);
  //             history.push("/dashboard/team_mining");
  //           } else {
  //             history.push("/login");
  //           }
  //         });
  //       }
  //     } else {
  //       history.push("/login");
  //     }
  //   }

  render = () => {
    return this.props.render(this.props);
  };
}

export default withRouter(Authentication);
