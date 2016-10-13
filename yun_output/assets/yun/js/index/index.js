/**
 * 云
 * @authors chris
 * @version 1.0
 */

require([
        '/assets/yun/js/common/common.js',
        '/assets/yun/js/util/director/director-2290401448.js',
        '/assets/yun/js/util/juicer/juicer-37e9ea91a7.js',
        '/assets/yun/js/util/jDialog/jDialog-c5372610c8.js',
        '/assets/yun/js/util/zepto/zepto-7c7c87c5db.js'
    ],
    function (Common, Director, Juicer, jDialog, Zepto) {

        var CONFIG = {
            'title': '股票云助手'
        };
        var $pageInnerNode = $('.du-page-bd-inner');

        window.loadPageLayer = null;

        var setIndex = {

            $pageNode: $('.page-index'),

            $indexTPL: $('#index-tpl'),

            getData: function (type) {
                var that = this;
                var tpl = that.$indexTPL.html();
                var html = null;

                $.ajax({
                    url: '/u/index',
                    data: null,
                    success: function (data) {
                        if (data.ret == 0) {
                            if (data.list.length > 0) {
                                data.hasStock = 1;
                            } else {
                                data.hasStock = 0;
                            }
                            html = juicer(tpl, data);
                            that.$pageNode.html(html).removeClass('du-hide');
                        }
                    },
                    complete: function (xhr) {
                        var data = $.parseJSON(xhr.response);
                        setTimeout(function () {
                            if (type == 'first') {
                                that.showAd({type: 'first'});
                            } else if (type == 'showBusiness') {
                                // AD
                                data.ad && that.showAd({
                                    type: 'business',
                                    link: data.ad.link,
                                    url: data.ad.url
                                });
                            }
                        }, 500);
                    },
                    error: function (xhr, textStatus, errorThrown) {

                    },
                    dataType: 'json',
                    type: 'get',
                    timeout: 15000
                });
            },
            showAd: function (options) {
                var html = null;
                if (options.type == 'first') {
                    void 0;
                    var firstAd = {
                        link: '',
                        url: '/assets/yun/img/index/ad02-ac0cb96655.png'
                    };
                    if (firstAd.link) {
                        jDialog.ad('<a href="' + firstAd.link + '"><img src="' + firstAd.url + '"></a>');
                    } else {
                        jDialog.ad('<a href="javascript:void(0)"><img src="' + firstAd.url + '"></a>');
                    }
                } else if (options.type == 'business') {
                    void 0;
                    var businessAd = {
                        link: options.link || '',
                        url: options.url
                    };
                    if (businessAd.link) {
                        jDialog.ad('<a href="' + businessAd.link + '"><img src="' + businessAd.url + '"></a>');
                    } else {
                        jDialog.ad('<a href="javascript:void(0)"><img src="' + businessAd.url + '"></a>');
                    }
                }
            },
            init: function () {
                void 0;
                var that = this;
                if (!$.fn.cookie('first')) {
                    $.fn.cookie('first', 1, {expires: 365});
                    that.getData('first');
                } else {
                    if (!$.fn.cookie('business')) {
                        $.fn.cookie('business', 1, {expires: 1});
                        that.getData('showBusiness');
                    } else {
                        that.getData();
                    }
                }
            },
            after: function () {
            }
        };

        var setEdit = {

            pauseButton: '[data-event="pause"]',

            openButton: '[data-event="open"]',

            saveButton: '[data-event="save"]',

            delButton: '[data-event="del"]',

            $pageNode: $('.page-edit'),

            $editTPL: $('#edit-tpl'),

            getData: function () {
                var that = this;
                var tpl = that.$editTPL.html();
                var html = null;

                $.ajax({
                    url: '/u/index',
                    data: null,
                    success: function (data) {
                        if (data.ret == 0) {
                            if (data.list.length > 0) {
                                data.hasStock = 1;
                            } else {
                                data.hasStock = 0;
                            }
                            html = juicer(tpl, data);
                            that.$pageNode.html(html).removeClass('du-hide');
                        }
                    },
                    complete: function () {
                    },
                    error: function (xhr, textStatus, errorThrown) {

                    },
                    dataType: 'json',
                    type: 'get',
                    timeout: 15000
                });
            },

            handlePause: function (param, $btnNode) {
                $.ajax({
                    url: '/u/pause',
                    data: param,
                    beforeSend: function () {
                        $btnNode.data('loading', 1);
                        $btnNode.addClass('du-button-loading');
                    },
                    success: function (data) {
                        if (data.ret == 0) {
                            $btnNode
                                .text('开启')
                                .removeClass('du-button-disabled')
                                .attr('data-event', 'open');
                            $btnNode.closest('.du-item').addClass('du-item-disabled');
                        } else {
                            // 设置失败
                        }
                    },
                    error: function (xhr, textStatus, errorThrown) {

                    },
                    complete: function () {
                        $btnNode.data('loading', 0);
                        $btnNode.removeClass('du-button-loading');
                    },
                    dataType: 'json',
                    type: 'get',
                    timeout: 15000
                });
            },

            handleOpen: function (param, $btnNode) {
                $.ajax({
                    url: '/u/open',
                    data: param,
                    beforeSend: function () {
                        $btnNode.data('loading', 1);
                        $btnNode.addClass('du-button-loading');
                    },
                    success: function (data) {
                        if (data.ret == 0) {
                            $btnNode
                                .text('暂停')
                                .addClass('du-button-disabled')
                                .attr('data-event', 'pause');
                            $btnNode.closest('.du-item').removeClass('du-item-disabled');
                        } else {
                            // 设置失败
                        }
                    },
                    error: function (xhr, textStatus, errorThrown) {

                    },
                    complete: function () {
                        $btnNode.data('loading', 0);
                        $btnNode.removeClass('du-button-loading');
                    },
                    dataType: 'json',
                    type: 'get',
                    timeout: 15000
                });
            },

            handleDel: function (param, $btnNode) {
                $.ajax({
                    url: '/u/del',
                    data: param,
                    beforeSend: function () {
                        $btnNode.data('loading', 1);
                        $btnNode.addClass('du-button-loading');
                    },
                    success: function (data) {
                        if (data.ret == 0) {
                            $btnNode.closest('.du-item').remove();
                        } else {
                            // 删除失败
                        }
                    },
                    error: function (xhr, textStatus, errorThrown) {

                    },
                    complete: function () {
                        $btnNode.data('loading', 0);
                        $btnNode.removeClass('du-button-loading');
                    },
                    dataType: 'json',
                    type: 'get',
                    timeout: 15000
                });
            },

            bind: function () {

                var that = this;

                that.$pageNode.on('click', that.pauseButton, function () {
                    void 0;
                    var $pauseButton = $(this);
                    var stockCode = $pauseButton.closest('.du-item').attr('data-stockCode');
                    if (!$pauseButton.data('loading')) {
                        void 0;
                        that.handlePause({'stockCode': stockCode}, $pauseButton);
                    }
                }).on('click', that.openButton, function () {
                    void 0;
                    var $openButton = $(this);
                    var stockCode = $openButton.closest('.du-item').attr('data-stockCode');
                    if (!$openButton.data('loading')) {
                        void 0;
                        that.handleOpen({'stockCode': stockCode}, $openButton);
                    }
                }).on('click', that.delButton, function () {
                    void 0;
                    var $delButton = $(this);
                    var stockCode = $delButton.closest('.du-item').attr('data-stockCode');
                    if (!$delButton.data('loading')) {
                        void 0;
                        that.handleDel({'stockCode': stockCode}, $delButton);
                    }
                });

                // that.$pageNode.on('click', that.saveButton, function () {
                //     console.log('saveButton');
                // });
            },

            init: function () {
                var that = this;
                that.bind();
                that.getData();
            },
            after: function () {
            }
        };

        var setSetting = {

            $pageNode: $('.page-setting'),

            $settingTPL: $('#setting-tpl'),

            addButton: '[data-event="add"]',

            delButton: '[data-event="del"]',

            saveButton: '[data-event="save"]',

            priceInput: '.input',

            settingForm: '#setting-form',

            validateForm: {
                price: {
                    itemNode: '.du-item',
                    tipNode: '.form-tip',
                    tip: {
                        'warning': '请输入股票价格',
                        'error': '输入错误'
                    },
                    removeTip: function ($inputNode) {
                        var that = this;
                        $inputNode.closest(that.itemNode).find(that.tipNode).remove();
                    },
                    clearStatus: function ($inputNode) {
                        var that = this;
                        $inputNode.closest(that.itemNode).removeClass('form-item-error');
                        that.removeTip($inputNode);
                    },
                    // @param  {Node} $inputNode  // input节点
                    validate: function ($inputNode, type) {

                        var that = this;
                        var reg = /^\d+(\.\d{2})?$/;
                        var price = $inputNode.val().replace(/\s+/g, '');

                        if (reg.test(price)) {
                            that.success($inputNode);
                            return true;
                        }

                        // else if(price===''){
                        //     console.log('空');
                        //     that.warning();
                        //     return true;
                        // }

                        else {
                            void 0;
                            that.error($inputNode);
                            return false;
                        }
                    },
                    success: function ($inputNode) {
                        var that = this;
                        that.clearStatus($inputNode);
                    },
                    error: function ($inputNode) {
                        var that = this;
                        that.removeTip($inputNode);
                        $inputNode.closest(that.itemNode).addClass('form-item-error');
                        $inputNode.closest(that.itemNode).find('.du-item-after').prepend('<span class="form-tip">' + that.tip.error + '</span>');
                        jDialog.toast(that.tip.error);
                    },
                    warning: function () {
                    }
                },
                all: function () {

                    var that = this;
                    var $priceInput = $(setSetting.priceInput);
                    var status = true;
                    $priceInput.each(function (index, value) {
                        var $input = $(this);
                        if (!that.price.validate($input)) {
                            status = false;
                            return false;
                        }
                    });
                    return status;
                }
            },

            formSubmit: function ($btnNode) {
                void 0;
                var that = this;
                var stockCode = $(that.settingForm).attr('data-stockCode');
                var formTemp = $(that.settingForm).serializeArray();
                var formData = {};
                $.each(formTemp, function (key, value) {
                    void 0;
                    if (!formData[this.name]) {
                        formData[this.name] = [this.value];
                    } else {
                        formData[this.name].push(this.value);
                    }
                });
                formData.stockCode = stockCode;
                $.ajax({
                    url: '/u/setting/submit',
                    data: formData,
                    traditional: true,
                    beforeSend: function () {
                        $btnNode.data('loading', 1);
                        $btnNode.addClass('du-button-loading');
                    },
                    success: function (data) {
                        if (data.ret == 0) {
                            window.location.assign('#/index');
                        } else {
                            jDialog.toast(data.retMsg || '保存失败');
                        }
                    },
                    complete: function () {
                        $btnNode.data('loading', 0);
                        $btnNode.removeClass('du-button-loading');
                    },
                    error: function (xhr, textStatus, errorThrown) {

                    },
                    dataType: 'json',
                    type: 'get',
                    timeout: 15000
                });
            },

            getData: function () {
                var that = this;
                var tpl = that.$settingTPL.html();
                var html = null;
                var stockCodes = window.location.href.split('/');
                var stockCode = stockCodes[stockCodes.length - 1];

                $.ajax({
                    url: '/u/setting',
                    data: {
                        stockCode: stockCode
                    },
                    success: function (data) {
                        if (data.ret == 0) {
                            html = juicer(tpl, data);
                            that.$pageNode.html(html).removeClass('du-hide');
                            document.title = data.stockName + '(' + data.stockCode + ')';
                        }
                    },
                    complete: function () {
                    },
                    error: function (xhr, textStatus, errorThrown) {

                    },
                    dataType: 'json',
                    type: 'get',
                    timeout: 15000
                });
            },
            handleAdd: function ($btnNode, type) {
                var riseTpl = '' +
                    '<li class="du-item">' +
                    '<div class="du-item-before">超过<input name="rise" class="input" type="text" value="" maxLength="7">%</div>' +
                    '<div class="du-item-after"><b class="iconfont icon-del" data-event="del" title="删除"></b></div>' +
                    '</li>';

                var fallTpl = '' +
                    '<li class="du-item minus-item">' +
                    '<div class="du-item-before">超过<span name="fall" class="minus">—</span><input class="input" type="text" value="" maxLength="7">%</div>' +
                    '<div class="du-item-after"><b class="iconfont icon-del" data-event="del" title="删除"></b></div>' +
                    '</li>';

                var priceLowTpl = '' +
                    '<li class="du-item">' +
                    '<div class="du-item-before">低于<input name="priceLow" class="input" type="text" value="" maxLength="7">元</div>' +
                    '<div class="du-item-after"><b class="iconfont icon-del" data-event="del" title="删除"></b></div>' +
                    '</li>';

                var priceHeightTpl = '' +
                    '<li class="du-item">' +
                    '<div class="du-item-before">高于<input name="priceHeight" class="input" type="text" value="" maxLength="7">元</div>' +
                    '<div class="du-item-after"><b class="iconfont icon-del" data-event="del" title="删除"></b></div>' +
                    '</li>';

                switch (type) {
                    case 'rise':
                        $btnNode.parent().before(riseTpl);
                        break;
                    case 'fall':
                        $btnNode.parent().before(fallTpl);
                        break;
                    case 'priceLow':
                        $btnNode.parent().before(priceLowTpl);
                        break;
                    case 'priceHeight':
                        $btnNode.parent().before(priceHeightTpl);
                        break;

                }
            },
            handleDel: function ($btnNode) {
                $btnNode.closest('.du-item').remove();
            },
            bind: function () {
                var that = this;
                that.$pageNode.on('click', that.addButton, function () {
                    void 0;
                    var $addButton = $(this);
                    var type = $addButton.attr('data-type');
                    that.handleAdd($addButton, type);
                }).on('click', that.delButton, function () {
                    void 0;
                    var $delButton = $(this);
                    that.handleDel($delButton);
                }).on('blur', that.priceInput, function () {
                    // 浅验证
                    var $priceInput = $(this);
                    that.validateForm.price.validate($priceInput);
                }).on('click', that.saveButton, function () {
                    var $saveButton = $(this);
                    if (!that.validateForm.all()) {
                        return false;
                    } else if (!$saveButton.data('loading')) {
                        that.formSubmit($saveButton);
                    }
                });
            },
            init: function () {
                var that = this;
                that.getData();
                that.bind();
            },
            after: function () {
                document.title = CONFIG.title;
            }
        };

        var setAdd = {
            $pageNode: $('.page-add'),
            $addTPL: $('#add-tpl'),
            ajaxRequest: null,
            searchInput: '[data-event="search"]',
            selectItem: '[data-event="select"]',
            clearButton: '[data-event="clear"]',
            stockNode: '.stock-bx',
            stockListNode: '.stock-bx .du-list',

            getData: function (value) {
                var that = this;
                if (that.ajaxRequest) {
                    that.ajaxRequest.abort();
                }
                that.ajaxRequest = $.ajax({
                    url: '/u/search',
                    data: {
                        'code': value
                    },
                    success: function (data) {
                        if (data.ret == 0) {
                            var searchData = data;
                            var searchTPL = '';
                            var html = null;
                            var $stockNode = that.$pageNode.find(that.stockNode);
                            var reg = eval("/" + value + "/ig");
                            $.map(searchData.list, function (n) {
                                if (n.stockName.indexOf(value) > -1) {
                                    n.stockNameFormat = n.stockName.replace(reg, '<b>' + value + '</b>');
                                } else {
                                    n.stockNameFormat = n.stockName;
                                }
                                if (n.stockCode.indexOf(value) > -1) {
                                    n.stockCodeFormat = n.stockCode.replace(reg, '<b>' + value + '</b>');
                                } else {
                                    n.stockCodeFormat = n.stockCode;
                                }
                            });
                            searchTPL = '' +
                                '<ul class="du-list">' +
                                '{@each list as item,index}' +
                                '<li class="du-item du-item-link" data-event="select" data-stockCode="${item.stockCode}">' +
                                '<a href="javascript:void(0)" class="">' +
                                '<div class="du-item-before">' +
                                '<div class="name">$${item.stockNameFormat}($${item.stockCodeFormat})</div>' +
                                '</div>' +
                                '</a>' +
                                '</li>' +
                                '{@/each}' +
                                '</ul>';
                            html = juicer(searchTPL, searchData);
                            $stockNode.html(html);
                        }

                    },
                    complete: function () {
                    },
                    error: function (xhr, textStatus, errorThrown) {

                    },
                    global: false,
                    dataType: 'json',
                    type: 'get',
                    timeout: 15000
                });
            },

            addData: function (param) {
                $.ajax({
                    url: '/u/add',
                    data: param,
                    success: function (data) {
                        if (data.ret == 0) {
                            window.location.assign('#/index');
                        } else {
                            jDialog.toast('添加失败');
                        }
                    },
                    complete: function () {
                    },
                    error: function (xhr, textStatus, errorThrown) {

                    },
                    dataType: 'json',
                    type: 'get',
                    timeout: 15000
                });
            },

            render: function () {
                void 0;
                var that = this;
                var tpl = that.$addTPL.html();
                var html = juicer(tpl, '');
                that.$pageNode.html(html).removeClass('du-hide');
                Common.closeLoadPageLayer();
            },

            bind: function () {
                var that = this;
                that.$pageNode.on('input', that.searchInput, function () {
                    void 0;
                    var $searchInput = $(this);
                    var value = $.trim($searchInput.val());
                    if ($searchInput.val().replace(/\s+/g, '') != '') {
                        $(that.clearButton).show();
                    } else {
                        $(that.clearButton).hide();
                    }
                    that.getData(value);
                }).on('click', that.selectItem, function () {
                    void 0;
                    var $selectItem = $(this);
                    var stockCode = $selectItem.attr('data-stockCode');
                    that.addData(
                        {
                            'stockCode': stockCode
                        }
                    );
                }).on('click', that.clearButton, function () {
                    $(this).hide();
                    that.$pageNode.find(that.stockListNode).remove();
                    that.$pageNode.find(that.searchInput).val('').focus();
                });

            },
            init: function () {
                var that = this;
                that.render();
                that.bind();
            },
            after: function () {

            }
        };

        var yunRouter = {
            config: {
                '/index': {
                    on: function () {
                        setIndex.init();
                    },
                    after: function () {
                        setIndex.after();
                    }
                },
                '/edit': {
                    on: function () {
                        setEdit.init();
                    },
                    after: function () {
                        setEdit.after();
                    }
                },
                '/setting/:id': {
                    on: function () {
                        setSetting.init();
                    },
                    after: function () {
                        setSetting.after();
                    }
                },
                '/add': {
                    on: function () {
                        setAdd.init();
                    },
                    after: function () {
                        setAdd.after();
                    }
                }
            },
            init: function () {
                var that = this;
                var router = Router(that.config);
                var pageNodes = $pageInnerNode.children('[class^="page-"]');
                Common.pageInit();

                router.configure({
                    //未找到匹配的路由，默认跳转到#/index
                    notfound: function () {
                        window.location.replace('#/index');
                    },
                    //在触发“on”方法之前执行的方法
                    before: function () {
                        window.loadPageLayer = null;
                        window.loadPageLayer = jDialog.loading('b');
                    },
                    //当路由匹配成功后，需要执行的方法
                    on: null,
                    //当离开当前注册路径时，需要执行的方法
                    after: function () {
                        void 0;
                        pageNodes.empty().addClass('du-hide');
                        pageNodes.off();
                        if (window.loadPageLayer) {
                            Common.closeLoadPageLayer();
                        }

                    }
                }).init();
            }
        };

        yunRouter.init();
        $.ajax({
            url: '/u/authQuery',
            success: function (isExist) {
                if (isExist) {
                    window.location = '#/index';
                } else{
                    alert('账号登录失败');
                }
            },
            dataType: 'json',
            type: 'get',
            timeout: 15000
        });
    });