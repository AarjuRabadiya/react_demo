import React from "react";
import styled from "styled-components";
import { withTranslation } from "react-i18next";
import { media } from "Base/Media";
import { inject, observer } from "mobx-react";
import Loader from "react-loader-spinner";
import * as variable from "Base/Variables";
import Title from "Components/Typography/Title";
import Button from "Components/Buttons/Button";
import Input from "Components/Form/Input";
import BackgroundDiv from "../Login_Background";
import "./forgotpassword.scss";
import "../../../app.scss";

@inject("AuthStore")
@observer
class ForgotPassword extends React.Component {
  constructor(props) {
    super();
    this.state = {
      email: "",
      resMessage: "",
      isLoading: false,
    };
    this.flickerElement = null;
    this.lottie = null;
  }

  /**
   * Create some initial animations on the component did mount layer
   */
  componentDidMount() {
    // Logout on initial mount
    const { AuthStore } = this.props;
    AuthStore.logout();

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
  }
  setField = (e) => {
    if (e.key === "Enter") {
      this.signIn(e);
    }
    this.setState({ [e.target.name]: e.target.value });
  };
  forgotPassword = () => {
    const { AuthStore } = this.props;
    const { email } = this.state;
    this.setState({
      isLoading: true,
    });
    let payload = {
      email: email,
    };

    if (email !== "") {
      AuthStore.forgotPassword(payload).then((res) => {
        if (res.success === true) {
          this.setState({
            resMessage:
              "WE HAVE SENT YOU AN EMAIL WITH YOUR RESET PASSWORD LINK",
            email: "",
            isLoading: false,
          });
        } else {
          this.setState({
            resMessage: "SORRY, PLEASE TRY AGAIN!!",
            isLoading: false,
          });
        }
      });
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
      email: "",
      resMessage: "",
      isLoading: false,
    });
  };
  render = () => {
    const { i18n, history } = this.props;
    const { resMessage, isLoading } = this.state;
    return (
      <BackgroundDiv
        isLoadingFalse={() => this.props.isLoadingFalse()}
        isLoading={this.props.isLoading}
      >
        <div className="forgot-password">
          <Title
            theme="light"
            shadow={true}
            tag="h1"
            align="center"
            spacing="small"
            size="large"
          >
            Forgot password
          </Title>
          {isLoading ? (
            <div className="loader-container">
              <Loader type="Oval" color="#CDD5DB" width="50" height="50" />
            </div>
          ) : (
            <React.Fragment>
              {resMessage !== "" ? (
                <div className="response-message">
                  <div className="user-message">{resMessage}</div>
                </div>
              ) : (
                <div className="formRow">
                  <div className="user-message">
                    Enter your email address and we'll send you a link to reset
                    your password.
                  </div>
                </div>
              )}
              <div className="formRow">
                <Input
                  name="email"
                  type="text"
                  placeholder="Please enter email"
                  onKeyUp={(e) => this.setField(e)}
                />
              </div>
              <div className="display-flex">
                {/* <FormRowDisplayFlex> */}
                <a
                  className="button-borderRadius purple reset-button"
                  onClick={() => this.forgotPassword()}
                >
                  <div className="removeTransform"> Reset password</div>
                </a>
                {/* </FormRowDisplayFlex>
                <FormRowDisplayFlex> */}
                <a
                  onClick={() => this.redirect()}
                  href="#"
                  className="button-borderRadius green"
                >
                  <div className="removeTransform"> Back</div>
                </a>
                {/* </FormRowDisplayFlex> */}
              </div>
            </React.Fragment>
          )}
        </div>
      </BackgroundDiv>
    );
  };
}
const ButtonText = styled.span`
  transform: skewX(25deg);
`;
const FormRowDisplayFlex = styled.div`
  margin: 2rem;
  display: block;
  transform: skewX(-25deg);
  ${media.tablet`
  display: flex;
  width: calc(100% / 2 - 4rem);
  `};
  ${(props) =>
    props.disabled
      ? `
        opacity: 0.4;
    `
      : null}
`;
const DisplayFlex = styled.div`
  display: block;

  ${media.tablet`
  display: flex;
  width: 100%;
  `};
`;
const ResetButton = styled(Button)`
  font-size: ${variable.textSmaller};
  background: linear-gradient(310deg, #6727cf, #f064c1);

  ${media.tablet`
    // margin-top: ${variable.spacingSmall};
    font-size: ${variable.textMedium};
  `};
`;

const FormRow = styled.div`
  margin: ${variable.spacingSmaller};
`;

const ResponseMessage = styled.div`
  margin: ${variable.spacingSmaller};
  border: 2px solid;
  color: ${variable.forgetPassword};
`;

const UserMessage = styled.div`
  display: flex;
  text-align: center;
  font-size: ${variable.textLarger};
  margin: ${variable.spacingSmall};
  color: ${variable.white};
`;

const LoaderContainer = styled.div`
  display: flex;
  justify-content: center;
`;

export default withTranslation()(ForgotPassword);
