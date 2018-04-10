// The mysql module is loaded dynamically by knex and is not detected by serverless-webpack
// This forces it to include the module in the bundle
require('mysql');
const Knex = require('knex');

const config = {
    client: 'mysql',
    connection: {
        database: process.env.DB_NAME,
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        timezone: "UTC",
        charset: 'utf8',
    },
    pool: {
        min: 0,
        max: 1,
    }
};

console.log(`process.env.DB_NAME ${process.env.DB_NAME}`);
console.log(`process.env.DB_HOST ${process.env.DB_HOST}`);
console.log(`process.env.DB_USER ${process.env.DB_USER}`);

/*
 * It's best to create a new connection for every request
 * https://forums.aws.amazon.com/thread.jspa?threadID=216000
 */
module.exports = async (callback) => {
    const knex = Knex(config);
    try {
        return await callback(knex);
    } finally {
        await knex.destroy();
    }
};
