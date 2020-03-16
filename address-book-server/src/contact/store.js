import dataStore from 'nedb-promise';

export class ContactStore {
    constructor({ filename, autoload }) {
        this.store = dataStore({ filename, autoload });
    }

    async find(props) {
        return this.store.find(props);
    }

    async findOne(props) {
        return this.store.findOne(props);
    }

    async insert(contact) {
        let contactName = contact.firstName;
        if (!contactName) { // validation
            throw new Error('Missing contact first Name property')
        }
        // let findUser = await this.findOne({ email: contact.email });
        // if (findUser) {
        //     throw new Error('This email already exists!')
        // }
        return this.store.insert(contact);
    };

    async update(props, contact) {
        return this.store.update(props, contact);
    }

    async remove(props) {
        return this.store.remove(props);
    }
}

export default new ContactStore({ filename: './db/contact.json', autoload: true });
