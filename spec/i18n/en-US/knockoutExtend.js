describe("KnockoutExtend", function () {

    beforeEach(function (done) {
        viewModel.Locale('en-US');
        setTimeout(function () {
            viewModel.Apply('en-US');
            done();
        }, 1000);
    })

    it("Chamge Locale", function (done) {
        done();
    });

});