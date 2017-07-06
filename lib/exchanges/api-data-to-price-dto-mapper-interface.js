import PriceDto from './price-dto';

class ApiDataToPriceDtoMapperInterface {
    /**
     * Map api data to a {@link PriceDto}
     * @param {object|object[]} source
     * @return {PriceDto|PriceDto[]}
     */
    convert(source) {
        throw new Error(`ApiDataToPriceDtoMapperInterface::convert needs to be implemented in the concrete class`);
    }
}

export default ApiDataToPriceDtoMapperInterface;
