ko.bindingHandlers.monthYearMask = {
    init: function (element, valueAccessor, allBindingsAccessor) {
        var options = allBindingsAccessor().currencyMaskOptions || {};

        if ($(element).is("input"))
            $(element).setMask('19/9999');

        ko.utils.registerEventHandler(element, 'focusout', function () {
            var observable = valueAccessor();
            observable($(element).val());
        });
        ko.utils.domNodeDisposal.addDisposeCallback(element, function () {
        });
    },

    update: function (element, valueAccessor) {
        var value = ko.utils.unwrapObservable(valueAccessor());

        if (value == null) {
            $(element).val(null);
            return;
        }
        if ($(element).is("input")) {
            $(element).val(value);
            $(element).setMask('19/9999');
        }
        else {
            $(element).text($.mask.string(value, '19/9999'));
        }
    }
};
if (ko.validation != null) {
    ko.validation.makeBindingHandlerValidatable('monthYearMask');
}

ko.bindingHandlers.dateMask = {
    init: function (element, valueAccessor, allBindingsAccessor) {
        var options = allBindingsAccessor().currencyMaskOptions || {};

        if ($(element).is("input")) {
            $(element).setMask('date');
            $(element).datepicker({
                language: Globalize.culture().name,
                format: Globalize.culture().calendar.patterns.d.toLowerCase()//Pensar melhor
            });
        }

        ko.utils.registerEventHandler(element, 'focusout', function () {
            var observable = valueAccessor();
            var value = $(element).val();
            var numberValue = Globalize.parseDate(value);
            observable(numberValue);
        });
        ko.utils.domNodeDisposal.addDisposeCallback(element, function () {
        });
    },

    update: function (element, valueAccessor) {
        var value = ko.utils.unwrapObservable(valueAccessor());

        if (value == null) {
            $(element).val(null);
            return;
        }
        var valor = new Date(value);
        if ($(element).is("input")) {
            $(element).val(Globalize.format(valor, 'd'));
            $(element).setMask('date');
        }
        else {
            $(element).text(Globalize.format(valor, 'd'));

        }
    }
};
if (ko.validation != null) {
    ko.validation.makeBindingHandlerValidatable('dateMask');
}


ko.bindingHandlers.dateTimeMask = {
    init: function (element, valueAccessor, allBindingsAccessor) {
        var options = allBindingsAccessor().currencyMaskOptions || {};

        if ($(element).is("input")) {
            $(element).setMask('datetime');
            $(element).datetimepicker({
                language: Globalize.culture().name
                //, format: Globalize.culture().calendar.patterns.d.toLowerCase() + " " + Globalize.culture().calendar.patterns.T //Pensar melhor
            });
        }


        ko.utils.registerEventHandler(element, 'changeDate', function (e) {
            var observable = valueAccessor();            
            observable(e.date);
        });

        ko.utils.registerEventHandler(element, 'focusout', function () {
            var observable = valueAccessor();
            var value = $(element).val();
            var numberValue = null;
            switch (Globalize.culture().name) {
                case 'en-US':
                    numberValue = new Date(value);
                    break;
                default:
                    numberValue = Globalize.parseDate(value);
                    break;
            }
            observable(numberValue);
        });
        ko.utils.domNodeDisposal.addDisposeCallback(element, function () {
        });
    },

    update: function (element, valueAccessor) {
        var value = ko.utils.unwrapObservable(valueAccessor());

        if (value == null) {
            $(element).val(null);
            return;
        }
        var valor = new Date(value);
        if ($(element).is("input")) {
            var format = Globalize.culture().calendar.patterns.d + " " + Globalize.culture().calendar.patterns.T //Pensar melhor
            $(element).val(Globalize.format(valor, format));
            $(element).setMask('datetime');
        }
        else {
            $(element).text(Globalize.format(valor, 'd'));
        }
    }
};
if (ko.validation != null) {
    ko.validation.makeBindingHandlerValidatable('dateTimeMask');
}


