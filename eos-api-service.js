import request from 'request';
import moment from 'moment';

class EosApiService {
    /**
     * @param {EosApiDataToEosPeriodDtoMapper} eosApiDataToEosPeriodDtoMapper
     * @param {string} eosApiEndpoint
     */
    constructor(
        eosApiDataToEosPeriodDtoMapper,
        eosApiEndpoint = 'https://eos.io/eos-sales-statistic.php'
    ) {
        this._eosApiDataToEosPeriodDtoMapper = eosApiDataToEosPeriodDtoMapper;
        this._eosApiEndpoint = eosApiEndpoint;
    }

    /**
     * @return {Promise}
     * @private
     */
    async _getData() {
        return new Promise((resolve, reject) => {
            request(
                {
                    url: this._eosApiEndpoint,
                    json: true
                },
                (error, response, data) => {
                    if (!!error) {
                        reject(error);
                    } else {
                        resolve(this._eosApiDataToEosPeriodDtoMapper.convert(data));
                    }
                }
            );
        });
    }

    /**
     * @return {Promise.<EosPeriodDto>}
     */
    async getLatestPeriod() {
        const data = await this._getData();

        return data.pop();
    }

    /**
     * @return {Promise.<EosPeriodDto>}
     */
    async getCurrentPeriod() {
        const data = await this._getData();
        const now = moment();

        for (const period of data) {
            if (now.isBetween(period.getPeriodStartDate(), period.getPeriodEndDate())) {
                return period;
            }
        }
    }
}

export default EosApiService;