ko.bindingHandlers.currencyMask = {
    init: function (element, valueAccessor, allBindingsAccessor) {
        var options = allBindingsAccessor().currencyMaskOptions || {};

        if ($(element).is("input"))
            $(element).setMask('decimal');

        ko.utils.registerEventHandler(element, 'focusout', function () {
            var observable = valueAccessor();
            var value = $(element).val();
            var numberValue = Globalize.parseFloat(value);
            if (isNaN(numberValue))
                observable(null);
            else
                observable(numberValue);
        });
        ko.utils.domNodeDisposal.addDisposeCallback(element, function () {
        });
    },

    update: function (element, valueAccessor) {
        var value = ko.utils.unwrapObservable(valueAccessor());

        if (value == null || isNaN(value)) {
            $(element).val(null);
            return;
        }
        var valor;
        if (typeof value == "number") {
            valor = Globalize.format(value, 'n2');
        }
        else
            valor = Globalize.parseFloat(value).toString();
        if ($(element).is("input")) {
            $(element).val(valor);
            $(element).setMask('decimal');
        }
        else {
            $(element).text($.mask.string(valor, 'decimal'));
        }
    }
};
if (ko.validation != null) {
    ko.validation.makeBindingHandlerValidatable('currencyMask');
}

//ko.bindingHandlers.currencyNegativeMask = {
//    init: function (element, valueAccessor, allBindingsAccessor) {
//        var options = allBindingsAccessor().currencyMaskOptions || {};

//        if ($(element).is("input"))
//            $(element).setMask('signed-decimal');

//        ko.utils.registerEventHandler(element, 'focusout', function () {
//            var observable = valueAccessor();
//            var value = $(element).val();
//            var numberValue = Globalize.parseFloat(value); //parseFloat(value.toString().replace(/\./g, '').replace(/\,/g, '.'));
//            if (isNaN(numberValue))
//                observable(null);
//            else
//                observable(numberValue);
//        });
//        ko.utils.domNodeDisposal.addDisposeCallback(element, function () {
//        });
//    },

//    update: function (element, valueAccessor) {
//        var value = ko.utils.unwrapObservable(valueAccessor());

//        if (value == null || isNaN(value)) {
//            $(element).val(null);
//            return;
//        }
//        var valor;
//        if (typeof value == "number") {
//            valor = value.toString();
//        }
//        else
//            valor = Globalize.parseFloat(value).toString(); //parseFloat(value.toString().replace(/\./g, '').replace(/\,/g, '.')).toFixed(2);
//        if ($(element).is("input")) {
//            $(element).val(valor);
//            $(element).setMask('signed-decimal');
//        }
//        else {
//            $(element).text($.mask.string(valor, 'signed-decimal'));
//        }
//    }
//};
//ko.validation.makeBindingHandlerValidatable('currencyNegativeMask');

ko.bindingHandlers.integerMask = {
    init: function (element, valueAccessor, allBindingsAccessor) {
        var options = allBindingsAccessor().currencyMaskOptions || {};

        if ($(element).is("input"))
            $(element).setMask('integer');

        ko.utils.registerEventHandler(element, 'focusout', function () {
            var observable = valueAccessor();
            var value = $(element).val();
            var numberValue = Globalize.parseInt(value);
            if (isNaN(numberValue))
                observable(null);
            else
                observable(numberValue);
        });
        ko.utils.domNodeDisposal.addDisposeCallback(element, function () {
        });
    },

    update: function (element, valueAccessor) {
        var value = ko.utils.unwrapObservable(valueAccessor());

        if (value == null || isNaN(value)) {
            $(element).val(null);
            return;
        }
        var valor;
        if (typeof value == "number") {
            valor = value.toString();
        }
        else
            valor = Globalize.parseInt(value).toString();
        if ($(element).is("input")) {
            $(element).val(valor);
            $(element).setMask('integer');
        }
        else {
            $(element).text($.mask.string(valor, 'integer'));
        }
    }
};
if (ko.validation != null) {
    ko.validation.makeBindingHandlerValidatable('integerMask');
}

ko.bindingHandlers.percentMask = {
    init: function (element, valueAccessor, allBindingsAccessor) {
        var options = allBindingsAccessor().percentMaskOptions || {};

        if ($(element).is("input"))
            $(element).setMask('percent');

        ko.utils.registerEventHandler(element, 'focusout', function () {
            var observable = valueAccessor();
            var value = $(element).val();
            var numberValue = Globalize.parseFloat(value);
            if (isNaN(numberValue))
                observable(null);
            else
                observable(numberValue);
        });
        ko.utils.domNodeDisposal.addDisposeCallback(element, function () {
        });
    },

    update: function (element, valueAccessor) {
        var value = ko.utils.unwrapObservable(valueAccessor());

        if (value == null || isNaN(value)) {
            $(element).val(null);
            return;
        }
        var valor;
        if (typeof value == "number") {
            valor = Globalize.format(value, 'n4');
        }
        else
            valor = Globalize.parseFloat(value).toString();
        if ($(element).is("input")) {
            $(element).val(valor);
            $(element).setMask('percent');
        }
        else {
            $(element).text($.mask.string(valor, 'percent'));
        }
    }
};
if (ko.validation != null) {
    ko.validation.makeBindingHandlerValidatable('percentMask');
}