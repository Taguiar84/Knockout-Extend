describe("KnockoutExtend", function () {

    beforeEach(function (done) {
        viewModel.Locale('en-US');
        setTimeout(function () {
            viewModel.Apply('en-US');
            done();
        }, 1000);
    })

    it("Change Locale", function (done) {
        done();
    });

});