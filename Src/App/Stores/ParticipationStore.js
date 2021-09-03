import { action, observable, autorun } from "mobx";
import { create, persist } from "mobx-persist";

class ParticipationStore {
  @persist @observable token = false;
  @persist("object") @observable user = {};
  @observable clearActiveFilter = false;

  /**
   * Set the State
   * @param name
   * @param state
   * @returns {*}
   */
  @action setState = (name, state) => {
    return (this[name] = state);
  };

  /**
   * Get the Participation list
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
      `${process.env.API_URL}/dashboard/participation?page=${page}`,
      settings
    );
    const json = await response.json();
    return json;
  };
}

const store = new ParticipationStore();

export default store;

const hydrate = create({
  storage: localStorage,
  jsonify: true,
});

hydrate("ParticipationStore", store);
