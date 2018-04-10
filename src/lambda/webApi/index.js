const buildLambdaApi = require('../../builders/buildLambdaApi');
const subscriptionService = require('../../services/subscriptionService');
const { Loggable } = require('../../common/aspects');

class Lambda {

    @Loggable
    async subscribe({
        email,
    }) {
        return subscriptionService.subscribe({
            email,
        });
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
        expectedContributionEth,
        wallet,
        link,
    }, {
        sourceIp,
    }) {
        return subscriptionService.subscribeTokenSale({
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
        });
    }
}

module.exports = buildLambdaApi(new Lambda())
    .post('/subscriptions', (lambda, request) => lambda.subscribe(request.body))
    .post('/subscriptions/token-sale', (lambda, request) => lambda.subscribeTokenSale(request.body, request.context));
