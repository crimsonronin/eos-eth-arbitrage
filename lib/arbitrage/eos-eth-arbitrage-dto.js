class EosEthArbitrageDto {
    /**
     * @return {number}
     */
    getCurrentPrice() {
        return this._currentPrice;
    }

    /**
     * @param {number} currentPrice
     * @return {EosEthArbitrageDto}
     */
    setCurrentPrice(currentPrice) {
        this._currentPrice = currentPrice;
        return this;
    }

    /**
     * @return {number}
     */
    getReturnOnInvestment() {
        return this._returnOnInvestment;
    }

    /**
     * @param {number} returnOnInvestment
     * @return {EosEthArbitrageDto}
     */
    setReturnOnInvestment(returnOnInvestment) {
        this._returnOnInvestment = returnOnInvestment;
        return this;
    }
}

export default EosEthArbitrageDto;