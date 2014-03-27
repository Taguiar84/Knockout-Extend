describe("KnockoutExtend.number", function () {

    beforeEach(function () {
        viewModel.Apply('en-US');

    })

    it("Read visual element", function () {
        var integerValue = $('#integerValue');
        var anotherIntegerValue = $('#anotherIntegerValue');

        var currencyValue = $('#currencyValue');
        var anotherCurrencyValue = $('#anotherCurrencyValue');

        expect($(integerValue).val()).toBe((2).toString());
        expect($(anotherIntegerValue).val()).toBe((5).toString());


        expect($(currencyValue).val()).toBe('2,46');
        expect($(anotherCurrencyValue).val()).toBe('0,20');

    });

});