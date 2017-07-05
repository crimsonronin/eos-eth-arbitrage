import request from 'request';

class BitfinnexApiService {
    /**
     * @param {BitfinnexApiDataToPriceDtoMapper} bitfinnexApiDataToPriceDtoMapper
     * @param {string} apiEndpoint
     */
    constructor(
        bitfinnexApiDataToPriceDtoMapper,
        apiEndpoint = 'https://api.bitfinex.com/v1'
    ) {
        this._bitfinnexApiDataToPriceDtoMapper = bitfinnexApiDataToPriceDtoMapper;
        this._apiEndpoint = apiEndpoint;
    }

    /**
     * @param {string} tradingPairCode
     * @return {Promise.<PriceDto>}
     * @private
     */
    async _getData(tradingPairCode) {
        return new Promise((resolve, reject) => {
            request(
                {
                    url: `${this._apiEndpoint}/pubticker/${tradingPairCode}`,
                    json: true
                },
                (error, response, data) => {
                    if (!!error) {
                        reject(error);
                    } else {
                        resolve(this._bitfinnexApiDataToPriceDtoMapper.convert(data));
                    }
                }
            );
        });
    }

    /**
     * @param {string} tradingPairCode
     * @return {Promise.<PriceDto>}
     */
    async getLatestPrice(tradingPairCode) {
        const price = await this._getData(tradingPairCode);

        if (!!price) {
            price.setTradingPairCode(tradingPairCode);
        }

        return price;
    }
}

export default BitfinnexApiService;