import { action, observable, autorun } from "mobx";
import { create, persist } from "mobx-persist";
import Web3 from "web3";

class AuthStore {
  @persist @observable token = false;
  @persist("object") @observable user = {};
  @persist @observable name = null;
  @persist("object") @observable userPool = {};
  @persist @observable email = null;
  @persist @observable mm_address = null;
  @persist @observable google_id = null;
  @persist @observable facebook_id = null;
  @persist @observable user_boost = null;
  @observable cloudminingPool = [];

  @action setState = (name, state) => {
    return (this[name] = state);
  };

  /**
   *
   * @param email
   * @returns {Promise<any>}
   */
  @action signUp = async (data) => {
    const settings = {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(data),
    };

    let response = await fetch(`${process.env.API_URL}/user/signup`, settings);
    const json = await response.json();
    // console.log(json);
    return json;
  };
  @action forgotPassword = async (data) => {
    const settings = {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(data),
    };

    let response = await fetch(
      `${process.env.API_URL}/user/password/forgot`,
      settings
    );
    const json = await response.json();

    return json;
  };

  @action resetPassword = async (data) => {
    const settings = {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(data),
    };

    let response = await fetch(
      `${process.env.API_URL}/user/password/reset`,
      settings
    );
    const json = await response.json();

    return json;
  };
  /**
   *
   * @param email
   * @returns {Promise<any>}
   */
  @action safenameExists = async (email) => {
    const settings = {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
        mode: "cors",
      },
      body: null,
    };

