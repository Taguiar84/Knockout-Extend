ko.bindingHandlers.endereco = {
    init: function (element, valueAccessor, allBindingsAccessor) {

        //Register templates
        //if ($('#addressForm').length == 0) {

        //    //Coloca template
        //    var script = document.createElement('script');
        //    script.type = 'text/x-tmpl';
        //    script.id = "template-addressForm";
        //    $(script).text(templateLoad.AddressTemplate());
        //    $("body").append(script);

        //    //Registra local para aplicar template
        //    var div = document.createElement('div');            
        //    div.id = "addressForm";
        //    $(div).html(templateLoad.AddressTemplate());
        //    $(".page-content").append(div);

        //    ko.renderTemplate("template-addressForm", viewModel.addressCurrent, {}, $("#addressForm")[0], "replaceNode");          
        //}

        var menuContextId = allBindingsAccessor().contextMenu;
        $(element).contextmenu({
            target: "#" + menuContextId,            
        });
        $(element).prop('readonly', true);
        $(element).after('<small style=\"color: #999999\">' + core.culture.address_ToolTip() + '</small>');

        //Colocando informação de visualização
        var logradouro = "";
        var cidade = Enumerable.From(viewModel.CidadeList())
            .Where(function (x) { return x.Cid_Cidade_Id() == valueAccessor().Cid_Cidade_Id() })
            .FirstOrDefault();
        var estado = Enumerable.From(viewModel.EstadoList())
            .Where(function (x) { return x.Est_Estado_Id() == valueAccessor().Est_Estado_Id() })
            .FirstOrDefault();
        var cid_Name = cidade == null ? "" : cidade.Cid_Name();
        var est_UF = estado == null ? "" : estado.Est_UF();
        if (valueAccessor().End_Logradouro() != null || valueAccessor().End_Numero() != null)
            logradouro = valueAccessor().End_Logradouro() + ", " + valueAccessor().End_Numero();
        if(cid_Name != "" || est_UF != "")
            logradouro += " - " + cid_Name + "/" + est_UF;        
        $(element).val(logradouro);


        ko.utils.domNodeDisposal.addDisposeCallback(element, function () {
            //$(element).select2('destroy');
        });
    },
    update: function (element) {
        //$(element).trigger('change');
    }
};

ko.bindingHandlers.select2 = {
    init: function (element, valueAccessor) {
        $(element).select2(valueAccessor());

        ko.utils.domNodeDisposal.addDisposeCallback(element, function () {
            $(element).select2('destroy');
        });
    },
    update: function (element) {
        $(element).trigger('change');
    }
};

ko.bindingHandlers.multiselect = {
    init: function (element, valueAccessor) {
        $(element).multiSelect(valueAccessor());

        if (valueAccessor().availableObs != null) {
            valueAccessor().availableObs.subscribe(function (value) {
                $(element).multiSelect('refresh');
            });
        }
        if (valueAccessor().selectedObs != null) {
            valueAccessor().selectedObs.subscribe(function (value) {
                $(element).multiSelect('refresh');
            });
        }

        ko.utils.domNodeDisposal.addDisposeCallback(element, function () {
            $(element).multiSelect('destroy');
        });
    },
    update: function (element) {
        $(element).multiSelect('refresh');
    }
};

ko.bindingHandlers.colorpicker = {
    init: function (element, valueAccessor) {
        var value = ko.utils.unwrapObservable(valueAccessor());
        $(element).val(value);
        $(element).colorpicker();

        $(element).colorpicker().on('changeColor', function (ev) {
            $(element).val(ev.color.toHex());
            $(element).change();
        });

        ko.utils.registerEventHandler(element, "change", function () {
            var observable = valueAccessor();
            observable($(element).val());
        });

        ko.utils.domNodeDisposal.addDisposeCallback(element, function () {
            $(element).colorpicker('hide');
        });
    },
    update: function (element, valueAccessor) {
        var value = ko.utils.unwrapObservable(valueAccessor());
        $(element).val(value);
        $(element).change();
    }
};

