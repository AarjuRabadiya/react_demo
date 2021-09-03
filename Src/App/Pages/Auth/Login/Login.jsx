import React from "react";
// import styled from "styled-components";
import { withTranslation } from "react-i18next";
// import i18n from "i18next";
// import { media } from "Base/Media";
import { inject, observer } from "mobx-react";
import Loader from "react-loader-spinner";
// import Arkane from "@arkane-network/web3-arkane-provider";
// import * as variable from "Base/Variables";
// import Background from "./assets/bg-cg-lore.jpg";
import Title from "Components/Typography/Title";
import Input from "Components/Form/Input";
// import Link from "Components/Buttons/Link";
// import Button from "Components/Buttons/Button";
import Social from "../Social_Login";
import Select from "Components/Select/Select";
import BackgroundDiv from "../Login_Background";
import "./login.scss";
import "../../../app.scss";

@inject("AuthStore")
@observer
class LoginContainer extends React.Component {
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
      isLoading: false,
    };

    /**
     * Initial setup for some elements
     * @type {null}
     */
    this.loginElement = null;
    // this.formContainerElement = null;
    this.flickerElement = null;
    this.lottie = null;
  }

  componentDidMount() {
    const { AuthStore } = this.props;
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

    // gsap.fromTo(
    //   this.formContainerElement,
    //   { x: "-100%", opacity: 0, stagger: { each: 0.3 } },
    //   { duration: 2, x: 0, opacity: 1, ease: "expo.inOut" }
    // );

    // lottie.loadAnimation({
    //   container: this.lottie,
    //   renderer: "svg",
    //   loop: true,
    //   autoplay: true,
    //   animationData: animationData.default,
    //   rendererSettings: {
    //     preserveAspectRatio: "xMinYMin slice",
    //   },
    // });
  }

  signIn = (e) => {
    e.preventDefault();
    const { AuthStore } = this.props;
    const { username, password } = this.state;
    let payload = {
      username: username,
      password: password,
    };
    AuthStore.login(payload).then((res) => {
      if (res.error === 2) {
        this.setState({
          errorMessage: "please check your email to verify account",
          exists: 0,
        });
      } else if (res.success) {
        // console.log(res);
        AuthStore.setState("token", res.success);
        const { history } = this.props;
        // console.log(history);
        history.push("/dashboard/team_mining");
      } else {
        AuthStore.setState("token", false);
        this.setState({ errorMessage: true });
      }
    });
  };

  loginMetaMask = (e) => {
    const { AuthStore, i18n } = this.props;
    this.setState({
      errorMessage: "",
      error: "",
      isError: false,
    });
    AuthStore.loginMetaMask().then((res) => {
      if (res.exists === 0) {
        this.setState({
          errorMessage: i18n.t("login.signup.error.signupfirst"),
          exists: 0,
        });
      } else if (res.exists === 1) {
        this.setState({ exists: 1 });
      } else if (res.error) {
        if (res.error === 2) {
          this.setState({
            errorMessage: "please check your email to verify account",
          });
        } else {
          this.setState({ errorMessage: res.error.message });
        }
      } else if (res.success) {
        AuthStore.setState("token", res.success);

        const { history } = this.props;

        history.push("/dashboard/team_mining");
      }
    });
  };

  setField = (e) => {
    this.setState({
      errorMessage: "",
      error: "",
      isError: false,
    });
    if (e.key === "Enter") {
      this.signIn(e);
    }
    this.setState({ [e.target.name]: e.target.value, isError: false });
  };

  LoginWithSelect = (payload) => {
    const { AuthStore } = this.props;

    AuthStore.googleLogin(payload).then((res) => {
      this.setState({
        isGoogleLoading: false,
        isFacebookLoading: false,
      });
      if (res.access_token) {
        AuthStore.setState("token", res.access_token);
        AuthStore.setState("email", res.email);
        const { history } = this.props;
        history.push("/dashboard/team_mining");
      }
    });
  };

  selectLoginOptin = (selectedOption) => {
    this.setState({
      errorMessage: "",
      error: "",
      isError: false,
    });
    this.setState({
      isSelect: true,
      // isError: false,
      selectOption: selectedOption,
    });
  };

  loginWithSelectOption = (e) => {
    e.preventDefault();
    this.setState({
      isLoading: true,
    });
    let { selectOption } = this.state;
    if (selectOption.value === "Chainguardian") {
      window.location.replace("https://partner.nftmining.com/login");
    }
  };

  redirect = () => {
    const { history } = this.props;
    if (history.location.pathname === "/login") {
      this.reset();
    } else {
      history.push("/login");
    }
  };

  reset = () => {
    this.setState({
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
      isLoading: false,
    });
  };
  // loginArkane = (e) => {
  //   e.preventDefault();
  //   const Arkane = window.Arkane;
  //   Arkane.createArkaneProviderEngine({
  //     clientId: "Arketype",
  //     rpcUrl: "https://kovan.infura.io",
  //     environment: "qa",
  //     signMethod: "POPUP",
  //   }).then((provider) => {
  //     web3 = new Web3(provider);
  //     console.log("....provider....", provider, "..web3..", web3);

  //     // get account
  //     window.web3.eth.getAccounts((err, wallets) => {
  //       console.log("...err...", err, "...wallets...", wallets);
  //     });
  //   });
  // };

  render = () => {
    const { i18n, history } = this.props;

    const {
      errorMessage,
      isSelect,
      isError,
      error,
      isLoading,
      selectOption,
      username,
      password,
    } = this.state;
    // console.log("i18n.t name", i18n.t("login:name"));
    return (
      <BackgroundDiv
        isLoadingFalse={() => this.props.isLoadingFalse()}
        isLoading={this.props.isLoading}
        changeLanguage={(e) => this.props.changeLanguage(e)}
      >
        <div className="login-page">
          <Title
            theme="light"
            shadow={true}
            tag="h1"
            align="center"
            spacing="small"
            size="large"
          >
            {i18n.t("login:name")}
          </Title>

          {/* Display the error message */}
          {errorMessage && errorMessage === true ? (
            <div className="error">
              {/* Default Message */}
              {i18n.t("login.error")}
            </div>
          ) : errorMessage ? (
            <div className="error">
              {/* Specific Message */}
              {errorMessage}
            </div>
          ) : null}
          {isError && <div className="error">{error}</div>}
          <div className="formRow">
            <Select
              value={selectOption}
              handleChange={this.selectLoginOptin}
              options={this.state.options}
              placeholder={i18n.t("login:signInOption")}
              borderBottom={true}
            />
          </div>
          {!isSelect && (
            <React.Fragment>
              <div className="formRow">
                <Input
                  name="username"
                  type="text"
                  placeholder={i18n.t("login:emailAddress")}
                  onChange={(e) => this.setField(e)}
                  value={username}
                />
              </div>
              <div className="formRow">
                <Input
                  type="password"
                  placeholder={i18n.t("login:password")}
                  onChange={(e) => this.setField(e)}
                  name="password"
                  value={password}
                />
                {
                  // <LinkWrapper>
                  // <Link href="https://safename.io/resetpw">{i18n.t('login.forgot')}</Link>
                  // </LinkWrapper>
                }
              </div>
            </React.Fragment>
          )}
          {isSelect && (
            <div className="displayFlex">
              <div className="formRowDisplayFlex">
                <a
                  className="purple button-borderRadius"
                  onClick={(e) => this.loginWithSelectOption(e)}
                  href="#"
                >
                  <div className="removeTransform">
                    {isLoading ? (
                      <Loader
                        type="Oval"
                        color="#CDD5DB"
                        width="18"
                        height="18"
                      />
                    ) : (
                      `Sign in via ${selectOption.value}`
                    )}
                  </div>
                </a>
              </div>
              <div className="formRowDisplayFlex">
                <a
                  className="button-borderRadius green"
                  onClick={() => this.redirect()}
                  href="#"
                >
                  <div className="removeTransform"> {i18n.t("login:back")}</div>
                </a>
              </div>
            </div>
          )}
          {!isSelect && (
            <React.Fragment>
              <div className="formRow">
                <div
                  className="forgotPassword"
                  onClick={() => this.props.history.push("/forgot-password")}
                >
                  {i18n.t("login:forgotPassword")}
                </div>
              </div>
              <div className="displayFlex">
                <div className="formRowDisplayFlex">
                  <a
                    onClick={(e) => this.signIn(e)}
                    href="#"
                    className="signIn button-borderRadius"
                  >
                    <div className="removeTransform">
                      {i18n.t("login:signIn")}
                    </div>
                  </a>
                </div>

                <div className="formRowDisplayFlex">
                  {/* <ButtonLink> */}
                  <a
                    onClick={(e) => this.loginMetaMask(e)}
                    href="#"
                    className="button-borderRadius metmask-button orange"
                  >
                    <div className="removeTransform">
                      {i18n.t("login:signInWithMetaMask")}
                    </div>
                  </a>
                  {/* </ButtonLink> */}
                  {/* <ButtonLink>
                          <ButtonMetaMask
                            onClick={(e) => this.loginArkane(e)}
                            theme="green"
                          >
                            Arkane Network
                          </ButtonMetaMask>
                        </ButtonLink> */}
                </div>
              </div>

              <Social history={history} i18n={i18n} />
              <div className="formRow">
                <div className="linkWrapper">
                  {i18n.t("login:noAccount")}
                  <a
                    className="link signupLink"
                    onClick={(e) => this.props.history.push("/signup")}
                  >
                    {i18n.t("login:signUp")}
                  </a>
                </div>
              </div>
            </React.Fragment>
          )}
        </div>
      </BackgroundDiv>
    );
  };
}

export default withTranslation()(LoginContainer);
