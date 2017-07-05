import EosEthArbitrageDto from './eos-eth-arbitrage-dto';
const TRADING_PAIR = 'EOSETH';

class EosEthArbitrageService {
    /**
     * @param {EosApiService} eosApiService
     * @param {BitfinnexApiService} bitfinnexApiService
     */
    constructor(
        eosApiService,
        bitfinnexApiService
    ) {
        this._eosApiService = eosApiService;
        this._bitfinnexApiService = bitfinnexApiService;
    }

    /**
     * @return {Promise.<EosEthArbitrageDto>}
     */
    async getCurrentArbitrageOpportinutiy() {
        const currentEosPeriod = await this._eosApiService.getCurrentPeriod();
        const tradingPrice = await this._bitfinnexApiService.getLatestPrice(TRADING_PAIR);
        const roi = currentEosPeriod.getTokenAllocation() /
            currentEosPeriod.getCommitedEthereum() *
            tradingPrice.getLastPrice();

        const ethEosArbitrageDto = new EosEthArbitrageDto();

        ethEosArbitrageDto.setCurrentPrice(Number(tradingPrice.getLastPrice())).
        setReturnOnInvestment(Number(roi));

        return ethEosArbitrageDto;
    }
}

export default EosEthArbitrageService;