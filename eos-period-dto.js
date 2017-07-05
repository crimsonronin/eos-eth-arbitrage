class EosPeriodDto {
    /**
     * @return {number}
     */
    getTokenAllocation() {
        return this._tokenAllocation;
    }

    /**
     * @param {number} tokenAllocation
     * @return {EosPeriodDto}
     */
    setTokenAllocation(tokenAllocation) {
        this._tokenAllocation = tokenAllocation;
        return this;
    }

    /**
     * @return {number}
     */
    getCommitedEthereum() {
        return this._commitedEthereum;
    }

    /**
     * @param {number} commitedEthereum
     * @return {EosPeriodDto}
     */
    setCommitedEthereum(commitedEthereum) {
        this._commitedEthereum = commitedEthereum;
        return this;
    }

    /**
     * @return {Date}
     */
    getPeriodStartDate() {
        return this._periodStartDate;
    }

    /**
     * @param {Date} periodStartDate
     * @return {EosPeriodDto}
     */
    setPeriodStartDate(periodStartDate) {
        this._periodStartDate = periodStartDate;
        return this;
    }

    /**
     * @return {Date}
     */
    getPeriodEndDate() {
        return this._periodEndDate;
    }

    /**
     * @param {Date} periodEndDate
     * @return {EosPeriodDto}
     */
    setPeriodEndDate(periodEndDate) {
        this._periodEndDate = periodEndDate;
        return this;
    }
}

export default EosPeriodDto;