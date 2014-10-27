ko.bindingHandlers.monthYearMask = {
    init: function (element, valueAccessor, allBindingsAccessor) {
        var options = allBindingsAccessor().monthYearMaskOptions || {};

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
        //corrigindo locale com Cldr, agora "pt" é igual "pt-BR", portugal continua com pt-PT
        var locale = Globalize.locale().locale == 'pt' ? 'pt-BR' : Globalize.locale().locale;

        var options = $.extend({},            
            {//extra para colocar linguagem do globalize
                language: locale,
                //format: 'dd/mm/yyyy'//Pensar melhor
            }
        ,
        allBindingsAccessor().dateMaskOptions//definido na tela
        )       

        if ($(element).is("input")) {
            $(element).setMask('date');
            $(element).datepicker(options);
        }

        ko.utils.registerEventHandler(element, 'changeDate', function (e) {
            //var observable = valueAccessor();
            //var date = new Date(e.date.toUTCString())
            //date.setMinutes(e.date.getTimezoneOffset() + e.date.getMinutes())
            //observable(date);
        });

        ko.utils.registerEventHandler(element, 'focusout', function () {
            var observable = valueAccessor();
            var value = $(element).val();
            switch (Globalize.locale().locale) {
                case 'en-US':
                    dateValue = new Date(value);
                    break;
                default:
                    dateValue = Globalize.parseDate(value, "yMd");
                    break;
            }
            observable(dateValue);
            if (dateValue != null) {
                $(element).datepicker("setDate", dateValue);
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
        var valor = new Date(value);
        var format = { date: "short" }

        if ($(element).is("input")) {
            $(element).val(Globalize.formatDate(valor, format));
            //$(element).setMask('date');
            $(element).datepicker("setDate", valor);
        }
        else {
            $(element).text(Globalize.formatDate(valor, format));
        }
    }
};
if (ko.validation != null) {
    ko.validation.makeBindingHandlerValidatable('dateMask');
}


ko.bindingHandlers.dateTimeMask = {
    init: function (element, valueAccessor, allBindingsAccessor) {
        //corrigindo locale com Cldr, agora "pt" é igual "pt-BR", portugal continua com pt-PT
        var locale = Globalize.locale().locale == 'pt' ? 'pt-BR' : Globalize.locale().locale;
        var options = $.extend({},            
            {//extra para colocar linguagem do globalize
                language: locale,
                //timeFormat: 'hh:mm z',
                //showTimezone: true,
                //TimeZone: "-0400"
                //pickDate: false
                //format: 'dd/mm/yyyy hh:ii'
            }
        , allBindingsAccessor().dateTimeMaskOptions)
        if ($(element).is("input")) {
            $(element).setMask('datetime');
            $(element).datetimepicker(options);
        }

        ko.utils.registerEventHandler(element, 'changeDate', function (e) {
            var observable = valueAccessor();
            var date = new Date(e.date.toUTCString())
            date.setMinutes(e.date.getTimezoneOffset() + e.date.getMinutes())
            observable(date);
        });

        ko.utils.registerEventHandler(element, 'focusout', function () {
            var observable = valueAccessor();
            var value = $(element).val();
            var dateValue = null;
            switch (Globalize.locale().locale) {
                case 'en-US':
                    dateValue = new Date(value);
                    break;
                default:
                    dateValue = Globalize.parseDate(value, {}, Globalize.locale().locale);
                    break;
            }
            observable(dateValue);
            if (dateValue != null) {
                $(element).datetimepicker("setDate", dateValue);
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
        var valor = new Date(value);
        var format = { datetime: "short" }
        if ($(element).is("input")) {
            $(element).val(Globalize.formatDate(valor, format));
            $(element).setMask('datetime');
            $(element).datetimepicker("setDate", valor);
        }
        else {
            $(element).text(Globalize.formatDate(valor, format));
        }
    }
};
if (ko.validation != null) {
    ko.validation.makeBindingHandlerValidatable('dateTimeMask');
}


ko.bindingHandlers.dateTimeOffSetMask = {
    init: function (element, valueAccessor, allBindingsAccessor) {
        var options = allBindingsAccessor().currencyMaskOptions || {};

        //corrigindo locale com Cldr, agora "pt" é igual "pt-BR", portugal continua com pt-PT
        var locale = Globalize.locale().locale == 'pt' ? 'pt-BR' : Globalize.locale().locale;
        if ($(element).is("input")) {
            $(element).setMask('datetime');
            $(element).datetimepicker({
                language: locale,
                //timeFormat: 'hh:mm z',
                //showTimezone: true,
                //TimeZone: "-0400"
                //pickDate: false
                //format: 'dd/mm/yyyy hh:ii'
            });
        }


        ko.utils.registerEventHandler(element, 'changeDate', function (e) {
            var observable = valueAccessor();
            var date = new Date(e.date.toUTCString())
            date.setMinutes(e.date.getTimezoneOffset() + e.date.getMinutes())
            observable(date);
        });

        ko.utils.registerEventHandler(element, 'focusout', function () {
            var observable = valueAccessor();
            var value = $(element).val();
            var dateValue = null;
            switch (Globalize.locale().locale) {
                case 'en-US':
                    dateValue = new Date(value);
                    break;
                default:
                    dateValue = Globalize.parseDate(value, {}, Globalize.locale().locale);
                    break;
            }
            observable(dateValue);
            if (dateValue != null) {
                $(element).datetimepicker("setDate", dateValue);
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
        var valor = new Date(value);
        var format = { datetime: "short" }
        if ($(element).is("input")) {
            $(element).val(Globalize.formatDate(valor, format));
            $(element).setMask('datetime');
            $(element).datetimepicker("setDate", valor);
        }
        else {
            $(element).text(Globalize.formatDate(valor, format));
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
                showMeridian: false,
                defaultTime: false
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
            //var numberValue = null;
            //switch (Globalize.locale().locale) {
            //    case 'en-US':
            //        numberValue = new Date(value);
            //        break;
            //    default:
            //        numberValue = Globalize.parseDate(value);
            //        break;
            //}
            $(element).timepicker("setTime", value);
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
        //var valor = new Date(value);
        if ($(element).is("input")) {
            //var format = Globalize.culture().calendar.patterns.T;
            $(element).val(value);
            $(element).timepicker("setTime", value);
            //$('#timepicker').timepicker('setTime', '12:45 AM');
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