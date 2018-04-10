const { Loggable } = require('../common/aspects');
const geoip = require('geoip-lite');

class GeoipGateway {

    @Loggable
    getGeoDataForIp(ipAddress) {
        const {
            country,
            region,
            city,
            metro,
            zip,
            range,
            ll = [],
        } = geoip.lookup(ipAddress) || {};
        return {
            ipBlockRange: range,
            countryCode: country,
            regionCode: region,
            city,
            metro,
            zip,
            latitude: ll[0],
            longitude: ll[1],
        }
    }
}

module.exports = new GeoipGateway();
