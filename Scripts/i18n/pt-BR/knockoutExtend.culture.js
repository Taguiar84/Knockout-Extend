$.knockoutExtend.defaults.culture.changeMaskFunction = function (currentValue, options) {
    //var dddList = ['11', '12', '13', '14', '15', '16', '17', '18', '19', '21', '22', '24', '27'];
    var value = currentValue;
    var mask = 'phone';
    var newMask = '(99) 99999-9999';
    var caracterExtra = 3;//poscição sem o 9 digito e country
    if (options.country) {
        mask = "countryPhone"
        newMask = '15 (99) 99999-9999';
        caracterExtra = 5;//+2 caracter pelo pais
    }
    mask = options.mask || mask;    
    if (value != null && value.length > 3) {
        var thirdCaracter = value.substring(caracterExtra, caracterExtra+1);
        switch (thirdCaracter) {
            case '9':
                return newMask;
            default:
                return mask;
                //if (value.length <= 10) {
                //    return mask;//'(99) 9999-9999'//
                //}
                //else {
                //    newMask;
                //}
        }
    }
    return mask;
}