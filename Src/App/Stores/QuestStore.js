import { action, observable, autorun } from "mobx";
import { create, persist } from "mobx-persist";

class QuestStore {
  @persist("object") @observable quests = {};
  @observable selectedQuests = [];
  @observable totalBoost = 1;
  @observable completedQuests = [];

  /**
   * Set the State
   * @param name
   * @param state
   * @returns {*}
   */
  @action setState = (name, state) => {
    return (this[name] = state);
  };

  @action addQuest = (quest) => {
    return this.selectedQuests.push(quest);
  };

  @action removeQuest = (key) => {
    return this.selectedQuests.splice(key, 1);
  };

  /**
   * Get User Available Quests
   * @param token
   * @returns {Promise<any>}
   */
  @action getQuests = async (token) => {
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
      `${process.env.API_URL}/dashboard/quests`,
      settings
    );
    const json = await response.json();
    return json;
  };

  /**
   * Get User Available Quests
   * @param token
   * @returns {Promise<any>}
   */
  @action getCompletedQuests = async (token) => {
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
      `${process.env.API_URL}/dashboard/quests/completed`,
      settings
    );
    const json = await response.json();
    return json;
  };
}

const store = new QuestStore();

export default store;

const hydrate = create({
  storage: localStorage,
  jsonify: true,
});

hydrate("QuestStore", store);
