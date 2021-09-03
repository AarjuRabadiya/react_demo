import { action, observable, autorun } from "mobx";
import { create, persist } from "mobx-persist";

class HistoryStore {
  @persist @observable token = false;
  @persist("object") @observable user = {};
  @observable clearActiveFilter = false;

  @action setState = (name, state) => {
    return (this[name] = state);
  };

  /**
   * Get the history
   * @param token
   * @param page
   * @returns {Promise<any>}
   */
  @action get = async (token, page = 1) => {
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
      `${process.env.API_URL}/dashboard/history?page=${page}`,
      settings
    );
    const json = await response.json();
    return json;
  };
}

const store = new HistoryStore();

export default store;

const hydrate = create({
  storage: localStorage,
  jsonify: true,
});

hydrate("HistoryStore", store);
