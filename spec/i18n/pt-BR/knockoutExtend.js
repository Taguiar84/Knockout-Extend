describe("KnockoutExtend", function () {

    beforeEach(function (done) {
        viewModel.Locale('pt-BR');        
        var interval = setInterval(function () {
            if ($.knockoutExtend.loaded == true) {
                viewModel.Apply('pt-BR');
                done();
                clearInterval(interval);
            }
            else if ($.knockoutExtend.loaded == false) {
                console.log('erro de carga');
                clearInterval(interval);    
            }
        }, 1000);

        //setTimeout(function () {
        //    viewModel.Apply('pt-BR');
        //    done();
        //}, 1000);
    })

    it("Change Locale", function (done) {
        done();
    });

});