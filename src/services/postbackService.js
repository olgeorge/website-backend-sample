const { Loggable } = require('../common/aspects');
const postbackDao = require('../dao/postbackDao');
const axios = require('axios');

class PostbackService {

    @Loggable
    async executeCallbackFor({ clickid, affid }) {
        if (!clickid || !affid) {
            return;
        }
        const { url } = await postbackDao.get({ affid });
        if (url) {
            const remoteUrl = `${url}?cnv_id=${clickid}&payout=0&cnv_status=signup`;
            console.log(`Sending postback GET: ${remoteUrl}`);
            await axios.get(remoteUrl);
        }
    }
}

module.exports = new PostbackService();
