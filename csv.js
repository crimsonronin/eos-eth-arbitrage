import fs from 'fs';
import moment from 'moment';
import csv from 'fast-csv';
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

const writeCsv = async (filename, existingData = [], currentPeriod, eosEthArbitrageDtos) => {
    const bitfinexArbitrageDto = eosEthArbitrageDtos[0];
    const krakenArbitrageDto = eosEthArbitrageDtos[1];

    const newData = {
        'Started': currentPeriod.getPeriodStartDate().format(),
        'Time': moment().format(),
        'EOS token allocation': currentPeriod.getTokenAllocation(),
        'ETH contribution': currentPeriod.getCommitedEthereum(),
        'Bitfinex price': bitfinexArbitrageDto.getCurrentPrice(),
        'Bitfinex arbitrage': bitfinexArbitrageDto.getReturnOnInvestment(),
        'Kraken price': krakenArbitrageDto.getCurrentPrice(),
        'Kraken arbitrage': krakenArbitrageDto.getReturnOnInvestment(),
    };

    existingData.push(newData);

    return new Promise((resolve, reject) => {
        csv.writeToPath(filename,
            existingData,
            {headers: true}
        ).
        on('error', (error) => {
            reject(error);
        }).
        on('finish', () => {
            resolve();
        });
    });
};
const readCsv = async (filename) => {
    return new Promise((resolve, reject) => {
        // if it doesn't exist, create the file
        if (!fs.existsSync(filename)) {
            fs.writeFileSync(
                filename,
                '',
                {flag: 'wx'}
            );
        }

        const allData = [];
        csv.fromPath(
            filename,
            {headers: true}
        ).
        on('data', (data) => {
            allData.push(data);
        }).
        on('error', (error) => {
            reject(error);
        }).
        on('end', () => {
            resolve(allData);
        })
    });
};

const run = async () => {
    const currentPeriod = await eosApiService.getCurrentPeriod();
    const eosEthArbitrageDtos = await eosEthArbitrageService.getCurrentArbitrageOpportinuties();
    const filename = `eos-eth-arb-${currentPeriod.getPeriodStartDate().format('YYYY-MM-DD')}.csv`;

    let data = await readCsv(filename);
    await writeCsv(filename, data, currentPeriod, eosEthArbitrageDtos);
    console.log(`${moment().format()}: Written to ${filename}`);
};

run();
setInterval(run, POLLING_CADENCE);
