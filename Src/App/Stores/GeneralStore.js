import { action, observable, autorun } from 'mobx';
import { create, persist } from 'mobx-persist';
import {inject, observer} from "mobx-react";

class GeneralStore {
    @persist @observable hasMenuLoaded = false;

    @action setState = (name, state) => {
        return this[name] = state;
    };
}

const store = new GeneralStore();

export default store;

const hydrate = create({
    storage: localStorage,
    jsonify: true
});


hydrate('GeneralStore', store);
