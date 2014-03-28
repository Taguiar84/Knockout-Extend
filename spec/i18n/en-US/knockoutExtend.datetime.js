describe("KnockoutExtend.datetime", function () {

    beforeEach(function (done) {
        viewModel.Locale('en-US');
        setTimeout(function () {
            viewModel.Apply('en-US');
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

        viewModel.DateValue(new Date('2014-02-01 12:00:00'));
        expect($(dateValue).val()).toBe('02/01/2014');

        viewModel.AnotherDateValue(new Date('2015-12-12 12:00:00'));
        expect($(anotherDateValue).val()).toBe('12/12/2015');

        done();
    });

});