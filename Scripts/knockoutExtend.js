$.knockoutExtend = {};
$.knockoutExtend.defaults = {
    culture: { changeMaskFunction: null}
};
$.knockoutExtend.loaded = false;

$.knockoutExtend.load = function (baseUrl, locale, successCalback) {

    var arrayPath = new Array();
    var count = 0;
    var successFunction =
        function (json) {
            Globalize.load(json);
            count++;
            if (arrayPath.length == count)
                $.knockoutExtend.loaded = true;

        }
    arrayPath.push(baseUrl + "Globalize/cldr/i18n/segments/" + locale + "/exceptions.json");

    arrayPath.push(baseUrl + "Globalize/cldr/i18n/supplemental/likelySubtags.json");
    arrayPath.push(baseUrl + "Globalize/cldr/i18n/supplemental/timeData.json");
    arrayPath.push(baseUrl + "Globalize/cldr/i18n/supplemental/weekData.json");
    arrayPath.push(baseUrl + "Globalize/cldr/i18n/supplemental/calendarData.json");
    arrayPath.push(baseUrl + "Globalize/cldr/i18n/supplemental/calendarPreferenceData.json");
    arrayPath.push(baseUrl + "Globalize/cldr/i18n/supplemental/currencyData.json");
    arrayPath.push(baseUrl + "Globalize/cldr/i18n/supplemental/dayPeriods.json");
    arrayPath.push(baseUrl + "Globalize/cldr/i18n/supplemental/numberingSystems.json");

    arrayPath.push(baseUrl + "Globalize/cldr/i18n/main/" + locale + "/listPatterns.json");
    arrayPath.push(baseUrl + "Globalize/cldr/i18n/main/" + locale + "/dateFields.json");
    arrayPath.push(baseUrl + "Globalize/cldr/i18n/main/" + locale + "/ca-gregorian.json");
    arrayPath.push(baseUrl + "Globalize/cldr/i18n/main/" + locale + "/numbers.json");
    arrayPath.push(baseUrl + "Globalize/cldr/i18n/main/" + locale + "/currencies.json");


    for (var i = 0; i<arrayPath.length;i++){
        var url = arrayPath[i];
        $.getJSON(url, null, successFunction);
    }

    //$.getJSON(baseUrl + "Globalize/cldr/i18n/segments/" + locale + "/exceptions.json", null, Globalize.load);
    
    //$.getJSON(baseUrl + "Globalize/cldr/i18n/supplemental/likelySubtags.json", null, Globalize.load);
    //$.getJSON(baseUrl + "Globalize/cldr/i18n/supplemental/timeData.json", null, Globalize.load);
    //$.getJSON(baseUrl + "Globalize/cldr/i18n/supplemental/weekData.json", null, Globalize.load);
    //$.getJSON(baseUrl + "Globalize/cldr/i18n/supplemental/calendarData.json", null, Globalize.load);
    //$.getJSON(baseUrl + "Globalize/cldr/i18n/supplemental/calendarPreferenceData.json", null, Globalize.load);
    //$.getJSON(baseUrl + "Globalize/cldr/i18n/supplemental/currencyData.json", null, Globalize.load);
    //$.getJSON(baseUrl + "Globalize/cldr/i18n/supplemental/dayPeriods.json", null, Globalize.load);
    //$.getJSON(baseUrl + "Globalize/cldr/i18n/supplemental/numberingSystems.json", null, Globalize.load);

    //$.getJSON(baseUrl + "Globalize/cldr/i18n/main/" + locale + "/listPatterns.json", null, Globalize.load);
    //$.getJSON(baseUrl + "Globalize/cldr/i18n/main/" + locale + "/dateFields.json", null, Globalize.load);
    //$.getJSON(baseUrl + "Globalize/cldr/i18n/main/" + locale + "/ca-gregorian.json", null, Globalize.load);
    //$.getJSON(baseUrl + "Globalize/cldr/i18n/main/" + locale + "/numbers.json", null, Globalize.load);
    //$.getJSON(baseUrl + "Globalize/cldr/i18n/main/" + locale + "/currencies.json", null, Globalize.load);

    //$.knockoutExtend.loaded = true;
}