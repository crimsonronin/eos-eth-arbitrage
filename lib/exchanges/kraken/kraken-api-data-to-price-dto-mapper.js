import ApiDataToPriceDtoMapperInterface from '../api-data-to-price-dto-mapper-interface';
import PriceDto from '../price-dto';

class KrakenApiDataToPriceDtoMapper extends ApiDataToPriceDtoMapperInterface {
    /**
     * @param {object|object[]} source
     * @return {PriceDto|PriceDto[]}
     */
    convert(source) {
        if (source instanceof Array) {
            return this._convertMultiple(source);
        }

        return this._convertSingle(source);
    }

    /**
     * @param {object} source
     * @return {PriceDto}
     * @private
     */
    _convertSingle(source) {
        const priceData = Object.values(source.result);
        if (!!priceData && !!priceData[0]) {
            const price = new PriceDto();
            price.setLastPrice(Number(priceData[0].c[0]));
            return price;
        }
    }

    /**
     * @param {object[]} source
     * @return {PriceDto[]}
     * @private
     */
    _convertMultiple(source) {
        const prices = [];

        for (const price of source) {
            const priceDto = this._convertSingle(price);
            if (!!priceDto) {
                prices.push(priceDto);
            }
        }

        return prices;
    }
}

export default KrakenApiDataToPriceDtoMapper;
