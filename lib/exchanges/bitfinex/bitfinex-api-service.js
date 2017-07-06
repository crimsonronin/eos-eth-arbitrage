import AbstractExchangeApiService from '../abstract-exchange-api-service';

class BitfinexApiService extends AbstractExchangeApiService {
    /**
     * @param {ApiDataToPriceDtoMapperInterface} dataToPriceMapper
     * @param {string} apiEndpoint
     */
    constructor(
        dataToPriceMapper,
        apiEndpoint = 'https://api.bitfinex.com/v1'
    ) {
        super(dataToPriceMapper, apiEndpoint);
        this._name = 'Bitfinex';
    }

    /**
     * @param {string} tradingPairCode
     */
    getLatestPriceEndpoint(tradingPairCode) {
        return `${this._apiEndpoint}/pubticker/${tradingPairCode}`;
    }
}

export default BitfinexApiService;