ko.bindingHandlers.dateTimeOffSetMask = {
    init: function (element, valueAccessor, allBindingsAccessor) {
        var options = allBindingsAccessor().currencyMaskOptions || {};

        if ($(element).is("input")) {
            $(element).setMask('datetime');
            $(element).datetimepicker({
                language: Globalize.culture().name
                //, format: Globalize.culture().calendar.patterns.d.toLowerCase() + " " + Globalize.culture().calendar.patterns.T //Pensar melhor
            });
        }


        ko.utils.registerEventHandler(element, 'changeDate', function (e) {
            var observable = valueAccessor();
            observable(e.date);
        });

        ko.utils.registerEventHandler(element, 'focusout', function () {
            var observable = valueAccessor();
            var value = $(element).val();
            var numberValue = null;
            switch (Globalize.culture().name) {
                case 'en-US':
                    numberValue = new Date(value);
                    break;
                default:
                    numberValue = Globalize.parseDate(value);
                    break;
            }
            observable(numberValue);
        });
        ko.utils.domNodeDisposal.addDisposeCallback(element, function () {
        });
    },

    update: function (element, valueAccessor) {
        var value = ko.utils.unwrapObservable(valueAccessor());

        if (value == null) {
            $(element).val(null);
            return;
        }
        var valor = new Date(value);
        if ($(element).is("input")) {
            var format = Globalize.culture().calendar.patterns.d + " " + Globalize.culture().calendar.patterns.T //Pensar melhor
            $(element).val(Globalize.format(valor, format));
            $(element).setMask('datetime');
        }
        else {
            $(element).text(Globalize.format(valor, 'd'));
        }
    }
};
if (ko.validation != null) {
    ko.validation.makeBindingHandlerValidatable('dateTimeOffSetMask');
}

ko.bindingHandlers.timeMask = {
    init: function (element, valueAccessor, allBindingsAccessor) {
        var options = allBindingsAccessor().currencyMaskOptions || {};

        if ($(element).is("input")) {
            //$(element).setMask('time');

            //$(element).timepicker().on('changeTime.timepicker', function (e) {
            //    console.log('The time is ' + e.time.value);
            //    console.log('The hour is ' + e.time.hour);
            //    console.log('The minute is ' + e.time.minute);
            //    console.log('The meridian is ' + e.time.meridian);
            //});

            $(element).timepicker({
                //language: Globalize.culture().name
                //, pickDate: false
                //, pickTime: true
                showMeridian: false
                //, format: Globalize.culture().calendar.patterns.T //Pensar melhor
            });
        }


        ko.utils.registerEventHandler(element, 'changeTime.timepicker', function (e) {            
            var observable = valueAccessor();
            observable(e.time.value);
        });

        ko.utils.registerEventHandler(element, 'focusout', function () {
            var observable = valueAccessor();
            var value = $(element).val();
            var numberValue = null;
            switch (Globalize.culture().name) {
                case 'en-US':
                    numberValue = new Date(value);
                    break;
                default:
                    numberValue = Globalize.parseDate(value);
                    break;
            }
            observable(numberValue);
        });
        ko.utils.domNodeDisposal.addDisposeCallback(element, function () {
        });
    },

    update: function (element, valueAccessor) {
        var value = ko.utils.unwrapObservable(valueAccessor());

        if (value == null) {
            $(element).val(null);
            return;
        }
        //var valor = new Date(value);
        if ($(element).is("input")) {
            //var format = Globalize.culture().calendar.patterns.T;
            $(element).val(value);
            //$(element).setMask('time');
        }
        else {
            $(element).text(value);
        }
    }
};
if (ko.validation != null) {
    ko.validation.makeBindingHandlerValidatable('timeMask');
}

//function verificandoOffSet(valor) {
//    if (valor.split(':').length == 3)
//        valor += ":00";
//    return valor;
//}

if (ko.validation != null) {
    ko.validation.registerExtenders();
}