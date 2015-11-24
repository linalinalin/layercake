/********************
 * layercake
 * PC端 JS工具集
 * 因为是内容使用，不保证通用
 * Created by 程旭 on 15/11/19.
 */
;
(function ($, window, document, undefined) {
    'use strict';

    /************
     * 绑定键值改变监控
     * jQuery 事件valuechange
     * @type {{teardown: Function, handler: Function, add: Function, triggerChanged: Function}}
     */
    $.event.special.valuechange = {
        teardown: function (namespaces) {
            $(this).unbind('.valuechange');
        },
        handler: function (e) {
            $.event.special.valuechange.triggerChanged($(this));
        },
        add: function (obj) {
            $(this).on('keyup.valuechange cut.valuechange paste.valuechange input.valuechange', obj.selector, $.event.special.valuechange.handler)
        },
        triggerChanged: function (element) {
            var current = element[0].contentEditable === 'true' ? element.html() : element.val()
                , previous = typeof element.data('previous') === 'undefined' ? element[0].defaultValue : element.data('previous');
            if (current !== previous) {
                element.trigger('valuechange', [element.data('previous')]);
                element.data('previous', current);
            }
        }
    };

    function isJSON(obj) {
        return typeof(obj) === "object" && Object.prototype.toString.call(obj).toLowerCase() && !obj.length;
    }

    function isFunction(value) {
        return ({}).toString.call(value) === "[object Function]";
    }

    function isString(obj) {
        return typeof obj === 'string';
    }

    function isArray(value) {
        return value instanceof Array;
    }

    /*****
     * JSON 字符串
     * @param options
     * @returns {string}
     */
    function stringify(options) {
        return options === undefined || typeof options === "function" ? '' : JSON.stringify(options);
    }

    /*****
     * JSON 字符串JSON化
     * @param opt
     * @returns {string}
     */
    function parse(opt) {
        return !opt || typeof opt === 'undefined' ? '' : JSON.parse(opt);
    }


    /**********
     * 弹出窗口
     * 调用方式：$('.winOpen').winOpen({url:'链接地址', width:100, height:100});
     *          url 可以是字符串，也可以是function(){ return url字符串 }
     *      例：<div id="tools1" class="tools" data-win-url="1.jsp"></div>
     *         $('.tools').winOpen({
     *              url: function(){
     *                  return $(this).data('win-url')
     *              }
     *          });
     * @param options
     */
    $.fn.winOpen = function (options) {
        this.each(function () {
            var me = this;
            me.opt = $.extend({}, {
                width: 1104,
                height: 600
            }, options);

            if (typeof me.opt.url !== 'undefined') {
                // 处理获取水平居中参数
                if (me.opt && typeof me.opt.left === 'undefined') {
                    // 屏幕分辨率的高 window.screen.width
                    me.opt.left = (window.screen.width - me.opt.width) / 2;
                }
                if (me.opt && typeof me.opt.top === 'undefined') {
                    me.opt.top = (window.screen.height - me.opt.height) / 2;
                }
                winOpenFn(this, me.opt);
            }
        });

        /****
         * 为每一个绑定点击事件
         * @param $this
         * @param meOpt
         */
        function winOpenFn($this, meOpt) {
            $($this).on('click', function (event) {
                event.stopPropagation();
                if (isFunction(meOpt.url)) {
                    meOpt.url = meOpt.url.call($this);
                }
                // window.open 是相对于整个屏幕的 left top
                window.open(meOpt.url, '', 'width=' + meOpt.width + ', height=' + meOpt.height + ', top=' + meOpt.top + ', left=' + meOpt.left + ', toolbar=no, menubar=no, scrollbars=no, resizable=no, location=no, status=no');
            });
        }
    };


    $.fn.scaleImg = function (options) {
        function scaleImgFn() {
            return $('<div style="position: fixed; background-color: #FFF; border: 1px solid #9d9d9d; "></div>');
        }

        return this.each(function () {

        });
    };

})(window.jQuery, window, document);
