const { TOKEN_SALE_SUBSCRIPTIONS_TABLE, TOKEN_SALE_POSTBACKS_TABLE } = require('../../src/common/constants');
const { setCommonTableProperties } = require('./20171127222302_init_database');

exports.up = function(knex, Promise) {
    return knex.schema.alterTable(TOKEN_SALE_SUBSCRIPTIONS_TABLE, t => {
        t.string("clickid", 255);
        t.string("affid", 255);
    }).then(() => {
        return knex.schema.createTable(TOKEN_SALE_POSTBACKS_TABLE, t => {
            setCommonTableProperties(t);
            t.bigIncrements();
            t.string("affid", 255).notNullable();
            t.string("url", 255).notNullable();
        });
    })
};

exports.down = function(knex, Promise) {
    return knex.schema.alterTable(TOKEN_SALE_SUBSCRIPTIONS_TABLE, t => {
        t.dropColumn("clickid");
        t.dropColumn("affid");
    }).then(() => {
        return knex.schema.dropTable(TOKEN_SALE_POSTBACKS_TABLE);
    });
};
