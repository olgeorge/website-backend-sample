const yaml = require('js-yaml');
const fs = require('fs');

const {
    SUBSCRIPTIONS_TABLE,
} = require('../../src/common/constants');

exports.setCommonTableProperties = table => {
    table.engine("InnoDB");
    table.charset("utf8mb4");
    table.collate("utf8mb4_unicode_ci");
};

createSubscriptionsTable = knex => {
    return knex.schema.createTable(SUBSCRIPTIONS_TABLE, t => {
        exports.setCommonTableProperties(t);
        t.bigIncrements();
        t.timestamps(true, true);
        t.string("email", 255).notNullable();
    });
};

deleteSubscriptionsTable = knex => {
    return knex.schema.dropTable(SUBSCRIPTIONS_TABLE);
};

exports.up = function (knex, Promise) {
    return createSubscriptionsTable(knex);
};

exports.down = function (knex, Promise) {
    return deleteSubscriptionsTable(knex);
};
