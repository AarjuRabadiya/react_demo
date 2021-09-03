import React from "react";
import styled from "styled-components";
import { withTranslation } from "react-i18next";
import { media } from "Base/Media";
import { inject, observer } from "mobx-react";
import { validateEmail, truncate } from "Base/Utilities";
import * as variable from "Base/Variables";
import Social from "../Social_Login";
import Title from "Components/Typography/Title";
import Text from "Components/Typography/Text";
import Input from "Components/Form/Input";
import Button from "Components/Buttons/Button";
import BackgroundDiv from "../Login_Background";
import Link from "Components/Buttons/Link";
import "./signup.scss";
import "../../../app.scss";

@inject("AuthStore")
@observer
class SignUpContainer extends React.Component {
  constructor(props) {
    super();
    this.state = {
      email: "",
      validEmail: false,
      password: null,
      errorMessage: false,
      signupConfirmed: false,
      username: "",
      mm_signature: "",
      pool_code: "",
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
  /**
   * Create some initial animations on the component did mount layer
   */
  componentDidMount() {
    const { AuthStore, history } = this.props;

    if (history.location.search) {
      this.setState({
        pool_code: history.location.search.substring(
          history.location.search.indexOf("=") + 1
        ),
      });
    }

    // GSAP animations
    // We want these to trigger once the component is mounted
    // gsap.fromTo(
    //   this.loginElement,
    //   { x: "-100%" },
    //   { duration: 2, x: 0, ease: "expo.inOut" }
    // );
    // gsap.to(this.flickerElement, {
    //   duration: 3,
    //   opacity: 0,
    //   delay: 2,
    //   ease: "rough({strength: 2, points: 50, clamp: true })",
    //   yoyo: true,
    //   repeat: -1,
    //   repeatDelay: 4,
    // });
    // gsap.fromTo(
    //   this.formContainerElement,
    //   { x: "-100%", opacity: 0, stagger: { each: 0.3 } },
    //   { duration: 2, x: 0, opacity: 1, ease: "expo.inOut" }
    // );

    // Load some lottie animations also
    // lottie.loadAnimation({
    //   container: this.lottie, // the dom element
    //   renderer: "svg",
    //   loop: true,
    //   autoplay: true,
    //   animationData: animationData.default,
    //   rendererSettings: {
    //     preserveAspectRatio: "xMinYMin slice",
    //   },
    // });

    /** ACCOUNT change trigger MM address change **/
    if (window.ethereum) {
      window.ethereum.on("accountsChanged", (res) => {
        AuthStore.setState("mm_address", res[0]);
      });
    }
  }
  connectMetaMask = (e) => {
    e.preventDefault();
    const { AuthStore } = this.props;
    const { email } = this.state;

    // Retrieve the MetaMask Address from the user
    AuthStore.retrieveMetaMaskAddress().then((res) => {
      if (res.address) {
        this.setState({ validEmail: true });
        AuthStore.setState("email", email);
        AuthStore.setState("mm_address", res.address);
      }
      if (res.error) {
        this.setState({ validEmail: false });
        this.setState({ errorMessage: res.error.message });
      }
    });
  };

  /**
   * Sign the Signature
   * @returns {Promise<*>}
   */
  signSignature = async () => {
    const { AuthStore } = this.props;

    await AuthStore.initWeb3();

    if (window.ethereum) {
      await ethereum.enable();
    }

    let address = await AuthStore.getAddress();

    // let val = await AuthStore.getSignature(address);
    // this.setState({
    //   mm_signature: val,
    // });

    return await AuthStore.getSignature(address, "register");
  };

  /**
   * Sign up using email
   * @param e
   */
  signUp = (e) => {
    e.preventDefault();

    const { AuthStore, i18n } = this.props;
    const { email, password, username } = this.state;

    if (!AuthStore.mm_address) {
      this.setState({ errorMessage: i18n.t("login.connect.mm") });
      return false;
    }

    if (!password || password.length <= 7) {
      this.setState({ errorMessage: i18n.t("login.signup.error.minlength") });
      return false;
    }

    if (!validateEmail(email)) {
      this.setState({
        errorMessage: i18n.t("login.signup.error.invalidemail"),
        validEmail: false,
      });
      AuthStore.setState("email", null);
    }

    if (!AuthStore.mm_address) {
      this.setState({ errorMessage: i18n.t("login.connect.mm") });
      AuthStore.setState("email", null);
    }

    let signSignature = this.signSignature();

    signSignature.then((res) => {
      if (res) {
        let mm_signature = res;

        // Check if the user exists in the Safename DB
        AuthStore.emailExists(email).then((res) => {
          if (res.exists === 1) {
            this.setState({
              errorMessage: i18n.t("login.signup.error.emailexists"),
              validEmail: false,
            });
            AuthStore.setState("email", null);
          } else if (res.exists === 0) {
            let signupData = {
              email: email,
              password: password,
              mm_address: AuthStore.mm_address,
              mm_signature: mm_signature,
              username: username,
              ...(this.state.pool_code !== "" && {
                pool_code: this.state.pool_code,
              }),
            };

            AuthStore.signUp(signupData).then((res) => {
              if (res.error === 2) {
                this.setState({
                  errorMessage: "ETH address already exists",
                  validEmail: false,
                });
                AuthStore.setState("email", null);
              } else if (res.access_token) {
                this.setState({ signupConfirmed: true });
                AuthStore.setState("email", null);
              } else if (res.error) {
                this.setState({ errorMessage: i18n.t(res.error) });
              }
            });
          }
        });
      }
    });
  };
  /**
   * Set a field
   * Return key to submit
   * @param e
   */
  setField = (e) => {
    if (e.key === "Enter") {
      this.signUp(e);
    }
    this.setState({ [e.target.name]: e.target.value });
  };

  render = () => {
    const { i18n, history, AuthStore } = this.props;
    const { errorMessage, signupConfirmed } = this.state;

    return (
      <BackgroundDiv
        isLoadingFalse={() => this.props.isLoadingFalse()}
        isLoading={this.props.isLoading}
      >
        <div className="signUp">
          {signupConfirmed ? (
            <React.Fragment>
              <div className="formRow">
                <Text
                  tag="p"
                  color={variable.white}
                  spacing="large"
                  weight="500"
                  size="large"
                  spacing="smallest"
                  align="center"
                >
                  {i18n.t("login.signup.thankyou")}
                </Text>
              </div>
              <div className="formRow">
                <a
                  className="purple button-borderRadius"
                  theme="purple"
                  href="/login"
                >
                  {i18n.t("login.title")}
                </a>
              </div>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <Title
                theme="light"
                shadow={true}
                tag="h1"
                align="center"
                spacing="small"
                size="large"
              >
                {i18n.t("login.signup")}
              </Title>
              <Text
                textTransform=""
                tag="div"
                color={variable.white}
                align="center"
                weight="500"
                size="medium"
                spacing="smaller"
              >
                {i18n.t("login.signup.description")}
              </Text>

              {errorMessage ? (
                <div className="error">{errorMessage}</div>
              ) : null}

              <div className="formRow">
                <Input
                  name="email"
                  type="text"
                  placeholder={i18n.t("login.email")}
                  onKeyUp={(e) => this.setField(e)}
                />
              </div>

              <div className="formRow">
                <Input
                  name="password"
                  type="password"
                  placeholder="Password"
                  onKeyUp={(e) => this.setField(e)}
                />
              </div>
              <div className="formRow">
                <Input
                  name="username"
                  type="text"
                  placeholder="Display name"
                  onKeyUp={(e) => this.setField(e)}
                />
              </div>
              <div className="displayFlex">
                <div
                  className={
                    !AuthStore.mm_address
                      ? "formRowDisplayFlex disable-button"
                      : "formRowDisplayFlex"
                  }
                >
                  <a
                    className="button-borderRadius purple"
                    onClick={(e) => this.signUp(e)}
                    href="#"
                  >
                    <div className="removeTransform">
                      {i18n.t("login.signup")}
                    </div>
                  </a>
                </div>
                <div className="formRowDisplayFlex">
                  {!AuthStore.mm_address ? (
                    <a
                      onClick={(e) => this.connectMetaMask(e)}
                      href="#"
                      className="button-mm button-borderRadius orange"
                    >
                      <div className="removeTransform">
                        {i18n.t("login.connect.mm")}
                      </div>
                    </a>
                  ) : (
                    <Text
                      tag="div"
                      color={variable.green}
                      spacing="large"
                      weight="500"
                      size="medium"
                      spacing="smallest"
                    >
                      <div className="removeTransform">
                        <strong>{truncate(AuthStore.mm_address, 22)}</strong>
                      </div>
                    </Text>
                  )}
                </div>
              </div>
              {/* <FormRow>
              <Button
                onClick={(e) => this.signUp(e)}
                theme="purple"
                href="#"
                borderRadius
              >
                {i18n.t("login.signup")}
              </Button>
            </FormRow> */}
              <Social history={history} pool_code={this.state.pool_code} />
              {/* <FormRow>
              {!AuthStore.mm_address ? (
                <ButtonMM
                  onClick={(e) => this.connectMetaMask(e)}
                  theme="metamask"
                  href="#"
                  borderRadius
                >
                  {i18n.t("login.connect.mm")}
                </ButtonMM>
              ) : (
                <Text
                  tag="div"
                  color={variable.green}
                  spacing="large"
                  weight="500"
                  size="medium"
                  spacing="smallest"
                >
                  {i18n.t("login.connect.connected")} :{" "}
                  <strong>{truncate(AuthStore.mm_address, 22)}</strong>
                </Text>
              )}
            </FormRow>
            */}
              <div className="formRow">
                <div className="linkWrapper">
                  <a
                    onClick={(e) => this.props.history.push("/login")}
                    className="link signup-link"
                  >
                    {i18n.t("login.title")}
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

export default withTranslation()(SignUpContainer);
