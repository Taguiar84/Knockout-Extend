describe("KnockoutExtend", function () {

    beforeEach(function (done) {
        viewModel.Locale('pt-BR');
        setTimeout(function () {
            viewModel.Apply('pt-BR');
            done();
        }, 1000);
    })

    it("Chamge Locale", function (done) {
        done();
    });

});