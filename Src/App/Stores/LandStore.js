import { action, observable, autorun } from "mobx";
import { create, persist } from "mobx-persist";

class LandStore {
  @persist @observable token = false;
  @action getLandDetails = async (data, token) => {
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
      `${process.env.API_URL}/user/land/details`,
      settings
    );
    const json = await response.json();
    return json;
  };
  @action editLandDetails = async (data, token) => {
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
      `${process.env.API_URL}/user/edit/land/details`,
      settings
    );
    const json = await response.json();
    return json;
  };
}
const store = new LandStore();

export default store;

const hydrate = create({
  storage: localStorage,
  jsonify: true,
});

hydrate("LandStore", store);
