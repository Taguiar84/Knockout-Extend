﻿var viewModel = new function () {
    var self = this;

    self.NormalText = ko.observable();
    
    self.IntegerValue = ko.observable();
    self.AnotherIntegerValue = ko.observable();

    self.CurrencyValue = ko.observable();
    self.AnotherCurrencyValue = ko.observable();

    self.DateValue = ko.observable();
    self.AnotherDateValue = ko.observable();

    self.DateTimeValue = ko.observable();
    self.AnotherDateTimeValue = ko.observable();

    self.PercentValue = ko.observable();
    self.AnotherPercentValue = ko.observable();


    self.Load = 
        function () {
            self.NormalText('It\'s normal text');

            self.IntegerValue(null);
            self.IntegerValue(2);
            self.AnotherIntegerValue(5);

            self.CurrencyValue(null);
            self.CurrencyValue(2.46);
            self.AnotherCurrencyValue(0.20);

            self.DateValue(new Date('2014-01-01 12:00:00'));
            self.AnotherDateValue(new Date('2014-01-01 12:00:00'));

            self.DateTimeValue(new Date('2014-01-01 12:00:00'));
            self.AnotherDateTimeValue(new Date('2014-01-01 12:00:00'));

            self.PercentValue(.15);
            self.AnotherPercentValue(.15);


        }

    self.Apply =
        function (locale) {
            var element = $('.container')[0];
            ko.cleanNode(element);
            //loadjscssfile("Scripts/i18n/globalize.js", "js");
            loadjscssfile("Scripts/i18n/" + locale + "/globalize.culture.js", "js");
            loadjscssfile("Scripts/i18n/" + locale + "/meio.mask.js", "js");

            setTimeout(function () {
                Globalize.culture(locale);
                ko.applyBindings(self, element);
                self.Load();
            }, 100);
        }

    function loadjscssfile(filename, filetype) {
        if (filetype == "js") { //if filename is a external JavaScript file
            var fileref = document.createElement('script')
            fileref.setAttribute("type", "text/javascript")
            fileref.setAttribute("src", filename)
        }
        else if (filetype == "css") { //if filename is an external CSS file
            var fileref = document.createElement("link")
            fileref.setAttribute("rel", "stylesheet")
            fileref.setAttribute("type", "text/css")
            fileref.setAttribute("href", filename)
        }
        if (typeof fileref != "undefined")
            document.getElementsByTagName("head")[0].appendChild(fileref)
    }


}();