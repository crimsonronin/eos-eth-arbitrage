import request from 'request';

class AbstractExchangeApiService {
    /**
     * @param {ApiDataToPriceDtoMapperInterface} dataToPriceMapper
     * @param {string} apiEndpoint
     */
    constructor(
        dataToPriceMapper,
        apiEndpoint
    ) {
        this._dataToPriceMapper = dataToPriceMapper;
        this._apiEndpoint = apiEndpoint;
    }

    /**
     * @param {string} tradingPairCode
     * @return {Promise.<PriceDto>}
     * @private
     */
    async _getData(endpoint) {
        return new Promise((resolve, reject) => {
            request(
                {
                    url: endpoint,
                    json: true
                },
                (error, response, data) => {
                    if (!!error) {
                        reject(error);
                    } else {
                        resolve(data);
                    }
                }
            );
        });
    }

    /**
     * Get teh exchange name.
     *
     * @return {string}
     */
    getName() {
        return this._name;
    }

    /**
     * ABSTRACT method: Implement this in the concrete class.
     *
     * This will provide the api endpoint to get the latest price with the provided trading pair.
     *
     * @param {string} tradingPairCode
     */
    getLatestPriceEndpoint(tradingPairCode) {
        throw new Error(`AbstractExchangeApiService::getLatestPriceEndpoint needs to be implemented in the concrete class`);
    }

    /**
     * @param {string} tradingPairCode
     * @return {Promise.<PriceDto>}
     */
    async getLatestPrice(tradingPairCode) {
        const endpoint = this.getLatestPriceEndpoint(tradingPairCode);
        const data = await this._getData(endpoint);
        const price = this._dataToPriceMapper.convert(data);

        if (!!price) {
            price.setTradingPairCode(tradingPairCode);
        }

        return price;
    }
}

export default AbstractExchangeApiService;