ko.bindingHandlers.carousel = {

    init: function (element, valueAccessor) {
        if ($('#carouselView').length == 0) {
            $("body").append(templateLoad.Carousel_ViewTemplate());
        }
        if ($('#template-carouselThumbnail').length == 0) {
            var script = document.createElement('script');
            script.type = 'text/x-tmpl';
            script.id = "template-carouselThumbnail";
            $(script).text(templateLoad.Carousel_ThumbnailTemplate());
            $("body").append(script);
        }


        //$(element).append("<div id='thumbnailRegion'></div>");
        //var region = $(element).find('#thumbnailRegion')[0];
        //ko.renderTemplate("template-carouselThumbnail", valueAccessor().observable, {}, region, "replaceNode");

        $(element).append(templateLoad.Carousel_ThumbnailTemplate());
        


        //$(element).find('.thumbnail').click(function () {
        //    $('.modal-body').empty();
        //    var title = $(this).parent('a').attr("title");
        //    $('.modal-title').html(title);
        //    $($(this).parents('div').html()).appendTo('.modal-body');
        //    $('#myModal').modal({ show: true });
        //});

    },
    update: function (element) {
        //$(element).find('.thumbnail').click(function () {
        //    $('.modal-body').empty();
        //    var title = $(this).parent('a').attr("title");
        //    $('.modal-title').html(title);
        //    $($(this).parents('div').html()).appendTo('.modal-body');
        //    $('#myModal').modal({ show: true });
        //});
    }

}
ko.bindingHandlers.fileupload = {
    init: function (element, valueAccessor) {

        //Register templates
        if ($('#template-download').length == 0) {
            var script = document.createElement('script');
            script.type = 'text/x-tmpl';
            script.id = "template-download";
            $(script).text(templateLoad.FileUpload_DownloadTemplate());
            $("body").append(script);
        }
        if ($('#template-upload').length == 0) {
            var script = document.createElement('script');
            script.type = 'text/x-tmpl';
            script.id = "template-upload";
            $(script).text(templateLoad.FileUpload_UploadTemplate());
            $("body").append(script);
        }

        var defaults = {
            disableImageResize: false,
            autoUpload: true,
            url: core.urlBaseWebApi() + "FileUpload"
            , observable: viewModel != null && viewModel.FileUpload != null ? viewModel.FileUpload : null
        };

        defaults = $.extend(true, defaults, valueAccessor());

        var observable = defaults.observable;//pode ser passado pela configuração

        $(element).append(templateLoad.FileUpload());
        $(element).fileupload(defaults)
            .bind('fileuploaddone', function (e, data) {
            })
            .bind('fileuploadcompleted', function (e, data) {
                $(data.context).find('.size').text('ok');
                $(data.context).find('.name').text(data.result[0].displayName);
                //data.result
                var btnRemove = $(data.context).find('.glyphicon-ban-circle');
                btnRemove.removeClass('glyphicon-ban-circle');
                btnRemove.addClass('glyphicon-remove-circle');

                var retorno = data.result[0];

                //register in viewModel
                if (observable != null) {
                    observable.push(data.result[0]);
                }

                $(btnRemove).bind("click", function () {
                    $.asyncRequest.delete({
                        Url: core.urlBaseWebApi() + retorno.delete_url
                    });
                    observable.remove(function (item) { return item.name == retorno.name });
                });
            })
        //.bind('fileuploadprocessdone', function (e, data) {
        //    alert(data);
        //})

        ko.utils.domNodeDisposal.addDisposeCallback(element, function () {
            $(element).fileupload('destroy');
        });
    },
    update: function (element) {
        //$(element).multiSelect('refresh');
    }
};



ko.extenders.trackChange = function (target, track) {
    if (track) {
        target.isDirty = ko.observable(false);
        target.originalValue = target();
        target.subscribe(function (newValue) {
            // use != not !== so numbers will equate naturally
            target.isDirty(newValue != target.originalValue);
        });
        if (window.__trackedElement == null)
            window.__trackedElement = new Array();
        window.__trackedElement.push(target);
    }
    return target;
};

ko.validation.registerExtenders();
ko.validation.init({ insertMessages: false });