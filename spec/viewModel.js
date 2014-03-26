var viewModel = new function () {
    var self = this;

    self.NormalText = ko.observable();
    
    self.IntegerValue = ko.observable();
    self.AnotherIntegerValue = ko.observable();

    self.DecimalValue = ko.observable();
    self.AnotherDecimalValue = ko.observable();

    self.DateValue = ko.observable();
    self.AnotherDateValue = ko.observable();

    self.DateTimeValue = ko.observable();
    self.AnotherDateTimeValue = ko.observable();

    self.PercentValue = ko.observable();
    self.AnotherPercentValue = ko.observable();


    self.Load = 
        function () {
            self.NormalText('It\'s normal text');

            self.IntegerValue(2);
            self.AnotherIntegerValue(5);

            self.DecimalValue(2);
            self.AnotherDecimalValue(2);

            self.DateValue(new Date('2014-01-01 12:00:00'));
            self.AnotherDateValue(new Date('2014-01-01 12:00:00'));

            self.DateTimeValue(new Date('2014-01-01 12:00:00'));
            self.AnotherDateTimeValue(new Date('2014-01-01 12:00:00'));

            self.PercentValue(.15);
            self.AnotherPercentValue(.15);


        }



    ko.applyBindings(self, $('.container')[0]);

}();