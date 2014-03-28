describe("KnockoutExtend.number", function () {

    beforeEach(function (done) {
        viewModel.Locale('pt-BR');
        setTimeout(function () {
            viewModel.Apply('pt-BR');
            done();
        }, 100);
    })

    it("Read visual element", function (done) {
        
        var integerValue = $('#integerValue');
        var anotherIntegerValue = $('#anotherIntegerValue');

        var currencyValue = $('#currencyValue');
        var anotherCurrencyValue = $('#anotherCurrencyValue');

        var percentValue = $('#percentValue');
        var anotherPercentValue = $('#anotherPercentValue');
        var maskPercentValue = $('#maskPercentValue');

        expect($(integerValue).val()).toBe((2).toString());
        expect($(anotherIntegerValue).val()).toBe((5).toString());

        expect($(currencyValue).val()).toBe('2,46');
        expect($(anotherCurrencyValue).val()).toBe('0,20');

        expect($(percentValue).val()).toBe('0,1500');
        expect($(anotherPercentValue).val()).toBe('0,0400');
        expect($(maskPercentValue).val()).toBe('0,040000');

        done();
    });


    it("Change values by knockout", function (done) {

        var integerValue = $('#integerValue');
        var anotherIntegerValue = $('#anotherIntegerValue');

        var currencyValue = $('#currencyValue');
        var anotherCurrencyValue = $('#anotherCurrencyValue');

        var percentValue = $('#percentValue');
        var anotherPercentValue = $('#anotherPercentValue');
        var maskPercentValue = $('#maskPercentValue');

        viewModel.IntegerValue(34658);
        expect($(integerValue).val()).toBe('34.658');
        viewModel.AnotherIntegerValue(97689);
        expect($(anotherIntegerValue).val()).toBe('97.689');

        viewModel.CurrencyValue(9876.89)
        expect($(currencyValue).val()).toBe('9.876,89');
        viewModel.AnotherCurrencyValue(1263.99)
        expect($(anotherCurrencyValue).val()).toBe('1.263,99');

        viewModel.PercentValue(0.0001)
        expect($(percentValue).val()).toBe('0,0001');
        viewModel.AnotherPercentValue(341.0801)
        expect($(anotherPercentValue).val()).toBe('341,0801');
        expect($(maskPercentValue).val()).toBe('341,080100');
        done();
    });

});