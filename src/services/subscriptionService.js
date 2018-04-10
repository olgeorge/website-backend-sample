const { Loggable } = require('../common/aspects');
const postbackService = require('./postbackService');
const subscriberDao = require('../dao/subscriberDao');
const mailchimpGateway = require('../gateways/mailchimpGateway');
const geoipGateway = require('../gateways/geoipGateway');
const urlParse = require('url-parse');

class SubscriptionService {

    @Loggable
    async subscribe({ email }) {
        await subscriberDao.save({ email });
        await mailchimpGateway.subscribe({ email });
    }

    @Loggable
    async subscribeTokenSale({
        email,
        firstName,
        lastName,
        birthDate,
        country,
        state,
        city,
        address,
        postalCode,
        expectedContributionEth = 0,
        wallet,
        link,
        sourceIp,
    }) {
        const { countryCode } = geoipGateway.getGeoDataForIp(sourceIp);
        const { clickid, affid } = urlParse(link, true).query || {};
        await subscriberDao.saveTokenSale({
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
        });
        await postbackService.executeCallbackFor({ clickid, affid });
        await mailchimpGateway.subscribeTokenSale({ email, expectedContributionEth });
    }
}

module.exports = new SubscriptionService();
