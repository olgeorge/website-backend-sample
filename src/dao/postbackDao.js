const { Loggable } = require('../common/aspects');
const knexClient = require('../clients/knexClient');
const { TOKEN_SALE_POSTBACKS_TABLE } = require('../common/constants');

class SubscriberDao {

    @Loggable
    async get({ affid }) {
        const items = await knexClient(async knex => {
            return knex.select('url').from(TOKEN_SALE_POSTBACKS_TABLE).where('affid', '=', affid);
        });
        return items[0] || {};
    };
}


module.exports = new SubscriberDao();
