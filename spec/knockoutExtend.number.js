describe("KnockoutExtend.number", function () {

    beforeEach(function () {
        viewModel.Load();

    })

    it("Read visual element", function () {
        var element = $('#integerValue');
        var anotherElement = $('#anotherIntegerValue');

        expect($(element).val()).toBe((2).toString());
        expect($(anotherElement).val()).toBe((5).toString());

    });

});