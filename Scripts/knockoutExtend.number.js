ko.bindingHandlers.currencyMask = {
    init: function (element, valueAccessor, allBindingsAccessor) {
        var options = allBindingsAccessor().monthYearMaskOptions || {};

        if ($(element).is("input"))
            $(element).setMask('currency');

        ko.utils.registerEventHandler(element, 'focusout', function () {
            var observable = valueAccessor();
            var value = $(element).val();
            var numberValue = Globalize.parseNumber(value);
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
            valor = Globalize.formatNumber(value, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
        }
        else
            valor = Globalize.parseNumber(value).toString();
        if ($(element).is("input")) {
            $(element).val(valor);
            $(element).setMask('currency');
        }
        else {
            $(element).text($.mask.string(valor, 'currency'));
        }
    }
};
if (ko.validation != null) {
    ko.validation.makeBindingHandlerValidatable('currencyMask');
}

ko.bindingHandlers.integerMask = {
    init: function (element, valueAccessor, allBindingsAccessor) {
        var options = allBindingsAccessor().integerMaskOptions || {};

        var mask = options.mask || 'integer';
        if ($(element).is("input"))
            $(element).setMask(mask);

        ko.utils.registerEventHandler(element, 'focusout', function () {
            var observable = valueAccessor();
            var value = $(element).val();
            var numberValue = Globalize.parseNumber(value);
            if (isNaN(numberValue))
                observable(null);
            else
                observable(numberValue);
        });
        ko.utils.domNodeDisposal.addDisposeCallback(element, function () {
        });
    },

    update: function (element, valueAccessor, allBindingsAccessor) {
        var options = allBindingsAccessor().integerMaskOptions || {};

        var value = ko.utils.unwrapObservable(valueAccessor());

        var mask = options.mask || 'integer';
        if (value == null || isNaN(value)) {
            $(element).val(null);
            return;
        }
        var valor;
        if (typeof value == "number") {
            valor = value.toString();
        }
        else
            valor = Globalize.parseNumber(value).toString();
        if ($(element).is("input")) {
            $(element).val(valor);
            $(element).setMask(mask);
        }
        else {
            $(element).text($.mask.string(valor, mask));
        }
    }
};
if (ko.validation != null) {
    ko.validation.makeBindingHandlerValidatable('integerMask');
}

ko.bindingHandlers.decimalMask = {
    init: function (element, valueAccessor, allBindingsAccessor) {
        var options = allBindingsAccessor().decimalMaskOptions || {};

        var mask = options.mask || 'decimal';
        var globalizeFormat = options.globalizeFormat ||  "n4";

        if ($(element).is("input"))
            $(element).setMask(mask);

        ko.utils.registerEventHandler(element, 'focusout', function () {
            var observable = valueAccessor();
            var value = $(element).val();
            var numberValue = Globalize.parseNumber(value);
            if (isNaN(numberValue))
                observable(null);
            else
                observable(numberValue);
        });
        ko.utils.domNodeDisposal.addDisposeCallback(element, function () {
        });
    },

    update: function (element, valueAccessor, allBindingsAccessor) {
        var options = allBindingsAccessor().decimalMaskOptions || {};

        var value = ko.utils.unwrapObservable(valueAccessor());

        var mask = options.mask || 'decimal';
        var globalizeFormat = options.globalizeFormat || { minimumFractionDigits: 4, maximumFractionDigits: 4 };

        if (value == null || isNaN(value)) {
            $(element).val(null);
            return;
        }
        var valor;
        if (typeof value == "number") {
            valor = Globalize.formatNumber(value, globalizeFormat);
        }
        else
            valor = Globalize.parseNumber(value).toString();
        if ($(element).is("input")) {
            $(element).val(valor);
            $(element).setMask(mask);
        }
        else {
            $(element).text($.mask.string(valor, mask));
        }
    }
};
if (ko.validation != null) {
    ko.validation.makeBindingHandlerValidatable('decimalMask');
}

ko.bindingHandlers.zipCodeMask = {
    init: function (element, valueAccessor, allBindingsAccessor) {
        var options = allBindingsAccessor().currencyMaskOptions || {};

        if ($(element).is("input"))
            $(element).setMask('zipCode');

        ko.utils.registerEventHandler(element, 'focusout', function () {
            var observable = valueAccessor();
            var valor = $(element).val().replace(/[^\d]+/g, '');
            observable(valor);
            if (observable.isValid != null) {
                observable.isValid();
            }
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
            $(element).setMask('zipCode');
        }
        else {
            $(element).text($.mask.string(value, 'zipCode'));
        }
    }
};
if (ko.validation != null) {
    ko.validation.makeBindingHandlerValidatable('zipCodeMask');
}


ko.bindingHandlers.phoneMask = {
    init: function (element, valueAccessor, allBindingsAccessor) {
        var options = allBindingsAccessor().phoneMaskOptions || {};

        var mask = 'phone';
        //var newMask;
        if (options.country) {
            mask = "countryPhone"
        }
        mask = options.mask || mask;
        
        if ($.knockoutExtend.defaults.culture.changeMaskFunction != null && valueAccessor() != null) {
            mask = $.knockoutExtend.defaults.culture.changeMaskFunction(valueAccessor()(), options);
        }

        if ($(element).is("input"))
            $(element).setMask(mask);

        ko.utils.registerEventHandler(element, 'focusout', function () {
            var observable = valueAccessor();
            var valor = $(element).val().replace(/[^\d]+/g, '');
            observable(valor);
            if (observable.isValid != null) {
                observable.isValid();
            }
        });

        ko.utils.registerEventHandler(element, 'keydown', function () {
            currentValue = $(element).val().replace(/[^\d]+/g, '');
            var mask;
            if ($.knockoutExtend.defaults.culture.changeMaskFunction != null) {
                mask = $.knockoutExtend.defaults.culture.changeMaskFunction(currentValue, options);
                $(element).setMask(mask);
            }
            else {
                $(element).setMask(mask);
            }
        });


        ko.utils.domNodeDisposal.addDisposeCallback(element, function () {
        });
    },

    update: function (element, valueAccessor, allBindingsAccessor) {
        var options = allBindingsAccessor().phoneMaskOptions || {};
        var value = ko.utils.unwrapObservable(valueAccessor());

        var mask = 'phone';
        //var newMask;
        if (options.country) {
            mask = "countryPhone"
        }

        mask = options.mask || mask;

        if ($.knockoutExtend.defaults.culture.changeMaskFunction != null && valueAccessor() != null) {
            mask = $.knockoutExtend.defaults.culture.changeMaskFunction(valueAccessor()(), options);
        }

        if (value == null) {
            $(element).val(null);
            return;
        }
        if ($(element).is("input")) {
            $(element).val(value);
            $(element).setMask(mask);
        }
        else {
            $(element).text($.mask.string(value, mask));
        }
    }
};
if (ko.validation != null) {
    ko.validation.makeBindingHandlerValidatable('phoneMask');
}

if (ko.validation != null) {
    ko.validation.registerExtenders();
}

