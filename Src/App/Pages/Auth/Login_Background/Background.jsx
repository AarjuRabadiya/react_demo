import React from "react";
// import styled from "styled-components";
import lottie from "lottie-web";
import gsap from "gsap";
import { RoughEase } from "gsap/EasePack";
import { inject, observer } from "mobx-react";
import { withTranslation } from "react-i18next";
import * as animationData from "../json/data.json";
import LanguageSelector from "Components/LanguageSelector/LanguageSelector";
import Loader from "react-loader-spinner";
// import { media } from "Base/Media";
import "./background.scss";
// import Background from "../assets/login-bg.jpg";

gsap.registerPlugin(RoughEase);

@inject("AuthStore")
@observer
class BackgroundComponent extends React.Component {
  constructor(props) {
    super();
    this.state = {
      username: "",
      password: "",
      errorMessage: false,
      isGoogleLoading: false,
      isFacebookLoading: false,
      options: [
        // { value: "NFT_MCH", label: "NFT_MCH" },
        { value: "Chainguardian", label: "Chainguardian" },
        { value: "NFT_Ethermon", label: "NFT_Ethermon" },
        { value: "NFT_WarRider", label: "NFT_WarRider" },
      ],
      isSelect: false,
      selectOption: null,
      error: "",
      isError: false,
      isLoading: true,
    };

    /**
     * Initial setup for some elements
     * @type {null}
     */
    this.loginElement = null;
    this.formContainerElement = null;
    this.flickerElement = null;
    this.lottie = null;
  }

  componentDidMount() {
    const { AuthStore } = this.props;
    // this.props.isLoadingFalse();

    this.setState({
      isLoading: false,
    });
    AuthStore.logout();
    if (
      this.props.location &&
      this.props.location.search.substr(
        this.props.location.search.indexOf("=") + 1
      )
    ) {
      let email = this.props.location.search.substr(
        this.props.location.search.indexOf("=") + 1
      );
      let a = email.slice(0, email.indexOf("&"));
      // let mm_address = this.props.location.search.substr(
      //   this.props.location.search.indexOf("&") + 1
      // );
      // let address = mm_address.substr(mm_address.indexOf("=") + 1);

      let payload = {
        type: "CG",
        email: a,
        // mm_address: address,
      };
      this.LoginWithSelect(payload);
    }

    if (localStorage.getItem("bearer_token_bridge") !== null) {
      const ls = JSON.parse(localStorage.getItem("bearer_token_bridge"));

      if (ls.token) {
        AuthStore.setState("token", ls.token);
        const { history } = this.props;
        history.push("/dashboard/team_mining");
      }
    }

    gsap.fromTo(
      this.formContainerElement,
      { x: "-100%", opacity: 0, stagger: { each: 0.3 } },
      { duration: 2, x: 0, opacity: 1, ease: "expo.inOut" }
    );

    lottie.loadAnimation({
      container: this.lottie,
      renderer: "svg",
      loop: true,
      autoplay: true,
      animationData: animationData.default,
      rendererSettings: {
        preserveAspectRatio: "xMinYMin slice",
      },
    });
  }

  render = () => {
    const { i18n, history } = this.props;

    return (
      <div className="containerDiv">
        {/* <ContainerDiv> */}
        <div className="container">
          <LanguageSelector
            alignRight={true}
            changeLanguage={(e) => this.props.changeLanguage(e)}
            history={history}
            assets={true}
          />
          <div
            className="containerFluid"
            ref={(div) => (this.formContainerElement = div)}
          >
            {/* <Border> </Border> */}
            <div className="flex">
              {/* <Box></Box> */}
              <div className="formContainer">
                <div className="formDiv">{this.props.children}</div>
              </div>
              {/* <Box></Box> */}
            </div>
            {/* <Border></Border> */}
          </div>
        </div>
        {/* </ContainerDiv> */}
      </div>
    );
  };
}

export default withTranslation()(BackgroundComponent);
