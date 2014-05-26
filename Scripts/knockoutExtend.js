$.knockoutExtend = {};
$.knockoutExtend.defaults = {
    culture: { changeMaskFunction: null },
    fileUpload: {
        url: "/FileUpload",
        previewNoImageUrl: '/Scripts/knockoutExtend/fileupload/img/generalFile.png',
        deleteUrl: '/'
    }
};
$.knockoutExtend.loaded = false;

$.knockoutExtend.load = function (baseUrl, locale, successCalback) {

    var arrayPath = new Array();
    var createArrayItem = function (url, type, templateName) {
        this.url = url;
        this.type = type;
        this.templateName = templateName;
    }

    var count = 0;
    var executeSuccess = false;

    var successFunctionJson =
        function (data) {
            Globalize.load(data);
            count++;
            if (count = arrayPath.length - 1) {
                $.knockoutExtend.loaded = true;
                if (successCalback != null && !executeSuccess) {
                    executeSuccess = true;
                    successCalback();
                }
            }
        }
    var successFunctionTemplate =
        function (data, name) {
            var template = document.createElement('script');
            template.setAttribute("type", "text/x-tmpl");
            template.setAttribute("id", name);
            template.innerHTML = data;
            document.getElementsByTagName("head")[0].appendChild(template);
            count++;
            if (count = arrayPath.length - 1) {
                $.knockoutExtend.loaded = true;
                if (successCalback != null && !executeSuccess) {
                    executeSuccess = true;
                    successCalback();
                }
            }
        }
    arrayPath = new Array();
    arrayPath.push(new createArrayItem(baseUrl + "Globalize/cldr/i18n/segments/" + locale + "/exceptions.json", '.json'));

    arrayPath.push(new createArrayItem(baseUrl + "Globalize/cldr/i18n/supplemental/likelySubtags.json", '.json'));
    arrayPath.push(new createArrayItem(baseUrl + "Globalize/cldr/i18n/supplemental/timeData.json", '.json'));
    arrayPath.push(new createArrayItem(baseUrl + "Globalize/cldr/i18n/supplemental/weekData.json", '.json'));
    arrayPath.push(new createArrayItem(baseUrl + "Globalize/cldr/i18n/supplemental/calendarData.json", '.json'));
    arrayPath.push(new createArrayItem(baseUrl + "Globalize/cldr/i18n/supplemental/calendarPreferenceData.json", '.json'));
    arrayPath.push(new createArrayItem(baseUrl + "Globalize/cldr/i18n/supplemental/currencyData.json", '.json'));
    arrayPath.push(new createArrayItem(baseUrl + "Globalize/cldr/i18n/supplemental/dayPeriods.json", '.json'));
    arrayPath.push(new createArrayItem(baseUrl + "Globalize/cldr/i18n/supplemental/numberingSystems.json", '.json'));

    arrayPath.push(new createArrayItem(baseUrl + "Globalize/cldr/i18n/main/" + locale + "/listPatterns.json", '.json'));
    arrayPath.push(new createArrayItem(baseUrl + "Globalize/cldr/i18n/main/" + locale + "/dateFields.json", '.json'));
    arrayPath.push(new createArrayItem(baseUrl + "Globalize/cldr/i18n/main/" + locale + "/ca-gregorian.json", '.json'));
    arrayPath.push(new createArrayItem(baseUrl + "Globalize/cldr/i18n/main/" + locale + "/numbers.json", '.json'));
    arrayPath.push(new createArrayItem(baseUrl + "Globalize/cldr/i18n/main/" + locale + "/currencies.json", '.json'));

    arrayPath.push(new createArrayItem(baseUrl + "Templates/fileUpload-Download.html", '.html', 'template-download'));
    arrayPath.push(new createArrayItem(baseUrl + "Templates/fileUpload-Upload.html", '.html', 'template-upload'));
    arrayPath.push(new createArrayItem(baseUrl + "Templates/fileUpload.html", '.html', 'fileUpload'));

    for (var i = 0; i < arrayPath.length; i++) {
        var item = arrayPath[i];
        switch (item.type) {
            case '.json':
                $.getJSON(item.url, null, successFunctionJson);
                break;
            case '.html':

                var wrapperFunc = function (data) {
                    var name;
                    if (data.indexOf('name=fileUpload-Download') != -1) {
                        data = data.replace('name=fileUpload-Download', '');
                        name = 'template-download';
                    }
                    if (data.indexOf('name=fileUpload-Upload') != -1) {
                        data = data.replace('name=fileUpload-Upload', '');
                        name = 'template-upload';
                    }
                    if (data.indexOf('name=fileUpload') != -1) {
                        data = data.replace('name=fileUpload', '');
                        name = 'template-fileUpload';
                    }

                    successFunctionTemplate(data, name);
                }
                $.get(item.url, null, wrapperFunc, 'html');
                break;
        }
    }
}