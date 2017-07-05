class PriceDto {
    /**
     * @return {number}
     */
    getLastPrice() {
        return this._lastPrice;
    }

    /**
     * @param {number} lastPrice
     * @return {PriceDto}
     */
    setLastPrice(lastPrice) {
        this._lastPrice = lastPrice;
        return this;
    }

    /**
     * @return {string}
     */
    getTradingPairCode() {
        return this._tradingPairCode;
    }

    /**
     * @param {string} tradingPairCode
     * @return {PriceDto}
     */
    setTradingPairCode(tradingPairCode) {
        this._tradingPairCode = tradingPairCode;
        return this;
    }
}

export default PriceDto;