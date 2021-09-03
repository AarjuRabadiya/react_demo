import React from "react";
import { inject, observer } from "mobx-react";
import { withTranslation } from "react-i18next";
import { GoogleLogin } from "react-google-login";
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";
import Loader from "react-loader-spinner";
import Modal from "react-modal";
import Layout from "Components/Layout/Layout";
import UserTable from "./UserTable";
// import Button from "Components/Buttons/Button";
import Google from "./assets/google.svg";
import Facebook from "./assets/facebook.svg";
import "./profile.scss";
import "../../../app.scss";
import "../../../main.scss";

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
@inject("AuthStore", "MiningStore")
@observer
class Profile extends React.Component {
  constructor(props) {
    super();

    this.state = {
      mm_address: null,
      alert: false,
      isGoogleLoading: false,
      isFacebookLoading: false,
      email: "",
      facebook_id: null,
      google_id: null,
      boost: "",
      boostErrorMessage: false,
      isLoading: false,
      userDetail: {},
      dataLoading: true,
      isModal: false,
    };
  }

  componentDidMount() {
    const { AuthStore } = this.props;

    // this.props.loadBg("balance");
    this.props.isLoadingFalse();
    this.getUserDetail();
    this.setState({
      mm_address: AuthStore.mm_address,
      facebook_id: AuthStore.facebook_id,
      google_id: AuthStore.google_id,
    });
  }

