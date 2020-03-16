import dataStore from 'nedb-promise';

export class UserStore {
    constructor({ filename, autoload }) {
        this.store = dataStore({ filename, autoload });
    }

    async find(props) {
        return this.store.find(props);
    }

    async findOne(props) {
        return this.store.findOne(props);
    }

    async insert(user) {
        return this.store.insert(user);
    };

    async update(props, note) {
        return this.store.update(props, note);
    }

    async remove(props) {
        return this.store.remove(props);
    }

}

export default new UserStore({ filename: './db/users.json', autoload: true });
