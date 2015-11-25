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

    // 工具对象
    var tools = {
        isJSON: function (opt) {
            return typeof(opt) === "object" && Object.prototype.toString.call(opt).toLowerCase() && !opt.length;
        },
        isFunction: function (opt) {
            return ({}).toString.call(opt) === "[object Function]";
        },
        isString: function (opt) {
            return typeof opt === 'string';
        },
        isArray: function (opt) {
            return opt instanceof Array;
        },
        jsonStringify: function (opt) {
            return opt === undefined || typeof opt === "function" ? '' : JSON.stringify(opt);
        },
        jsonParse: function (opt) {
            return !opt || typeof opt === 'undefined' ? '' : JSON.parse(opt);
        }
    };

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
                    me.opt.left = (window.screen.width - 10 - me.opt.width) / 2;
                }
                if (me.opt && typeof me.opt.top === 'undefined') {
                    me.opt.top = (window.screen.height - 30 - me.opt.height) / 2;
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
                if (tools.isFunction(meOpt.url)) {
                    meOpt.url = meOpt.url.call($this);
                }
                // window.open 是相对于整个屏幕的 left top
                window.open(meOpt.url, '', 'width=' + meOpt.width + ', height=' + meOpt.height + ', top=' + meOpt.top + ', left=' + meOpt.left + ', toolbar=no, menubar=no, scrollbars=no, resizable=no, location=no, status=no');
            });
        }
    };

    /****************************
     * 点击小图，展示大图
     * 使用方式：
     *      <div id="picList" data-min-pic="images/pic1-min.jpg,images/pic2-min.jpg,images/pic1-min.jpg,images/pic2-min.jpg" data-max-pic="images/pic1.jpg,images/pic2.jpg,images/pic1.jpg,images/pic2.jpg">图片组效果</div>
     *      $('#picList').zoomPic();
     *
     *      <img src="images/pic1-min.jpg" data-max-pic="images/pic1.jpg" style="margin: 20px; float: left;"/>
     *      <img src="images/pic2-min.jpg" data-max-pic="images/pic2.jpg" style="margin: 20px; float: left;"/>
     *      $('img').zoomPic({
     *          maxData: 'max-pic'
     *      });
     *
     * @param options {maxData:'max-pic 表示当前点击的data-max-pic内的数据，用,分隔', minData:'', maxPic:'当此处 设置了图片地址', minPic:''}
     * @returns {*}
     */
    $.fn.zoomPic = function (options) {

        /*****
         * 点击的位置不是图片框内时，删除图片
         */
        function eventRemove() {
            $(document.body).off('click.zoomPic').on('click.zoomPic', function (event) {
                event.stopPropagation();
                var $target = $(event.target);
                if ($(this).find('#zoom-pic').length > 0 && $target.closest('#zoom-pic').length === 0) {
                    $('#zoom-pic').remove();
                } else if ($(this).find('#zoom-list').length > 0 && $target.closest('#zoom-list').length === 0) {
                    $('#zoom-list').remove();
                }
            });
        }

        /********
         * 显示大图
         */
        function showMaxPic(imgUrl) {
            $(document.body).append('<div class="zoom-pic zoom-radius zoom-shadow" id="zoom-pic"><span id="zoom-loading">正在加载图片</span><img src="' + imgUrl + '" /></div>');
            var img = new Image();
            img.onload = function () {
                picResize($('#zoom-pic'), {width: img.width, height: img.height});
            };
            img.src = imgUrl;
        }

        /*********
         * 重置图片大小尺寸
         * @param $zoom
         * @param opt
         */
        function picResize($zoom, opt) {
            $zoom.css({
                width: opt.width,
                height: opt.height,
                marginLeft: -1 * ((opt.width + 20) / 2),
                marginTop: -1 * ((opt.height + 20) / 2)
            }).addClass('show');
        }

        /**************
         * 获取图片地址列表
         * 当设置了图片地址后，就不获取data的数据了
         * @param me 当前对象
         * @param data 当前
         * @param img
         * @returns {*}
         */
        function getImgSrc(me, data, img) {
            var imgList = !img || typeof img === 'undefined' ? $(me).data(data) : img;
            if (typeof imgList !== 'undefined') {
                imgList = imgList.split(',');
            }
            return imgList;
        }

        /**********
         * 展示图片列表
         * @param minList
         * @param maxList
         */
        function zoomList(minList, maxList) {
            var _ = '';
            $.each(minList, function (k, v) {
                _ += '<img src="' + v + '" data-max-pic="' + maxList[k] + '" />';
            });
            var __zoomList = $('<div class="zoom-list zoom-radius zoom-shadow" id="zoom-list"><div class="zoom-overflow">' + _ + '</div></div>');
            $(document.body).append(__zoomList);
            __zoomList.on('click', 'img', function (event) {
                event.stopPropagation();
                $('#zoom-pic').remove();
                showMaxPic($(this).data('max-pic'));
            });
        }

        return this.each(function () {

            var me = this;
            me.opt = $.extend({}, {
                maxData: 'max-pic', // 数据存储点
                minData: 'min-pic',
                maxImg: '', // 设置好的大图
                minImg: ''
            }, options);

            $(me).on('click', function (event) {
                event.stopPropagation();
                $('#zoom-pic').remove();
                eventRemove();
                // 获取大图列表
                var maxList = getImgSrc(me, me.opt.maxData, me.opt.maxImg);

                switch (maxList.length) {
                    case 0:
                        console.log('没有获取到大图');
                        break;
                    case 1:
                        // 显示一张大图
                        showMaxPic(maxList[0]);
                        break;
                    default:
                        // 显示一组小图，点击小图展示大图
                        zoomList(getImgSrc(me, me.opt.minData, me.opt.minImg), maxList);
                }
            });
        });


    };

})(window.jQuery, window, document);