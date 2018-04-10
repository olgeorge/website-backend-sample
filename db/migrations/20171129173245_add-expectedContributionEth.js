const { TOKEN_SALE_SUBSCRIPTIONS_TABLE } = require('../../src/common/constants');

exports.up = function(knex, Promise) {
    return knex.schema.alterTable(TOKEN_SALE_SUBSCRIPTIONS_TABLE, t => {
        t.decimal("expectedContributionEth").defaultTo(0);
        t.string("firstName", 255).alter();
        t.string("lastName", 255).alter();
        t.string("birthDate", 255).alter();
        t.string("country", 255).alter();
        t.string("state", 255).alter();
        t.string("city", 255).alter();
        t.string("address", 255).alter();
        t.string("postalCode", 255).alter();
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.alterTable(TOKEN_SALE_SUBSCRIPTIONS_TABLE, t => {
        t.dropColumn("expectedContributionEth");
        t.string("firstName", 255).notNullable().alter();
        t.string("lastName", 255).notNullable().alter();
        t.string("birthDate", 255).notNullable().alter();
        t.string("country", 255).notNullable().alter();
        t.string("state", 255).notNullable().alter();
        t.string("city", 255).notNullable().alter();
        t.string("address", 255).notNullable().alter();
        t.string("postalCode", 255).notNullable().alter();
    });
};
