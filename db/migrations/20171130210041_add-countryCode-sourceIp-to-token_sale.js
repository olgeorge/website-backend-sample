const { TOKEN_SALE_SUBSCRIPTIONS_TABLE } = require('../../src/common/constants');

exports.up = function(knex, Promise) {
    return knex.schema.alterTable(TOKEN_SALE_SUBSCRIPTIONS_TABLE, t => {
        t.string("sourceIp", 255);
        t.string("countryCode", 255);
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.alterTable(TOKEN_SALE_SUBSCRIPTIONS_TABLE, t => {
        t.dropColumn("sourceIp");
        t.dropColumn("countryCode");
    });
};
