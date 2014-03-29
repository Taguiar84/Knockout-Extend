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
                format: Globalize.culture().calendar.patterns.d.toLowerCase()//Pemsar melhor
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
        var valor = new Date(value); //Globalize.parseDate(value);        
        //if (valor != null)
        //    valor = valor.toString();
        //Ver compoemente para data
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

ko.bindingHandlers.dateTimeOffSetMask = {
    init: function (element, valueAccessor, allBindingsAccessor) {
        var options = allBindingsAccessor().currencyMaskOptions || {};

        if ($(element).is("input"))
            $(element).setMask('datetime');

        ko.utils.registerEventHandler(element, 'focusout', function () {
            var observable = valueAccessor();
            var value = $(element).val();
            //value = verificandoOffSet(value);
            var numberValue = new Date(value); // Globalize.parseDate(value);
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
        //value = verificandoOffSet(value);
        var valor = new Date(value); //Globalize.parseDate(value);
        //if (valor != null)
        //    valor = valor.toString();
        //Ver compoemente para data, assim setar o offset e data
        if ($(element).is("input")) {
            $(element).val(valor);
            $(element).setMask('datetime');
        }
        else {
            if (value == null || value == "") {
                $(element).text("");
            }
            else {
                $(element).text(Globalize.format(valor, 'S'));
            }
        }
    }
};
if (ko.validation != null) {
    ko.validation.makeBindingHandlerValidatable('dateTimeOffSetMask');
}

ko.bindingHandlers.timeMask = {
    init: function (element, valueAccessor, allBindingsAccessor) {
        var options = allBindingsAccessor().currencyMaskOptions || {};

        if ($(element).is("input"))
            $(element).setMask('time');

        ko.utils.registerEventHandler(element, 'focusout', function () {
            var observable = valueAccessor();
            var value = $(element).val();            
            observable(value);
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
            $(element).setMask('time');
        }
        else {
            if (value == null || value == "") {
                $(element).text("");
            }
            else {
                $(element).text(value);
            }
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