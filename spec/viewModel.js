var viewModel = new function () {
    var self = this;

    self.NormalText = ko.observable();

    self.IntegerValue = ko.observable(null);
    self.AnotherIntegerValue = ko.observable(null);
    self.ShortValue = ko.observable(null);
    self.LongValue = ko.observable(null);

    self.CurrencyValue = ko.observable(null);
    self.AnotherCurrencyValue = ko.observable(null);

    self.DateValue = ko.observable(null);
    self.AnotherDateValue = ko.observable(null);

    self.DateTimeValue = ko.observable(null);
    self.AnotherDateTimeValue = ko.observable(null);

    self.TimeValue = ko.observable(null);
    self.AnotherTimeValue = ko.observable(null);

    self.PercentValue = ko.observable(null);
    self.AnotherPercentValue = ko.observable(null);


    self.PhoneValue = ko.observable(null);
    self.PhoneCountryValue = ko.observable(null);
    self.AnotherPhoneValue = ko.observable(null);
    self.CarPlate = ko.observable(null);

    self.Load =
        function () {
            self.NormalText('It\'s normal text');

            self.IntegerValue(2);
            self.AnotherIntegerValue(5);
            self.ShortValue(3123);
            self.LongValue(8763423746);

            self.CurrencyValue(2.46);
            self.AnotherCurrencyValue(0.20);

            self.DateValue(new Date('2014-01-01 12:00:00'));
            self.AnotherDateValue(new Date('2014-01-01 12:00:00'));

            self.DateTimeValue(new Date('2014-01-01 12:00:00'));
            self.AnotherDateTimeValue(new Date('2014-01-01 12:00:00'));

            self.TimeValue('11:45');
            self.AnotherTimeValue('23:01');

            self.PercentValue(.15);
            self.AnotherPercentValue(.04);

            self.PhoneValue('7991999401');
            self.PhoneCountryValue('157991999401');
            self.AnotherPhoneValue('19993214321');
            self.CarPlate('DEM-6143');
        }

    self.Locale =
        function (locale) {
            //loadjscssfile("Scripts/i18n/globalize.js", "js");
            loadjscssfile("Scripts/i18n/" + locale + "/globalize.culture.js", "js");
            loadjscssfile("Scripts/i18n/" + locale + "/meio.mask.js", "js");
            loadjscssfile("Scripts/i18n/" + locale + "/bootstrap-datepicker.js", "js");
            loadjscssfile("Scripts/i18n/" + locale + "/bootstrap-datetimepicker.js", "js");
            loadjscssfile("Scripts/i18n/" + locale + "/knockoutExtend.culture.js", "js");            
        }

    self.Apply =
        function (locale) {
            var element = $('.container')[0];
            ko.cleanNode(element);
            Globalize.culture(locale);
            ko.applyBindings(self, element);
            self.Load();
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