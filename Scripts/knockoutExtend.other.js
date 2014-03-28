ko.bindingHandlers.creditCardMask = {
    init: function (element, valueAccessor, allBindingsAccessor) {
        var options = allBindingsAccessor().currencyMaskOptions || {};

        if ($(element).is("input"))
            $(element).setMask('cc');

        ko.utils.registerEventHandler(element, 'focusout', function () {
            var observable = valueAccessor();
            observable($(element).val());
            observable.isValid();
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
            $(element).setMask('cc');
        }
        else {
            $(element).text($.mask.string(value, 'cc'));
        }
    }
};
if (ko.validation != null) {
    ko.validation.makeBindingHandlerValidatable('creditCardMask');
}

ko.bindingHandlers.cnpjMask = {
    init: function (element, valueAccessor, allBindingsAccessor) {
        var options = allBindingsAccessor().currencyMaskOptions || {};

        if ($(element).is("input"))
            $(element).setMask('cnpj');

        ko.utils.registerEventHandler(element, 'focusout', function () {
            var observable = valueAccessor();
            var valor = $(element).val().replace(/[^\d]+/g, '');
            observable(valor);
            observable.isValid();
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
            $(element).setMask('cnpj');
        }
        else {
            $(element).text($.mask.string(value, 'cnpj'));
        }
    }
};
if (ko.validation != null) {
    ko.validation.makeBindingHandlerValidatable('cnpjMask');
}


ko.bindingHandlers.cpfMask = {
    init: function (element, valueAccessor, allBindingsAccessor) {
        var options = allBindingsAccessor().currencyMaskOptions || {};

        if ($(element).is("input"))
            $(element).setMask('cpf');

        ko.utils.registerEventHandler(element, 'focusout', function () {
            var observable = valueAccessor();
            var valor = $(element).val().replace(/[^\d]+/g, '');
            observable(valor);
            observable.isValid();
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
            $(element).setMask('cpf');
        }
        else {
            $(element).text($.mask.string(value, 'cpf'));
        }
    }
};
if (ko.validation != null) {
    ko.validation.makeBindingHandlerValidatable('cpfMask');
}