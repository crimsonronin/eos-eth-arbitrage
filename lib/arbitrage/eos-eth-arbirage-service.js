import EosEthArbitrageDto from './eos-eth-arbitrage-dto';
const TRADING_PAIR = 'EOSETH';

class EosEthArbitrageService {
    /**
     * @param {EosApiService} eosApiService
     * @param {AbstractExchangeApiService[]} exchangeApiServices
     */
    constructor(
        eosApiService,
        exchangeApiServices
    ) {
        this._eosApiService = eosApiService;
        this._exchangeApiServices = exchangeApiServices;
    }

    /**
     * @return {Promise.<EosEthArbitrageDto[]>}
     */
    async getCurrentArbitrageOpportinuties() {
        const ethEosArbitrageDtos = [];
        const currentEosPeriod = await this._eosApiService.getCurrentPeriod();

        for (const exchangeApiServices of this._exchangeApiServices) {
            const ethEosArbitrageDto = await this._getArbitrageOpportunityFromExchange(
                exchangeApiServices,
                currentEosPeriod,
                TRADING_PAIR
            );
            ethEosArbitrageDtos.push(ethEosArbitrageDto);
        }

        return ethEosArbitrageDtos;
    }

    /**
     * @param {AbstractExchangeApiService} exchangeApiSerivce
     * @param {EosPeriodDto} currentEosPeriod
     * @param {string} tradingPair
     * @return {Promise.<EosEthArbitrageDto>}
     * @private
     */
    async _getArbitrageOpportunityFromExchange(exchangeApiSerivce, currentEosPeriod, tradingPair) {
        const tradingPrice = await exchangeApiSerivce.getLatestPrice(TRADING_PAIR);

        const roi = currentEosPeriod.getTokenAllocation() /
            currentEosPeriod.getCommitedEthereum() *
            tradingPrice.getLastPrice();

        const ethEosArbitrageDto = new EosEthArbitrageDto();

        ethEosArbitrageDto.setExchangeName(exchangeApiSerivce.getName()).
        setCurrentPrice(Number(tradingPrice.getLastPrice())).
        setReturnOnInvestment(Number(roi));

        return ethEosArbitrageDto;
    }
}

export default EosEthArbitrageService;