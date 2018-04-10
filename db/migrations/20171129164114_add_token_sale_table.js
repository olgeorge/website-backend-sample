const { TOKEN_SALE_SUBSCRIPTIONS_TABLE } = require('../../src/common/constants');
const { setCommonTableProperties } = require('./20171127222302_init_database');

exports.up = function(knex, Promise) {
    return knex.schema.createTable(TOKEN_SALE_SUBSCRIPTIONS_TABLE, t => {
        setCommonTableProperties(t);
        t.bigIncrements();
        t.timestamps(true, true);
        t.string("email", 255).notNullable();
        t.string("firstName", 255).notNullable();
        t.string("lastName", 255).notNullable();
        t.string("birthDate", 255).notNullable();
        t.string("country", 255).notNullable();
        t.string("state", 255).notNullable();
        t.string("city", 255).notNullable();
        t.string("address", 255).notNullable();
        t.string("postalCode", 255).notNullable();
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable(TOKEN_SALE_SUBSCRIPTIONS_TABLE);
};