    let response = await fetch(
      `${process.env.API_URL}/user/safenameexists?username=${email}`,
      settings
    );
    const json = await response.json();
    return json;
  };

  /**
   *
   * @param email
   * @returns {Promise<any>}
   */
  @action emailExists = async (email) => {
    const settings = {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
        mode: "cors",
      },
      body: null,
    };

    let response = await fetch(
      `${process.env.API_URL}/user/emailexists?email=${email}`,
      settings
    );
    const json = await response.json();
    // console.log(json);
    return json;
  };

  /**
   * Logout
   */
  @action logout = () => {
    this.setState("user", false);
    this.setState("token", false);
    this.setState("email", null);
    this.setState("name", null);
    this.setState("userPool", {});
    this.setState("mm_address", null);
    this.setState("google_id", null);
    this.setState("facebook_id", null);
    this.setState("user_boost", null);
    this.setState("cloudminingPool", []);
  };

  /**
   * Login via token
   * @param token
   * @returns {Promise<any>}
   */
  @action loginUserWithToken = async (token) => {
    const settings = {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: "Bearer " + token,
        "Access-Control-Allow-Origin": "*",
        mode: "cors",
      },
      body: null,
    };

    let response = await fetch(`${process.env.API_URL}/user`, settings);
    const json = await response.json();
    // console.log(json);
    return json;
  };

  /**
   * Login (user & password)
   * @param data
   * @returns {Promise<any>}
   */
  @action login = async (data) => {
    const settings = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(data),
    };

    let response = await fetch(`${process.env.API_URL}/login`, settings);
    const json = await response.json();
    return json;
  };
  @action googleLogin = async (googleResponse) => {
    // console.log(googleResponse);

    const settings = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(googleResponse),
    };

    let response = await fetch(
      `${process.env.API_URL}/auth/callback`,
      settings
    );
    const json = await response.json();
    return json;
  };
  /**
   * GetAddress
   * @returns {Promise<unknown>}
   */
  @action getAddress = async () => {
    return new Promise((resolve, reject) => {
      window.web3.eth.getAccounts().then((accounts) => {
        if (accounts.length <= 0) {
          return resolve(null);
        }
        resolve(accounts[0]);
      });
    });
  };

  /**
   * Get NetworkId
   * @returns {Promise<unknown>}
   */
  @action getNetworkId = async () => {
    return new Promise((resolve, reject) => {
      window.web3.eth.net.getId().then((netId) => {
        if (netId == 1) return resolve(netId);
        else return reject("Please connect MetaMask to the Main Network");
      });
    });
  };

  /**
   * Init the Web3
   * @returns {Promise<unknown>}
   */
  @action initWeb3 = async () => {
    return new Promise((resolve, reject) => {
      if (window.ethereum) {
        window.web3 = new Web3(ethereum);
      } else if (window.web3) {
        window.web3 = new Web3(web3.currentProvider);
      } else {
        return reject("Please install MetaMask");
      }

      try {
        window.localStorage;
      } catch (e) {
        return reject("Please allow 3rd party cookies for web3.js 1.0.0");
      }

      resolve();
    });
  };
  @action editUser = async (data, token) => {
    const settings = {
      method: "POST",
      headers: {
        Accept: "application/json",
        Authorization: "Bearer " + token,
        "Access-Control-Allow-Origin": "*",
        mode: "cors",
        "Content-type": "application/json",
      },
      body: JSON.stringify(data),
    };

    let response = await fetch(`${process.env.API_URL}/user/edit`, settings);

    // const json = await response.json();
    // console.log(json);
    return response;
  };
  @action retrieveMetaMaskAddress = async () => {
    try {
      await this.initWeb3();

      if (window.ethereum) {
        await ethereum.enable();
      }

      let address = await this.getAddress();
      if (address === null) {
        throw "Please unlock MetaMask account";
      }

      return { address: address };
    } catch (e) {
      let error = [];
      error["error"] = e;
      return error;
    }
  };

  /**
   * Login Via MetaMask
   * @returns {Promise<any>}
   */
  @action loginMetaMask = async () => {
    try {
      await this.initWeb3();

      if (window.ethereum) {
        await ethereum.enable();
      }

      let networkId = await this.getNetworkId();
      let address = await this.getAddress();

      if (address === null) {
        throw "Please unlock MetaMask account";
      }

      let signSignature = await this.getSignature(address, "login");

      const settings = {
        method: "GET",
        headers: {
          Accept: "application/json",
        },
      };

      let response = await fetch(
        `${process.env.BASE_URL}/mmauth/${signSignature}/${address}`,
        settings
      );
      const json = await response.json();
      return json;
    } catch (e) {
      let error = [];
      error["error"] = e;
      return error;
    }
  };

  @action getSignature = async (address, type) => {
    try {
      var msgString =
        type === "login"
          ? "Logging into ChainGuardians"
          : "Signing up to ChainGuardians";
      return new Promise((resolve, reject) => {
        window.web3.eth.personal.sign(msgString, address).then((signature) => {
          // if (err)
          //   return reject("Signature error");
          // else
          return resolve(signature);
        });
      });
    } catch (e) {
      this.message = e;
    }
  };

  @action getAssets = async (data, url) => {
    const settings = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
        mode: "cors",
        "Content-type": "application/json",
      },
      body: JSON.stringify(data),
    };

    let response = await fetch(
      `${process.env.API_URL}/dashboard/assetList`,
      settings
    );
    const json = await response.json();
    return json;
  };
  @action assetTableList = async (data, url) => {
    const settings = {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    };

    let response = await fetch(
      `${process.env.API_URL}/dashboard/assetTableList`,
      settings
    );
    const json = await response.json();
    return json;
  };
  @action assetDetail = async (data, url) => {
    const settings = {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    };

    let response = await fetch(
      `${process.env.API_URL}/assetList/${data.table_id}/${data.id}`,
      settings
    );
    const json = await response.json();
    return json;
  };
  @action loginWithSelectedOption = async (data) => {
    const settings = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
        mode: "cors",
        "Content-type": "application/json",
      },
      body: JSON.stringify(data),
    };

    let response = await fetch(
      `${process.env.API_URL}/usertoaddress`,
      settings
    );
    const json = await response.json();
    return json;
  };
  @action addBoost = async (data, token) => {
    const settings = {
      method: "POST",
      headers: {
        Accept: "application/json",
        Authorization: "Bearer " + token,
        "Access-Control-Allow-Origin": "*",
        mode: "cors",
        "Content-type": "application/json",
      },
      body: JSON.stringify(data),
    };

    let response = await fetch(
      `${process.env.API_URL}/user/addBoost`,
      settings
    );
    const json = await response.json();
    return json;
    // return response;
  };
}

const store = new AuthStore();

export default store;

const hydrate = create({
  storage: localStorage,
  jsonify: true,
});

hydrate("AuthStore", store);
