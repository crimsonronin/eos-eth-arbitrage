import AbstractExchangeApiService from '../abstract-exchange-api-service';

class KrakenApiService extends AbstractExchangeApiService {
    /**
     * @param {ApiDataToPriceDtoMapperInterface} dataToPriceMapper
     * @param {string} apiEndpoint
     */
    constructor(
        dataToPriceMapper,
        apiEndpoint = 'https://api.kraken.com/0/public'
    ) {
        super(dataToPriceMapper, apiEndpoint);
        this._name = 'Kraken';
    }

    /**
     * @param {string} tradingPairCode
     */
    getLatestPriceEndpoint(tradingPairCode) {
        return `${this._apiEndpoint}/Ticker?pair=${tradingPairCode}`;
    }
}

export default KrakenApiService;