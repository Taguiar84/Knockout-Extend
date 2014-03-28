$.knockoutExtend.defaults.culture.changeMaskFunction = function (currentValue, options) {
    var dddList = ['12', '13', '14', '15', '16', '17', '18', '19', '21', '22', '24', '27'];
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

//$.knockoutExtend.defaults.culture.changeMaskFunction = function (element, valueAccessor, options, mask) {
//    var dddList = ['12', '13', '14', '15', '16', '17', '18', '19', '21', '22', '24', '27'];
//    var value = $(element).val().replace(/[^\d]+/g, '');
//    var newMask;
//    switch(mask){//Only se
//        case 'phone':
//            newMask = '(99) 99999-9999';
//            break;
//        case 'phoneCountry':
//            newMask = '99 (99) 99999-9999'
//            break;
//    }
//    if (value != null && value.length >= 3 && options.mask == null) {
//        var ddd;
//        if (options.country) {
//            ddd = value.substring(2, 2);
//        }
//        else
//            ddd = value.substring(0, 2);
//        var found = dddList.indexOf(ddd) != -1;
//        if (found) {
//            var thirdCaracter;
//            if (options.country) {
//                ddd = value.substring(4, 5);
//            }
//            else
//                thirdCaracter = value.substring(2, 3);
//            switch (thirdCaracter) {
//                case '9':
//                    console.log('newMask');
//                    $(element).setMask(newMask);
//                    //var valor = $(element).val().replace(/[^\d]+/g, '');
//                    //valueAccessor()(valor);
//                    return;
//            }
//        }
//    }
//    console.log('mask');
//    $(element).setMask(mask)
//}