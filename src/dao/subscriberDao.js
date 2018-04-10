const { Loggable } = require('../common/aspects');
const knexClient = require('../clients/knexClient');

const { SUBSCRIPTIONS_TABLE, TOKEN_SALE_SUBSCRIPTIONS_TABLE } = require('../common/constants');

class SubscriberDao {

    @Loggable
    async save({ email }) {
        const subscription = {
            email,
        };
        await knexClient(async knex => {
            return knex(SUBSCRIPTIONS_TABLE).insert(subscription);
        });
    };

    @Loggable
    async saveTokenSale({
        email,
        firstName,
        lastName,
        birthDate,
        country,
        state,
        city,
        address,
        postalCode,
        expectedContributionEth,
        wallet,
        link,
        sourceIp,
        countryCode,
        clickid,
        affid,
    }) {
        const subscription = {
            email,
            firstName,
            lastName,
            birthDate,
            country,
            state,
            city,
            address,
            postalCode,
            expectedContributionEth,
            wallet,
            link,
            sourceIp,
            countryCode,
            clickid,
            affid,
        };
        await knexClient(async knex => {
            return knex(TOKEN_SALE_SUBSCRIPTIONS_TABLE).insert(subscription);
        });
    };
}

module.exports = new SubscriberDao();