  UNSAFE_componentWillMount() {
    Modal.setAppElement("body");
  }
  getUserDetail = () => {
    this.setState({
      dataLoading: true,
    });
    const { AuthStore } = this.props;
    AuthStore.loginUserWithToken(AuthStore.token).then((res) => {
      this.setState({
        userDetail: res.user,
        dataLoading: false,
      });
    });
  };
  connectMetaMask = (e) => {
    // e.preventDefault();
    const { AuthStore } = this.props;
    // let token = AuthStore.token;
    // Retrieve the MetaMask Address from the user

    AuthStore.retrieveMetaMaskAddress().then((res) => {
      console.log(res);
      if (res.address) {
        let payload = {
          mm_address: res.address,
        };

        AuthStore.editUser(payload, AuthStore.token).then(async (response) => {
          const json = await response.json();
          if (response.status === 200) {
            AuthStore.setState("mm_address", json.mm_address);
            this.setState({
              mm_address: json.address,
            });
            this.getUserDetail();
            if (json.error) {
              this.setState({
                alert: true,
                alertmess: json.error,
              });
            }
          } else {
            this.setState({
              alert: true,
              alertmess: json[0],
            });
          }
          if (json.error) {
            this.setState({
              alert: true,
              alertmess: json.error,
            });
          }
        });
      } else {
        this.setState({
          alert: true,
          alertmess: res.error,
        });
      }
    });
  };
  handleAlertClose = () => {
    this.setState({
      alertmess: "",
      alert: false,
    });
  };
  responseGoogle = (response) => {
    if (!response.error) {
      this.setState({
        isGoogleLoading: true,
      });

      if (response) {
        let payload = { data: response, type: "google" };
        this.SocialLogin(payload);
      }
    }
  };
  responseFacebook = (response) => {
    if (!response.status) {
      this.setState({
        isFacebookLoading: true,
      });
      if (response) {
        let payload = { data: response, type: "facebook" };
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
    }
  };
  SocialLogin = (payload) => {
    // console.log(payload);
    const { AuthStore } = this.props;
    AuthStore.editUser(payload, AuthStore.token).then(async (response) => {
      if (response.status === 200) {
        const json = await response.json();
        this.setState({
          isGoogleLoading: false,
          isFacebookLoading: false,
        });
        if (json.google_id) {
          AuthStore.setState("google_id", json.google_id);
          this.setState({
            google_id: json.google_id,
          });
          this.getUserDetail();
        }
        if (json.facebook_id) {
          AuthStore.setState("facebook_id", json.facebook_id);
          this.setState({
            facebook_id: json.facebook_id,
          });
          this.getUserDetail();
        }
        if (json.error) {
          this.setState({
            alert: true,
            alertmess: json.error,
          });
        }
      }
    });
  };
  closeModal = () => {
    this.setState({
      isModal: false,
    });
  };
  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
      boostErrorMessage: false,
    });
  };
  onSubmit = () => {
    let { email, setFaceBookResponse } = this.state;
    if (email) {
      setFaceBookResponse["email"] = email;
      this.setState(
        {
          setFaceBookResponse,
          isModal: false,
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
    let {
      isGoogleLoading,
      isFacebookLoading,
      mm_address,
      facebook_id,
      google_id,
      isModal,
      // boost,
      // boostErrorMessage,
      // isLoading,
      userDetail,
      dataLoading,
    } = this.state;
    // console.log(isModal);
    const { i18n } = this.props;
    let mm_title = i18n.t("login.connect.mm")
      ? i18n.t("login.connect.mm")
      : null;

    return (
      <React.Fragment>
        {isModal && (
          <Modal
            isOpen={isModal}
            onRequestClose={() => this.closeModal()}
            style={customStyles}
          >
            <div className="modal-container">
              <div className="modal-input">
                <input
                  type="email"
                  placeholder="Please enter email"
                  name="email"
                  onChange={(e) => this.onChange(e)}
                />
              </div>
              <div className="modal-button">
                <div className="submit-button" onClick={() => this.onSubmit()}>
                  Submit email
                </div>
              </div>
            </div>
          </Modal>
        )}
        <Layout title="profile">
          {this.state.alert && (
            <div className="main-alert-div">
              <div className="alert">
                <div className="message">
                  <b>{this.state.alertmess}</b>
                </div>
                <div className="close" onClick={() => this.handleAlertClose()}>
                  ×
                </div>
              </div>
            </div>
          )}

          <div className="profile">
            {/* {mm_address === null && ( */}
            <div className="profileButton">
              {/* <div
                className=""
                onClick={(e) => this.connectMetaMask(e)}
              > */}
              {/* <SocialBackground> */}
              <button
                className="socialLink metaMask button-borderRadius"
                onClick={(e) => this.connectMetaMask(e)}
              >
                <div className="removeTransform">{mm_title}</div>
              </button>
              {/* </SocialBackground> */}
              {/* </div> */}
            </div>
            {/* )} */}
            {google_id === null && (
              <div className="profileButton">
                <div className="socialLink google">
                  {/* <SocialBackground> */}
                  {isGoogleLoading ? (
                    <Loader
                      type="Oval"
                      color="#CDD5DB"
                      width="18"
                      height="18"
                    />
                  ) : (
                    <GoogleLogin
                      // clientId={`${process.env.CLIENTID}`}
                      clientId="877884316890-hvdtvvjthd8sh0ednld3l2ak0fisrnu3.apps.googleusercontent.com"
                      buttonText="Login"
                      onSuccess={this.responseGoogle}
                      onFailure={this.responseGoogle}
                      cookiePolicy={"single_host_origin"}
                      render={(renderProps) => (
                        // <SocialBackground onClick={renderProps.onClick}>
                        <div
                          className="google-login"
                          onClick={renderProps.onClick}
                        >
                          <div className="socialText blackFont">
                            SIGN IN WITH
                          </div>
                          <button
                            className="socialButton"
                            disabled={renderProps.isDisabled}
                          >
                            <img src={Google} alt="facebook" />
                          </button>
                        </div>
                        // </SocialBackground>
                      )}
                    />
                  )}
                  {/* </SocialBackground> */}
                </div>
              </div>
            )}
            {facebook_id === null && (
              <div className="profileButton">
                <div className="socialLink facebook">
                  {/* <SocialBackground> */}
                  {isFacebookLoading ? (
                    <Loader
                      type="Oval"
                      color="#CDD5DB"
                      width="18"
                      height="18"
                    />
                  ) : (
                    <FacebookLogin
                      // appId={`${process.env.APPID}`}
                      appId="786621485540466"
                      fields="name,email,picture"
                      callback={this.responseFacebook}
                      render={(renderProps) => (
                        <div
                          className="face-book-login"
                          onClick={renderProps.onClick}
                        >
                          {/* <SocialBackground onClick={renderProps.onClick}> */}
                          <div className="socialText">SIGN IN WITH</div>
                          <button
                            className="socialButton"
                            disabled={renderProps.isDisabled}
                          >
                            <img src={Facebook} alt="facebook" />
                          </button>
                          {/* </SocialBackground> */}
                        </div>
                      )}
                    />
                  )}
                  {/* </SocialBackground> */}
                </div>
              </div>
            )}

            {userDetail && userDetail !== 0 && (
              <div className="panel-wrapper">
                <div className="panel">
                  <div className="panel-inner">
                    <div className="panel-sub-inner">
                      <UserTable
                        data={userDetail}
                        dataLoading={dataLoading}
                      ></UserTable>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </Layout>
      </React.Fragment>
    );
  };
}

export default withTranslation()(Profile);
