describe("KnockoutExtend.phone", function () {

    it("Read visual element", function (done) {

        var phoneValue = $('#phoneValue');
        var anotherPhoneValue = $('#anotherPhoneValue');
        var countryPhoneValue = $('#phoneCountryValue');

        expect($(phoneValue).val()).toBe('(79) 99199-9401');
        expect($(anotherPhoneValue).val()).toBe('(19) 99321-4321');
        expect($(countryPhoneValue).val()).toBe('15 (79) 99199-9401');

        done();
    });

    it("Change values by knockout", function (done) {

        var phoneValue = $('#phoneValue');
        var anotherPhoneValue = $('#anotherPhoneValue');
        var countryPhoneValue = $('#phoneCountryValue');

        viewModel.PhoneValue('7932315201');
        expect($(phoneValue).val()).toBe('(79) 3231-5201');

        viewModel.AnotherPhoneValue('1912345678');
        expect($(anotherPhoneValue).val()).toBe('(19) 1234-5678');

        viewModel.PhoneCountryValue('157932315201');
        expect($(countryPhoneValue).val()).toBe('15 (79) 3231-5201');


        done();
    });

});