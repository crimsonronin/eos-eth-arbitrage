import PriceDto from './price-dto';

class BitfinnexApiDataToPriceDtoMapper {
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
        const price = new PriceDto();
        price.setLastPrice(Number(source.last_price));
        return price;
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

export default BitfinnexApiDataToPriceDtoMapper;
