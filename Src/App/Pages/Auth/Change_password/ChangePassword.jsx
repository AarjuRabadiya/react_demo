import React from "react";
import styled from "styled-components";
import { withTranslation } from "react-i18next";
import { media } from "Base/Media";
import { inject, observer } from "mobx-react";
import * as variable from "Base/Variables";
import Title from "Components/Typography/Title";
import Button from "Components/Buttons/Button";
import Input from "Components/Form/Input";
import BackgroundDiv from "../Login_Background";
import "../../../app.scss";
import "../ForgotPassword/forgotpassword.scss";

@inject("AuthStore")
@observer
class ChangePassword extends React.Component {
  constructor(props) {
    super();
    this.state = {
      errorMessage: "",
      password: "",
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
  confirmPassword = () => {
    const { password } = this.state;
    const { history, AuthStore } = this.props;
    let url = history.location.pathname;

    let token = history.location.pathname.substring(
      history.location.pathname.lastIndexOf("/") + 1
    );
    let payload = {
      resetToken: token,
      password: password,
    };
    if (password !== "") {
      AuthStore.resetPassword(payload).then((res) => {
        if (res.success === true) {
          history.push("/login");
        } else {
          this.setState({
            errorMessage: res.msg,
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
      errorMessage: "",
      password: "",
    });
  };
  render = () => {
    const { i18n } = this.props;
    const { errorMessage } = this.state;
    return (
      <BackgroundDiv
        isLoadingFalse={() => this.props.isLoadingFalse()}
        isLoading={this.props.isLoading}
      >
        <div className="change-password">
          <Title
            theme="light"
            shadow={true}
            tag="h1"
            align="center"
            spacing="small"
            size="large"
          >
            CONFIRM PASSWORD
          </Title>
          <div className="formRow">
            <div className="user-message">Enter your new password below</div>
          </div>
          {errorMessage !== "" && (
            <div className="response-message">
              <div className="user-message">{errorMessage}</div>
            </div>
          )}
          <div className="formRow">
            <Input
              name="password"
              type="password"
              placeholder="Please enter new password"
              onKeyUp={(e) => this.setField(e)}
            />
          </div>
          <div className="display-flex">
            <a
              className="reset-button purple button-borderRadius"
              theme=""
              onClick={() => this.confirmPassword()}
            >
              <div className="removeTransform"> Confirm password</div>
            </a>

            <a
              className="button-borderRadius green"
              onClick={() => this.redirect()}
              href="#"
            >
              <div className="removeTransform"> Back</div>
            </a>
          </div>
        </div>
      </BackgroundDiv>
    );
  };
}

const ResetButton = styled(Button)`
  font-size: ${variable.textSmaller};
  background: linear-gradient(310deg, #6727cf, #f064c1);

  ${media.tablet`
    margin-top: ${variable.spacingSmall};
    font-size: ${variable.textMedium};
  `};
`;

const FormRow = styled.div`
  margin: ${variable.spacingSmaller};
`;
const UserMessage = styled.div`
  display: flex;
  text-align: center;
  font-size: ${variable.textLarger};
  margin: ${variable.spacingSmall};
  color: ${variable.white};
`;

const ResponseMessage = styled.div`
  margin: ${variable.spacingSmaller};
  border: 2px solid;
  color: ${variable.forgetPassword};
`;

export default withTranslation()(ChangePassword);
