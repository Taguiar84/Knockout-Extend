$.knockoutExtend.defaults.culture.changeMaskFunction = function (currentValue, options) {
    var dddList = ['11', '12', '13', '14', '15', '16', '17', '18', '19', '21', '22', '24', '27'];
    var value = currentValue;

    var mask = 'phone';
    var newMask;
    mask = options.mask || mask;
    var newMask = '(99) 99999-9999';
    if (value != null && value.length > 3) {
        var ddd = value.substring(0, 2);
        var found = dddList.indexOf(ddd) != -1;
        if (found) {
            var thirdCaracter = value.substring(2, 3);
            switch (thirdCaracter) {
                case '9':
                    return newMask;
            }
        }
    }
    return mask;
}