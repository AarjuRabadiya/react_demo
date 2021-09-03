import React from "react";
import { inject, observer } from "mobx-react";
import { withRouter } from "react-router-dom";

@inject("AuthStore", "GeneralStore", "MiningStore")
@observer
class Logout extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this._logout();
  }

  _logout() {
    const { AuthStore, GeneralStore, MiningStore } = this.props;
    AuthStore.setState("user", false);
    AuthStore.setState("token", false);
    AuthStore.setState("email", null);
    AuthStore.setState("name", null);
    AuthStore.setState("userPool", {});
    AuthStore.setState("mm_address", null);
    AuthStore.setState("google_id", null);
    AuthStore.setState("facebook_id", null);
    AuthStore.setState("user_boost", null);
    AuthStore.setState("cloudminingPool", []);
    MiningStore.setState("selectedNFT", []);
    MiningStore.setState("maximumSelected", false);
    MiningStore.setState("selectedCategory", null);
    GeneralStore.setState("hasMenuLoaded", false);

    // Remove the bridge
    localStorage.removeItem("bearer_token_bridge");

    // Take them to the logout page
    window.location.href = "/logout";
  }

  render = (props) => {
    return <div>{this.props.children}</div>;
  };
}

export default withRouter(Logout);
