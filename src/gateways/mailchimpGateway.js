const { Loggable } = require('../common/aspects');
const mailchimp = require('../clients/mailchimpClient');

const COVESTING_EMAIL_LIST_ID = "4106fca525";
const COVESTING_TOKEN_SALE_EMAIL_LIST_ID = "f8b618c359";
const STATUS_SUBSCRIBED = "subscribed";

class MailchimpGateway {

    @Loggable
    async subscribe({ email }) {
        await mailchimp.post({
            path: `/lists/${COVESTING_EMAIL_LIST_ID}/members`
        }, {
            email_address: email,
            status: STATUS_SUBSCRIBED,
        });
    }

    @Loggable
    async subscribeTokenSale({ email, expectedContributionEth }) {
        await mailchimp.post({
            path: `/lists/${COVESTING_TOKEN_SALE_EMAIL_LIST_ID}/members`
        }, {
            email_address: email,
            status: STATUS_SUBSCRIBED,
            merge_fields: {
                "INVEST": expectedContributionEth,
            }
        });
    }
}

module.exports = new MailchimpGateway();
