import moment from 'moment';
import EosPeriodDto from './eos-period-dto';

class EosApiDataToEosPeriodDtoMapper {
    /**
     * @param {object|object[]} source
     * @return {EosPeriodDto|EosPeriodDto[]}
     */
    convert(source) {
        if (source instanceof Array) {
            return this._convertMultiple(source);
        }

        return this._convertSingle(source);
    }

    /**
     * @param {object} source
     * @return {EosPeriodDto}
     * @private
     */
    _convertSingle(source) {
        const eosPeriod = new EosPeriodDto();

        eosPeriod.setTokenAllocation(Number(source.createOnDay)).
        setCommitedEthereum(Number(source.dailyTotal)).
        setPeriodEndDate(moment(source.ends)).
        setPeriodStartDate(moment(source.begins));

        return eosPeriod;
    }

    /**
     * @param {object[]} source
     * @return {EosPeriodDto[]}
     * @private
     */
    _convertMultiple(source) {
        const eosPeriods = [];

        for (const eosPeriod of source) {
            const eosPeriodDto = this._convertSingle(eosPeriod);
            if (!!eosPeriodDto) {
                eosPeriods.push(eosPeriodDto);
            }
        }

        return eosPeriods;
    }
}

export default EosApiDataToEosPeriodDtoMapper;
