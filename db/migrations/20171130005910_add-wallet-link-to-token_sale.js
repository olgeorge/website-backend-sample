const { TOKEN_SALE_SUBSCRIPTIONS_TABLE } = require('../../src/common/constants');

exports.up = function(knex, Promise) {
    return knex.schema.alterTable(TOKEN_SALE_SUBSCRIPTIONS_TABLE, t => {
        t.string("link", 255);
        t.string("wallet", 255);
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.alterTable(TOKEN_SALE_SUBSCRIPTIONS_TABLE, t => {
        t.dropColumn("link");
        t.dropColumn("wallet");
    });
};
