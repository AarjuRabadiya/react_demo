import React from "react";
import styled from "styled-components";
import { withTranslation } from "react-i18next";
import { GoogleLogin } from "react-google-login";
import { inject, observer } from "mobx-react";
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";
import Loader from "react-loader-spinner";
import Modal from "react-modal";
import Google from "../assets/google.svg";
import Facebook from "../assets/facebook.svg";
import * as variable from "Base/Variables";
import "../../../app.scss";
import "./social.scss";
const customStyles = {
  overlay: {
    backgroundColor: "rgb(0 0 0 / 75%)",
  },
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

@inject("AuthStore")
@observer
class Social extends React.Component {
  constructor(props) {
    super();
    this.state = {
      isGoogleLoading: false,
      isFacebookLoading: false,
      isOpen: true,
      email: "",
      setFaceBookResponse: {},
      isModal: false,
    };
  }
  UNSAFE_componentWillMount() {
    Modal.setAppElement("body");
  }
  responseGoogle = (response) => {
    if (!response.error) {
      this.setState({
        isGoogleLoading: true,
      });
      if (response) {
        let payload = {
          data: response,
          type: "google",
          ...(this.props.pool_code !== "" && {
            pool_code: this.props.pool_code,
          }),
        };
        this.SocialLogin(payload);
      }
    } else {
      this.setState({
        isGoogleLoading: false,
      });
    }
  };
  responseFacebook = (response) => {
    if (!response.status) {
      this.setState({
        isFacebookLoading: true,
      });
      if (response) {
        let payload = {
          data: response,
          type: "facebook",
          ...(this.props.pool_code !== "" && {
            pool_code: this.props.pool_code,
          }),
        };
        if (payload.type === "facebook") {
          if (payload.data.email === undefined) {
            this.setState({
              isModal: true,
              setFaceBookResponse: payload.data,
            });
          } else {
            this.SocialLogin(payload);
          }
        } else {
          this.SocialLogin(payload);
        }
      }
    } else {
      this.setState({
        isFacebookLoading: false,
      });
    }
  };
  SocialLogin = (payload) => {
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
  openModal = () => {
    this.setState({
      isOpen: true,
    });
  };

  closeModal = () => {
    this.setState({
      isOpen: false,
      isFacebookLoading: false,
    });
  };
  onChange = (e) => {
    this.setState({
      email: e.target.value,
    });
  };
  onSubmit = () => {
    let { email, setFaceBookResponse } = this.state;
    if (email) {
      setFaceBookResponse["email"] = email;
      this.setState(
        {
          setFaceBookResponse,
          isOpen: false,
        },
        () => {
          let { setFaceBookResponse } = this.state;
          let payload = {
            data: setFaceBookResponse,
            type: "facebook",
          };
          this.SocialLogin(payload);
        }
      );
    }
  };
  render = () => {
    const { isGoogleLoading, isFacebookLoading, isModal, isOpen } = this.state;
    const { i18n } = this.props;
    return (
      <div className="socialLogin">
        {isModal && (
          <Modal
            isOpen={isOpen}
            onRequestClose={() => this.closeModal()}
            style={customStyles}
          >
            <div className="modalContainer">
              <div className="emailInput">
                <input
                  type="email"
                  placeholder="Please enter email"
                  onChange={(e) => this.onChange(e)}
                />
              </div>
              <div className="emailSubmit">
                <button
                  className="submit-button"
                  onClick={() => this.onSubmit()}
                >
                  Submit email
                </button>
              </div>
            </div>
          </Modal>
        )}
        <div className="social-text"> {i18n.t("login:signInWith")}</div>
        {isGoogleLoading ? (
          <Loader type="Oval" color="#CDD5DB" width="18" height="18" />
        ) : (
          <GoogleLogin
            // clientId={`${process.env.CLIENTID}`}
            clientId="877884316890-hvdtvvjthd8sh0ednld3l2ak0fisrnu3.apps.googleusercontent.com"
            buttonText="Login"
            onSuccess={this.responseGoogle}
            onFailure={this.responseGoogle}
            cookiePolicy={"single_host_origin"}
            render={(renderProps) => (
              <button
                className="social-button"
                onClick={renderProps.onClick}
                disabled={renderProps.isDisabled}
              >
                <img src={Google} alt="facebook" />
              </button>
            )}
          />
        )}
        {isFacebookLoading ? (
          <Loader type="Oval" color="#CDD5DB" width="18" height="18" />
        ) : (
          <FacebookLogin
            appId="786621485540466"
            // appId={`${process.env.APPID}`}
            fields="name,email,picture"
            callback={this.responseFacebook}
            render={(renderProps) => (
              <button
                className="social-button"
                onClick={renderProps.onClick}
                disabled={renderProps.isDisabled}
              >
                <img src={Facebook} alt="facebook" />
              </button>
            )}
          />
        )}
      </div>
    );
  };
}
const ModalContainer = styled.div`
  display: block;
  margin: 10px;
  width: 300px;
`;
const EmailInput = styled.div`
  margin: 10px;
  input {
    appearance: none;
    -webkit-appearance: none;
    outline: none;
    width: 100%;
    height: 40px;
    padding-left: 5px;
    border-radius: 10px;
    ::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }
    ::-webkit-outer-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }
    :focus {
      outline: none;
    }
    margin-bottom: 5px;
  }
`;
const EmailSubmit = styled.div`
  margin: 10px;
  display: flex;
  justify-content: center;
`;
const Submit = styled.button`
  height: 40px;
  border: none;
  background: ${variable.CheckboxBorder};
  color: ${variable.cancleButton};
  border: 2px solid ${variable.CheckboxBorder};
  font-weight: bold;
  border-radius: 0 10px;
  outline: none;
  width: 100%;
  cursor: pointer;
`;
const SocialLogin = styled.div`
  margin: 2rem;
  display: flex;
  align-items: center;
  text-align: center;
  justify-content: center;
  border-radius: 20px 0;
  // background: ${variable.transperentBlack};
  background: #0c06007a;
  transform: skewX(-25deg);
  position: relative;

  :after {
    content: "";
    display: inline-block;
    // padding-top:100%;
  }
  :before {
    content: "";
    position: absolute;
    z-index: -1;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    // background: linear-gradient(140deg, red, yellow, green),
    //   linear-gradient(#9c20aa, #fb3570);
    // background: linear-gradient(
    //   to right top,
    //   #0e5482,
    //   #004d7a,
    //   #008793,
    //   #3b9571,
    //   #00857f
    // );
    padding: 5px;
    border-radius: 20px 0;
    -webkit-mask: linear-gradient(#fff 0 0) content-box,
      linear-gradient(#fff 0 0);
    -webkit-mask-composite: destination-out;
    mask-composite: exclude;
  }
`;
const SocialButton = styled.button`
  padding: 0;
  // width: 70px;
  // height: 70px;
  width: 65px;
  height: 65px;
  background: 0 0;
  border: none;
  cursor: pointer;
  outline: none;
  transform: skewX(25deg);
`;
const SocialText = styled.span`
  font-size: ${variable.textLarge};
  padding: 10px;
  font-family: "erbaum", Open Sans, sans-serif;
  text-transform: uppercase;
  color: ${variable.white};
  transform: skewX(25deg);
`;

export default withTranslation()(Social);
