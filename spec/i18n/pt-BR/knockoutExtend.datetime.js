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

        expect($(dateValue).val()).toBe('01/01/2014');
        expect($(anotherDateValue).val()).toBe('01/01/2014');

        done();
    });

    it("Change values by knockout", function (done) {

        var dateValue = $('#dateValue');
        var anotherDateValue = $('#anotherDateValue');

        var dateTimeValue = $('#dateTimeValue');
        var anotherDateTimeValue = $('#anotherDateTimeValue');

        viewModel.DateValue(new Date('2014-02-01 12:00:00'));
        expect($(dateValue).val()).toBe('01/02/2014');

        viewModel.AnotherDateValue(new Date('2015-12-31 12:00:00'));
        expect($(anotherDateValue).val()).toBe('31/12/2015');

        viewModel.DateTimeValue(new Date('2014-02-01 12:00:00'));
        expect($(dateTimeValue).val()).toBe('01/02/2014 12:00');

        viewModel.AnotherDateTimeValue(new Date('2015-12-30 12:00:00'));
        expect($(anotherDateTimeValue).val()).toBe('30/12/2015 12:00');





        done();
    });

});