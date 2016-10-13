/**
 * 通用
 * @authors chris
 * @version 1.0
 */
define([
        '/assets/yun/js/util/jDialog/jDialog-c5372610c8.js',
        '/assets/yun/js/util/zepto/zepto-7c7c87c5db.js'
    ], function(jDialog, Zepto) {

    var Common = {
        pageInit: function() {
            var that = this;
            document.body.addEventListener('touchstart',function(){},false);
            document.body.addEventListener('onmouseover',function(){},false);

            $(document).on('ajaxError', function(event, request, settings) {
                jDialog.alert('网络超时，请稍候再试')
                        .addButton('重试', function (callBack) {
                            location.reload();
                        }).delButton(1);
            });

            $(document).on('ajaxComplete', function(event, request, settings) {
                void 0;
                that.closeLoadPageLayer();
            });
            
        },
        closeLoadPageLayer: function() {
            if(window.loadPageLayer) {
                window.loadPageLayer.remove();
                window.loadPageLayer = null;
            }
        },
        getParams: function (url, name) {
            if (name) {
                var r = new RegExp('[?&](' + name + ')=([^&#]*)');
                var params = r.exec(url);
                if (params) {
                    if (params[2] === 'undefined') {
                        return undefined;
                    }
                    else if (params[2] === 'null') {
                        return null;
                    }
                    else if (params[2] === '0') {
                        return 0;
                    }
                    else if (params[2] === 'true') {
                        return true;
                    }
                    else if (params[2] === 'false') {
                        return false;
                    }
                    else {
                        return params[2];
                    }
                }
                else {
                    return '';
                }
            }
            else {
                var r = /[?&](.*?)((?=[&?])|$)/g;
                var res;
                var vkArr = [];
                var paramObj = {};
                while (res = r.exec(url)) {
                    vkArr = res[1].split('=');
                    if (vkArr.length === 2) {
                        if (vkArr[1] === 'undefined') {
                            paramObj[vkArr[0]] = undefined;
                        }
                        else if (vkArr[1] === 'null') {
                            paramObj[vkArr[0]] = null;
                        }
                        else if (vkArr[1] === '0') {
                            paramObj[vkArr[0]] = 0;
                        }
                        else if (vkArr[1] === 'true') {
                            paramObj[vkArr[0]] = true;
                        }
                        else if (vkArr[1] === 'false') {
                            paramObj[vkArr[0]] = false;
                        }
                        else {
                            paramObj[vkArr[0]] = vkArr[1];
                        }
                    }
                    else {
                        paramObj[vkArr[0]] = undefined;
                    }
                }
                return paramObj;
            }
        },
        pushState: function (title, url) {
            history.pushState({ "title": title }, title, location.href.split('?')[0] + url);
        }
    };
    return Common;
});