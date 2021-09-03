import { action, observable, autorun } from "mobx";
import { create, persist } from "mobx-persist";

class MiningStore {
  @persist("object") @observable user = {};
  @observable tokens = null;
  @observable defaultTokens = null;
  @observable selectionLimit = 9;
  @observable maximumSelected = false;
  @observable selectedNFT = [];
  @observable totalHashrate = 0;
  @observable selectedCategory = null;
  @observable selectedHashRate = null;
  /**
   * Set the State
   * @param name
   * @param state
   * @returns {*}
   */
  @action setState = (name, state) => {
    return (this[name] = state);
  };
  @action getDashboardStats = async (token) => {
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

    let response = await fetch(
      `${process.env.API_URL}/mining-dashboard`,
      settings
    );
    const json = await response.json();
    return json;
  };
  @action getAvailableNFTs = async (token) => {
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

    let response = await fetch(
      `${process.env.API_URL}/dashboard/allowed-nfts`,
      settings
    );
    const json = await response.json();
    return json;
  };
  /**
   * Add Selected NFT
   * @param token
   */
  @action addSelectedNFT = (token) => {
    this.setState("selectedNFT", [...this.selectedNFT, token._id.$oid]);
  };
  /**
   * Remove Selected NFT
   * @param token
   */
  @action removeSelectedNFT = (token) => {
    const filteredArr = this.selectedNFT.filter((e) => e !== token._id.$oid);
    this.setState("selectedNFT", filteredArr);
  };
  /**
   * Get the NFTs
   * @param token
   * @returns {Promise<any>}
   */
  @action get = async (token) => {
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

    let response = await fetch(
      `${process.env.API_URL}/dashboard/mining`,
      settings
    );
    const json = await response.json();
    return json;
  };
  @action getMixBalance = async (token) => {
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

    let response = await fetch(`${process.env.API_URL}/mix/balance`, settings);
    const json = await response.json();
    return json;
  };
  @action getBondlyBalance = async (token) => {
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

    let response = await fetch(
      `${process.env.API_URL}/bondly/balance`,
      settings
    );
    const json = await response.json();
    return json;
  };
  @action getCGGBalance = async (token) => {
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

    let response = await fetch(`${process.env.API_URL}/cgg/balance`, settings);
    const json = await response.json();
    return json;
  };
  /**
   * POST the checked NFTs
   * @param token
   * @param data
   * @returns {Promise<any>}
   */
  @action participate = async (
    token,
    data,
    quests,
    mining_type,
    pool_code,
    totalboost
  ) => {
    let participationData = {
      data: data,
      quests: quests,
      mining_type: mining_type,
      pool_code: pool_code,
      boost: totalboost,
    };

    const settings = {
      method: "POST",
      headers: {
        Accept: "application/json",
        Authorization: "Bearer " + token,
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "*",
      },
      mode: "cors",
      body: JSON.stringify(participationData),
    };

    let response = await fetch(
      `${process.env.API_URL}/dashboard/mining/participation`,
      settings
    );
    const json = await response.json();
    return json;
  };
  /**
   * Sync Users assets
   * @param data
   * @returns {Promise<any>}
   */
  @action syncAssets = async (token) => {
    const settings = {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: "Bearer " + token,
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "*",
      },
      mode: "cors",
    };

    let response = await fetch(
      `${process.env.API_URL}/dashboard/mining/syncassets`,
      settings
    );
    const json = await response.json();
    return json;
  };

  @action userPoolList = async (token, page) => {
    const settings = {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: "Bearer " + token,
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "*",
      },
      mode: "cors",
    };

    let response = await fetch(
      `${process.env.API_URL}/user/userPoolList?page=${page}`,
      settings
    );

    const json = await response.json();
    return json;
  };

  @action userPoolEnable = async (data, token) => {
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
      `${process.env.API_URL}/user/userPoolEnable`,
      settings
    );
    const json = await response.json();
    return json;
  };
  // @action groupList = async (data, token) => {
  //   const settings = {
  //     method: "POST",
  //     headers: {
  //       Accept: "application/json",
  //       Authorization: "Bearer " + token,
  //       "Access-Control-Allow-Origin": "*",
  //       mode: "cors",
  //       "Content-type": "application/json",
  //     },
  //     body: JSON.stringify(data),
  //   };

  //   let response = await fetch(
  //     `${process.env.API_URL}/user/grouplist`,
  //     settings
  //   );
  //   const json = await response.json();
  //   return json;
  // };
  @action joinPool = async (data, token) => {
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
      `${process.env.API_URL}/user/joinPool`,
      settings
    );
    const json = await response.json();
    return json;
  };
  @action changePoolDetail = async (data, token) => {
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
      `${process.env.API_URL}/user/poolUpdate`,
      settings
    );
    const json = await response.json();
    return json;
  };
  @action boostDetails = async (token) => {
    const settings = {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: "Bearer " + token,
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "*",
      },
      mode: "cors",
    };

    let response = await fetch(
      `${process.env.API_URL}/user/boostDetails`,
      settings
    );

    const json = await response.json();
    return json;
  };
  @action userPoolListMembar = async (page, data, token) => {
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
      `${process.env.API_URL}/user/userPoolListMembar?page=${page}`,
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
  };
  @action getPackageList = async (token) => {
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

    let response = await fetch(`${process.env.API_URL}/package/list`, settings);
    const json = await response.json();
    return json;
  };
  @action getMiningList = async (token) => {
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

    let response = await fetch(`${process.env.API_URL}/mining/list`, settings);
    const json = await response.json();
    return json;
  };
  @action miningLists = async (data, token, page) => {
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
    if (data.type === "land") {
      let response = await fetch(
        `${process.env.API_URL}/mining/lists?page=${page}`,
        settings
      );
      const json = await response.json();
      return json;
    } else {
      let response = await fetch(
        `${process.env.API_URL}/mining/lists`,
        settings
      );
      const json = await response.json();
      return json;
    }
  };
  @action startTeamMining = async (data, token) => {
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

    let response = await fetch(`${process.env.API_URL}/mining/start`, settings);
    const json = await response.json();
    return json;
  };
  @action stopMining = async (token) => {
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

    let response = await fetch(`${process.env.API_URL}/mining/stop`, settings);
    const json = await response.json();
    return json;
  };
  @action poolUpgradePackage = async (token) => {
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

    let response = await fetch(
      `${process.env.API_URL}/user/listAllPoolUpgradePackage`,
      settings
    );
    const json = await response.json();
    return json;
  };
  @action upgradePool = async (data, token) => {
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
      `${process.env.API_URL}/user/upgradePool`,
      settings
    );
    const json = await response.json();
    return json;
  };
}

const store = new MiningStore();

export default store;

const hydrate = create({
  storage: localStorage,
  jsonify: true,
});

hydrate("MiningStore", store);
