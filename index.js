import EosApiService from './eos-api-service';
import EosApiDataToEosPeriodDtoMapper from './eos-api-object-to-eos-period-dto-mapper';
import BitfinnexApiService from './bitfinnex-api-service';
import BitfinnexApiDataToPriceDtoMapper from './bitfinnex-api-data-to-eos-period-dto-mapper';
import EosEthArbitrageService from './eos-eth-arbirage-service';

const eosApiDataToEosPeriodDtoMapper = new EosApiDataToEosPeriodDtoMapper();
const eosApiService = new EosApiService(eosApiDataToEosPeriodDtoMapper);
const bitfinnexApiDataToPriceDtoMapper = new BitfinnexApiDataToPriceDtoMapper();
const bitfinnexApiService = new BitfinnexApiService(bitfinnexApiDataToPriceDtoMapper);
const eosEthArbitrageService = new EosEthArbitrageService(eosApiService, bitfinnexApiService);

const run = async () => {
    const currentPeriod = await eosApiService.getCurrentPeriod();
    console.log(`
    The current EOS period:
    Starting on: ${currentPeriod.getPeriodStartDate().format('LLLL')}
    Ending on: ${currentPeriod.getPeriodEndDate().format('LLLL')}
    EOS token allocation: ${currentPeriod.getTokenAllocation()}
    ETH commitment: ${currentPeriod.getCommitedEthereum()}
    `);

    const eosEthArbitrageDto = await eosEthArbitrageService.getCurrentArbitrageOpportinutiy();
    console.log(`
    For 1 ETH committed to EOS you will get ${eosEthArbitrageDto.getReturnOnInvestment()} ETH back at current price of ${eosEthArbitrageDto.getCurrentPrice()} EOSETH
    `);
};

run();