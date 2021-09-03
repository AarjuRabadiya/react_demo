import { action, observable, autorun } from 'mobx';
import { create, persist } from 'mobx-persist';

class BalanceStore {
    @persist @observable token = false;
    @persist('object') @observable user = {};

    @action setState = (name, state) => {
        return this[name] = state;
    };

    /**
     * Get the balance
     * @param token
     * @param page
     * @returns {Promise<any>}
     */
    @action get = async (token, page = 1) => {
        const settings = {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + token,
                'Access-Control-Allow-Origin': '*',
                mode: 'cors',
            },
            body: null
        };

        let response = await fetch(`${process.env.API_URL}/dashboard/balance?page=${page}`, settings);
        const json = await response.json();
        return json;
    };
}

const store = new BalanceStore();

export default store;

const hydrate = create({
    storage: localStorage,
    jsonify: true
});


hydrate('BalanceStore', store);
