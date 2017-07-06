import EosApiService from './lib/eos/eos-api-service';
import EosApiDataToEosPeriodDtoMapper from './lib/eos/eos-api-object-to-eos-period-dto-mapper';
import BitfinexApiService from './lib/exchanges/bitfinex/bitfinex-api-service';
import BitfinexApiDataToPriceDtoMapper from './lib/exchanges/bitfinex/bitfinex-api-data-to-price-dto-mapper';
import KrakenApiService from './lib/exchanges/kraken/kraken-api-service';
import KrakenApiDataToPriceDtoMapper from './lib/exchanges/kraken/kraken-api-data-to-price-dto-mapper';
import EosEthArbitrageService from './lib/arbitrage/eos-eth-arbirage-service';

const eosApiDataToEosPeriodDtoMapper = new EosApiDataToEosPeriodDtoMapper();
const eosApiService = new EosApiService(eosApiDataToEosPeriodDtoMapper);
const bitfinexApiDataToPriceDtoMapper = new BitfinexApiDataToPriceDtoMapper();
const bitfinexApiService = new BitfinexApiService(bitfinexApiDataToPriceDtoMapper);
const krakenApiDataToPriceDtoMapper = new KrakenApiDataToPriceDtoMapper();
const krakenApiService = new KrakenApiService(krakenApiDataToPriceDtoMapper);
const eosEthArbitrageService = new EosEthArbitrageService(
    eosApiService,
    [
        bitfinexApiService,
        krakenApiService
    ]
);
const POLLING_CADENCE = 60 * 1000;
const ETH_AMOUNT_TO_SELL = 1;

const run = async () => {
    const currentPeriod = await eosApiService.getCurrentPeriod();
    console.log(`
    The current EOS period:
    Started on: ${currentPeriod.getPeriodStartDate().format('LLLL')}
    Ending on: ${currentPeriod.getPeriodEndDate().format('LLLL')}
    EOS token allocation: ${currentPeriod.getTokenAllocation()}
    Current ETH commitment: ${currentPeriod.getCommitedEthereum()}
    `);

    const eosEthArbitrageDtos = await eosEthArbitrageService.getCurrentArbitrageOpportinuties();
    for (const eosEthArbitrageDto of eosEthArbitrageDtos) {
        console.log(`
        ${eosEthArbitrageDto.getExchangeName()}:
        For 1 ETH committed to EOS you will get ${eosEthArbitrageDto.getReturnOnInvestment()} ETH back at current price of ${eosEthArbitrageDto.getCurrentPrice()} EOSETH
        Sell ${ETH_AMOUNT_TO_SELL / eosEthArbitrageDto.getCurrentPrice()} EOS to recoup ${ETH_AMOUNT_TO_SELL} ETH
        `);
    }
};

run();
setInterval(run, POLLING_CADENCE);
