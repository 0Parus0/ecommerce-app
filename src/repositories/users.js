const util = require('util');
const crypto = require('crypto');
const Repository = require('./repository');

const scrypt = util.promisify(crypto.scrypt);

class UsersRepository extends Repository {
    async create(attrs) {
        // assuming attrs === {email: 'somestring', password: 'somestringtoo'}

        attrs.id = this.randomId();
        const salt = crypto.randomBytes(8).toString('hex');
        const hashedBuff = await scrypt(attrs.password, salt, 64);
        const records = await this.getAll();
        const record = {
            ...attrs,
            password: `${hashedBuff.toString('hex')}.${salt}`,
        };
        records.push(record);

        await this.writeAll(records);
        return record;
    }

    // eslint-disable-next-line class-methods-use-this
    async comparePasswords(saved, supplied) {
        // Saved => password saved in our database as string in hex. 'hashed.salt'
        // Supplied => password given to us by a user trying sign in
        const [hashed, salt] = saved.split('.');
        // scrypt returns a buffer
        const hashedSuppliedBuff = await scrypt(supplied, salt, 64);

        return hashed === hashedSuppliedBuff.toString('hex');
    }
}

module.exports = new UsersRepository('users.json');
