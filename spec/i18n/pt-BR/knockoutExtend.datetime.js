describe("KnockoutExtend.datetime", function () {

    beforeEach(function (done) {
        viewModel.Locale('pt-BR');
        setTimeout(function () {
            viewModel.Apply('pt-BR');
            done();
        }, 100);
    })

    it("Read visual element", function (done) {

        var dateValue = $('#dateValue');
        var anotherDateValue = $('#anotherDateValue');

        //var currencyValue = $('#currencyValue');
        //var anotherCurrencyValue = $('#anotherCurrencyValue');

        //var percentValue = $('#percentValue');
        //var anotherPercentValue = $('#anotherPercentValue');

        expect($(dateValue).val()).toBe('01/01/2014');
        expect($(anotherDateValue).val()).toBe('01/01/2014');

        done();
    });

});