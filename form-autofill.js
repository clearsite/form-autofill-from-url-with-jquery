window.formAutofill = (function ($) {

    var params = {},
        getParams = function () {
            var uri = decodeURI(location.search.substr(1));
            var chunks = uri.split('&');
            var params = Object();

            for (var i = 0; i < chunks.length; i++) {
                var chunk = chunks[i].split('=');
                if (chunk[0].search("\\[\\]") !== -1) {
                    if (typeof params[chunk[0]] === 'undefined') {
                        params[chunk[0]] = [chunk[1]];

                    } else {
                        params[chunk[0]].push(chunk[1]);
                    }


                } else {
                    params[chunk[0]] = chunk[1];
                }
            }

            return params;
        },
        init = function () {
            reset();
            fillText();
            fillSelect();
            fillTextArea();
            fillCheckbox();
            fillRadio();
        },
        reset = function () {
            $(".urlFilled").removeClass('urlFilled');
            params = getParams();
        },
        fillText = function () {
            $.each(params, function (key, value) {
                var fts = ['text', 'email', 'tel', 'phone'];
                for (ft in fts) {
                    $("input[type=" + fts[ft] + "]").each(function () {
                        if (!$(this).is('.urlFilled')) {
                            if ($(this).attr('name') == key && !key.match(/\[\]$/)) {
                                // single
                                // console.log('setting', fts[ft], key, 'to', value);
                                $(this).val(value);
                                $(this).addClass('urlFilled');
                            }
                            else if ($(this).attr('name') == key + "[]" || ( $(this).attr('name').match(/\[.*\]$/) && key.match(/\[.*\]$/) ) ) {
                                // multi
                                if (typeof [] !== typeof value) value = [ value ];
                                $("input[type=" + fts[ft] + "][name='" + $(this).attr('name') + "']").each(function (i) {
                                    $(this).val(value[i] || '');
                                }).addClass('urlFilled');
                            }
                        }
                    });
                }
            });
        },
        fillSelect = function () {
            $.each(params, function (key, value) {
                $('select').each(function () {
                    if (!$(this).is('.urlFilled')) {
                        if ($(this).attr('name') == key && !key.match(/\[\]$/)) {
                            // single
                            // console.log('setting', 'select', key, 'to', value);
                            $(this).val(value);
                            $(this).addClass('urlFilled');
                        }
                        else if ($(this).attr('name') == key + "[]" || ( $(this).attr('name').match(/\[.*\]$/) && key.match(/\[.*\]$/) ) ) {
                            // multi
                            if (typeof [] !== typeof value) value = [ value ];
                            $("select[name='" + $(this).attr('name') + "']").each(function (i) {
                                $(this).val(value[i] || '');
                            }).addClass('urlFilled');
                        }
                    }
                });
            });
        },
        fillTextArea = function () {
            $.each(params, function (key, value) {
                $("textarea").each(function () {
                    if (!$(this).is('.urlFilled')) {
                        if ($(this).attr('name') == key && !key.match(/\[\]$/)) {
                            // single
                            // console.log('setting', 'textarea', key, 'to', value);
                            $(this).val(value);
                            $(this).addClass('urlFilled');
                        }
                        else if ($(this).attr('name') == key + "[]" || ( $(this).attr('name').match(/\[.*\]$/) && key.match(/\[.*\]$/) ) ) {
                            // multi
                            if (typeof [] !== typeof value) value = [ value ];
                            $("textarea[name='" + $(this).attr('name') + "']").each(function (i) {
                                $(this).val(value[i] || '');
                            }).addClass('urlFilled');
                        }
                    }
                });
            });
        },
        fillCheckbox = function () {
            $.each(params, function (key, value) {
                $("input[type=checkbox]").each(function () {
                    if (!$(this).is('.urlFilled')) {
                        if ($(this).attr('name') == key && !key.match(/\[\]$/)) {
                            // single
                            // console.log('setting', 'checkbox', key, 'to', value);
                            $(this).prop('checked', $(this).val() === value);
                            $(this).addClass('urlFilled');
                        }
                        else if ($(this).attr('name') == key + "[]" || ( $(this).attr('name').match(/\[.*\]$/) && key.match(/\[.*\]$/) ) ) {
                            // multi
                            if (typeof [] !== typeof value) value = [ value ];
                            $("input[type=checkbox][name='" + $(this).attr('name') + "']").each(function (i) {
                                for (var valueI in value) {
                                    if ($(this).val() === value[valueI]) {
                                        $(this).prop('checked', true);
                                    }
                                }
                            }).addClass('urlFilled');
                        }
                    }
                });
            });
        },
        fillRadio = function () {
            $.each(params, function (key, value) {
                $("input[type=radio]").each(function () {
                    if (!$(this).is('.urlFilled')) {
                        if ($(this).attr('name') == key && !key.match(/\[\]$/)) {
                            // single
                            // console.log('setting', 'radio', key, 'to', value);
                            $("input[type=radio][name='" + $(this).attr('name') + "']").each(function (i) {
                                if ($(this).val() === value) {
                                    $(this).prop('checked', true);
                                }
                            }).addClass('urlFilled');
                        }
                    }
                });
            });
        };
    return {
        init: init
    }

})(jQuery);

jQuery(document).ready(function(){
    formAutofill.init();
});