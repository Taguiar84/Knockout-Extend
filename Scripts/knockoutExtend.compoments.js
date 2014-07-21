ko.bindingHandlers.wysiwyg = {
    init: function (element, valueAccessor, allBindingsAccessor, context) {
        var options = allBindingsAccessor().ckeditorOptions || {};
        var modelValue = valueAccessor();
        var value = ko.utils.unwrapObservable(valueAccessor());

        $(element).html(value);
        var editor = CKEDITOR.replace(element, {
            toolbar: 'Standard'
        });

        //handle edits made in the editor
        editor.on('change', function (e) {
            var self = this;
            if (ko.isWriteableObservable(self)) {
                self(e.editor.getData());
            }
        }, modelValue, element);

        //handle disposal (if KO removes by the template binding)
        ko.utils.domNodeDisposal.addDisposeCallback(element, function () {
            if (editor) {
                CKEDITOR.remove(editor);
            };
        });
    },
    update: function (element, valueAccessor, allBindingsAccessor, context) {
        // handle programmatic updates to the observable
        var newValue = ko.utils.unwrapObservable(valueAccessor());
        var id = $(element).attr('id');

        if (CKEDITOR.instances[id].getData() != newValue)
            CKEDITOR.instances[id].setData(newValue);
    }
};

ko.bindingHandlers.fileupload = {
    init: function (element, valueAccessor) {

        var defaults = {
            options: {
                disableImageResize: false,
                autoUpload: true,
                url: $.knockoutExtend.defaults.fileUpload.url
            }
            , observable: viewModel != null && viewModel.FileUpload != null ? viewModel.FileUpload : null
        };

        defaults = $.extend(true, defaults, valueAccessor());

        var observable = defaults.observable;//pode ser passado pela configuração


        observable.subscribe(function (value) {
            if (value.length == 0)
                $(element).find('button:not(:reset) + .cancel').click();;

        });

        $(element).append($('#template-fileUpload').html());
        $(element).fileupload(defaults.options)
            .bind('fileuploaddone', function (e, data) {
            })
            .bind('fileuploadcompleted', function (e, data) {

                var file = data.result.files[0];

                $(data.context).find('.size').text(file.size);
                $(data.context).find('.name').text(file.displayName);

                var element = $(data.context).find('.preview')[0];

                if (!file.thumbnail_url) {
                    file.thumbnail_url = $.knockoutExtend.defaults.fileUpload.previewNoImageUrl
                }

                var preview = "<a href=\"" + file.url + "\" title=\"" + file.displayName + "\" download=\"" + file.name + "\" data-gallery><img src=\"" + file.thumbnail_url + "\" style=\"width: 32px; height: 32px\" ></a>";
                $(element).html(preview);

                var btnRemove = $(data.context).find('button')[0];

                var icone = $(btnRemove).find('.glyphicon-ban-circle');
                icone.removeClass('glyphicon-ban-circle');
                icone.addClass('glyphicon-remove-circle');

                //register in viewModel
                if (observable != null) {
                    observable.push(file);
                }

                $(btnRemove).bind("click", function () {
                    $.ajax($.knockoutExtend.defaults.fileUpload.deleteUrl + file.delete_url, { type: 'DELETE' })
                    observable.remove(function (item) { return item.name == file.name });
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
        //alert('laga');

    }
};



//ko.bindingHandlers.endereco = {
//    init: function (element, valueAccessor, allBindingsAccessor) {

//        //Register templates
//        //if ($('#addressForm').length == 0) {

//        //    //Coloca template
//        //    var script = document.createElement('script');
//        //    script.type = 'text/x-tmpl';
//        //    script.id = "template-addressForm";
//        //    $(script).text(templateLoad.AddressTemplate());
//        //    $("body").append(script);

//        //    //Registra local para aplicar template
//        //    var div = document.createElement('div');            
//        //    div.id = "addressForm";
//        //    $(div).html(templateLoad.AddressTemplate());
//        //    $(".page-content").append(div);

//        //    ko.renderTemplate("template-addressForm", viewModel.addressCurrent, {}, $("#addressForm")[0], "replaceNode");          
//        //}

//        var menuContextId = allBindingsAccessor().contextMenu;
//        $(element).contextmenu({
//            target: "#" + menuContextId,            
//        });
//        $(element).prop('readonly', true);
//        $(element).after('<small style=\"color: #999999\">' + core.culture.address_ToolTip() + '</small>');

//        //Colocando informação de visualização
//        var logradouro = "";
//        var cidade = Enumerable.From(viewModel.CidadeList())
//            .Where(function (x) { return x.Cid_Cidade_Id() == valueAccessor().Cid_Cidade_Id() })
//            .FirstOrDefault();
//        var estado = Enumerable.From(viewModel.EstadoList())
//            .Where(function (x) { return x.Est_Estado_Id() == valueAccessor().Est_Estado_Id() })
//            .FirstOrDefault();
//        var cid_Name = cidade == null ? "" : cidade.Cid_Name();
//        var est_UF = estado == null ? "" : estado.Est_UF();
//        if (valueAccessor().End_Logradouro() != null || valueAccessor().End_Numero() != null)
//            logradouro = valueAccessor().End_Logradouro() + ", " + valueAccessor().End_Numero();
//        if(cid_Name != "" || est_UF != "")
//            logradouro += " - " + cid_Name + "/" + est_UF;        
//        $(element).val(logradouro);


//        ko.utils.domNodeDisposal.addDisposeCallback(element, function () {
//            //$(element).select2('destroy');
//        });
//    },
//    update: function (element) {
//        //$(element).trigger('change');
//    }
//};

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

ko.bindingHandlers.jstree = {
    init: function (element, valueAccessor, allBindingsAccessor) {
        var options = allBindingsAccessor().jstreeOptions || {};
        var modelValue = valueAccessor();
        var value = ko.utils.unwrapObservable(valueAccessor());

        var array = [];
        function convertObject(item) {
            var obj = {};

            if ($(item).attr(modelValue.optionsValue) != null)
                obj.id = $(item).attr(modelValue.optionsValue)

            if ($(item).attr(modelValue.optionsText) != null)
                obj.text = $(item).attr(modelValue.optionsText);

            if ($(item).attr("li_attr") != null)
                obj.li_attr = $(item).attr("li_attr");

            if ($(item).attr("a_attr") != null)
                obj.a_attr = $(item).attr("a_attr");

            if ($(item).attr("parent") != null)
                obj.parent = $(item).attr("parent");

            if ($(item).attr("state") != null)
                obj.state = $(item).attr("state");

            if ($(item).attr(modelValue.optionsChildrens) != null) {
                var arrayFilho = [];
                $.each($(item).attr(modelValue.optionsChildrens), function (index, value) {
                    arrayFilho.push(convertObject(value));
                });
                obj.children = arrayFilho;
            }

            obj.data = item;

            return obj;
        };

        if ($(modelValue).attr('optionsValue') != null || $(modelValue).attr('optionsText') != null) {
            $.each(modelValue.options(), function (index, value) {
                array.push(convertObject(value));
            });
        }
        else
            array = modelValue.options();

        $(element).jstree({
            'core': {
                'data': array
            },
            "checkbox": options,
            "search": {
                "fuzzy": false
            },
            'plugins': ['checkbox', 'search']
        })
        .on('ready.jstree', function (e, data) {
            $.jstree.reference(element).deselect_all(true);
            $.each(modelValue.optionsSelected(), function (key, value) {
                if ($(modelValue).attr('optionsValue') != null)
                    $(element).jstree("select_node", $(value).attr(modelValue.optionsValue));
                else
                    $(element).jstree("select_node", value);
            });
        })
        .on('changed.jstree', function (e, data) {
            var allSelected = $(element).jstree("get_selected", true);
            var selectedChildren = [];
            $.each(allSelected, function (key, value) {
                selectedChildren.push(value.id);
            });
            modelValue.optionsSelected(selectedChildren);
        });
    },
    update: function (element, valueAccessor) {
        var modelValue = valueAccessor();

        $(element).jstree("deselect_all", true);
        $(element).jstree("clear_search");
        $(element).jstree("close_all");
        $.each(modelValue.optionsSelected(), function (key, value) {
            if ($(modelValue).attr('optionsValue') != null)
                $.jstree.reference(element).select_node($(value).attr(modelValue.optionsValue));
            else
                $.jstree.reference(element).select_node(value);
        });
    }
};

//ko.bindingHandlers.carousel = {

//    init: function (element, valueAccessor) {
//        if ($('#carouselView').length == 0) {
//            $("body").append(templateLoad.Carousel_ViewTemplate());
//        }
//        if ($('#template-carouselThumbnail').length == 0) {
//            var script = document.createElement('script');
//            script.type = 'text/x-tmpl';
//            script.id = "template-carouselThumbnail";
//            $(script).text(templateLoad.Carousel_ThumbnailTemplate());
//            $("body").append(script);
//        }


//        //$(element).append("<div id='thumbnailRegion'></div>");
//        //var region = $(element).find('#thumbnailRegion')[0];
//        //ko.renderTemplate("template-carouselThumbnail", valueAccessor().observable, {}, region, "replaceNode");

//        $(element).append(templateLoad.Carousel_ThumbnailTemplate());



//        //$(element).find('.thumbnail').click(function () {
//        //    $('.modal-body').empty();
//        //    var title = $(this).parent('a').attr("title");
//        //    $('.modal-title').html(title);
//        //    $($(this).parents('div').html()).appendTo('.modal-body');
//        //    $('#myModal').modal({ show: true });
//        //});

//    },
//    update: function (element) {
//        //$(element).find('.thumbnail').click(function () {
//        //    $('.modal-body').empty();
//        //    var title = $(this).parent('a').attr("title");
//        //    $('.modal-title').html(title);
//        //    $($(this).parents('div').html()).appendTo('.modal-body');
//        //    $('#myModal').modal({ show: true });
//        //});
//    }

//}
//ko.bindingHandlers.fileupload = {
//    init: function (element, valueAccessor) {

//        //Register templates
//        if ($('#template-download').length == 0) {
//            var script = document.createElement('script');
//            script.type = 'text/x-tmpl';
//            script.id = "template-download";
//            $(script).text(templateLoad.FileUpload_DownloadTemplate());
//            $("body").append(script);
//        }
//        if ($('#template-upload').length == 0) {
//            var script = document.createElement('script');
//            script.type = 'text/x-tmpl';
//            script.id = "template-upload";
//            $(script).text(templateLoad.FileUpload_UploadTemplate());
//            $("body").append(script);
//        }

//        var defaults = {
//            disableImageResize: false,
//            autoUpload: true,
//            url: core.urlBaseWebApi() + "FileUpload"
//            , observable: viewModel != null && viewModel.FileUpload != null ? viewModel.FileUpload : null
//        };

//        defaults = $.extend(true, defaults, valueAccessor());

//        var observable = defaults.observable;//pode ser passado pela configuração

//        $(element).append(templateLoad.FileUpload());
//        $(element).fileupload(defaults)
//            .bind('fileuploaddone', function (e, data) {
//            })
//            .bind('fileuploadcompleted', function (e, data) {
//                $(data.context).find('.size').text('ok');
//                $(data.context).find('.name').text(data.result[0].displayName);
//                //data.result
//                var btnRemove = $(data.context).find('.glyphicon-ban-circle');
//                btnRemove.removeClass('glyphicon-ban-circle');
//                btnRemove.addClass('glyphicon-remove-circle');

//                var retorno = data.result[0];

//                //register in viewModel
//                if (observable != null) {
//                    observable.push(data.result[0]);
//                }

//                $(btnRemove).bind("click", function () {
//                    $.asyncRequest.delete({
//                        Url: core.urlBaseWebApi() + retorno.delete_url
//                    });
//                    observable.remove(function (item) { return item.name == retorno.name });
//                });
//            })
//        //.bind('fileuploadprocessdone', function (e, data) {
//        //    alert(data);
//        //})

//        ko.utils.domNodeDisposal.addDisposeCallback(element, function () {
//            $(element).fileupload('destroy');
//        });
//    },
//    update: function (element) {
//        //$(element).multiSelect('refresh');
//    }
//};
if (ko.validation != null) {
    ko.validation.registerExtenders();
}