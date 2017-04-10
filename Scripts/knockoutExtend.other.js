ko.bindingHandlers.creditCardMask = {
    init: function (element, valueAccessor, allBindingsAccessor) {
        var options = allBindingsAccessor().maskOptions || {};

        if ($(element).is("input"))
            $(element).setMask('cc');

        ko.utils.registerEventHandler(element, 'focusout', function () {
            var observable = valueAccessor();
            var valor = $(element).val().replace(/\s/g, '');
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
        var options = allBindingsAccessor().maskOptions || {};

        if ($(element).is("input"))
            $(element).setMask('cnpj');

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
        var options = allBindingsAccessor().maskOptions || {};

        if ($(element).is("input"))
            $(element).setMask('cpf');

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

ko.bindingHandlers.cpfCnpjMask = {
    init: function (element, valueAccessor, allBindingsAccessor) {
        var options = allBindingsAccessor().maskOptions || {};

        if ($(element).is("input"))
            $(element).setMask('cpf');

        ko.utils.registerEventHandler(element, 'focusout', function () {
            var observable = valueAccessor();
            var valor = $(element).val().replace(/[^\d]+/g, '');
            if (valor != null)
                switch (valor.length) {
                    case 14:
                        $(element).setMask("99.999.999/9999-99");
                        break;
                    case 11:
                    default:
                        $(element).setMask("cpf");
                        break;

                };
            valor = $(element).val().replace(/[^\d]+/g, '');//apos o mask os dados mudam
            observable(valor);
            if (observable.isValid != null) {
                observable.isValid();
            }
        });

        ko.utils.registerEventHandler(element, 'keydown', function () {
            currentValue = $(element).val().replace(/[^\d]+/g, '');
            var mask = "cpf";
            if (currentValue.length >= 11) {
                mask = "99.999.999/9999-99";
            }
            //$(element).unsetMask()
            $(element).setMask(mask);
            //if ($(element).is("input")) {                
            //    $(element).val(currentValue);
            //    var observable = valueAccessor();
            //    observable(currentValue);
            //}
            
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
        //if ($(element).is("input")) {
        //    $(element).val(value);
        //    $(element).setMask('cpf');
        //}
        //else {
        //    $(element).text($.mask.string(value, 'cpf'));
        //}
    }
};
if (ko.validation != null) {
    ko.validation.makeBindingHandlerValidatable('cpfCnpjMask');
}



ko.bindingHandlers.licenceTagMask = {
    init: function (element, valueAccessor, allBindingsAccessor) {
        var options = allBindingsAccessor().maskOptions || {};

        if ($(element).is("input"))
            $(element).setMask('licenceTag');

        ko.utils.registerEventHandler(element, 'focusout', function () {
            var observable = valueAccessor();
            var valor = $(element).val().replace(/[\-]+/g, '');
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
            $(element).setMask('licenceTag');
        }
        else {
            $(element).text($.mask.string(value, 'licenceTag'));
        }
    }
};
if (ko.validation != null) {
    ko.validation.makeBindingHandlerValidatable('licenceTagMask');
}

if (ko.validation != null) {
    ko.validation.registerExtenders();
}