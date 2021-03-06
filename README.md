# layercake

cdn地址：<br/>
http://siwoo.oss-cn-hangzhou.aliyuncs.com/jquery%2Fjquery.layercake.tools.min.js<br/>
http://siwoo.oss-cn-hangzhou.aliyuncs.com/jquery%2Flayercake.tools.min.css<br/>
请在页面内引用此JS和CSS

> layercake内部系统用的jQuery插件<br/>
> 比如点击小图查看大图，在功能和效果上，只做了layercake系统特定的效果<br/>
> 数字格式化的效果包含了小数点后8位的处理

* 监控输入框及单选按钮等值的变更
* 弹出窗口
* 点击小图查看大图
* 数字格式化
* 图片上传
* 数据存储

--------------------------------

### 监控输入框及单选按钮等值的变更
> 使用方法

	$('input').on('valuechange', function(){
    
    });

---------------------------------

### 弹出窗口
> 使用方法

    $('.winOpen').winOpen({
        url:'http://www.baidu.com/',
        width:100,
        height:100
    });
    
    <div class="tools" data-win-url="1.jsp"></div>
    <div class="tools" data-win-url="2.jsp"></div>
    <div class="tools" data-win-url="3.jsp"></div>
    $('.tools').winOpen({
        url:function(){
        	return $(this).data('win-url');
        },
        width:100,
        height:100
    });
    

> 参数列表

<table>
<thead>
<tr>
<th>参数</th>
<th>说明</th>
<th>默认值</th>
<th>可填值</th>
</tr>
</thead>
<tbody>
<tr>
<td>url</td>
<td>弹出窗要打开的网址</td>
<td>空</td>
<td>字符串或函数</td>
</tr>
<tr>
<td>width</td>
<td>弹出窗宽度</td>
<td>1104</td>
<td>数字</td>
</tr>
<tr>
<td>height</td>
<td>弹出窗高度</td>
<td>600</td>
<td>数字</td>
</tr>
</tbody>
</table>

------------------------------

### 点击小图查看大图
> 使用方法

    // 最少保留一个大图的数据 maxData maxImg 里最少要有一个有数据
    $('img').zoomPic({
        maxData: 'max-pic',
        minData: 'min-pic',
        maxImg: '',
        minImg: ''
    });
    
    <img src="images/pic1-min.jpg" data-max-pic="images/pic1.jpg" style="margin: 20px; float: left;"/>
    <img src="images/pic2-min.jpg" data-max-pic="images/pic2.jpg" style="margin: 20px; float: left;"/>
    $('img').zoomPic({
        maxData: 'max-pic'
    });
    
    // 如要展示多张图，请用逗号分隔
    <div id="picList" data-min-pic="images/pic1-min.jpg,images/pic2-min.jpg,images/pic1-min.jpg,images/pic2-min.jpg" data-max-pic="images/pic1.jpg,images/pic2.jpg,images/pic1.jpg,images/pic2.jpg">图片组效果</div>
    $('#picList').zoomPic();

> 参数列表

<table>
<thead>
<tr>
<th>参数</th>
<th>说明</th>
<th>默认值</th>
<th>可填值</th>
</tr>
</thead>
<tbody>
<tr>
<td>maxData</td>
<td>从data里获取大图数据</td>
<td>max-pic</td>
<td>字符串</td>
</tr>
<tr>
<td>minData</td>
<td>从data里获取小图数据</td>
<td>min-pic</td>
<td>字符串</td>
</tr>
<tr>
<td>maxImg</td>
<td>大图图片地址</td>
<td>空</td>
<td>字符串</td>
</tr>
<tr>
<td>minImg</td>
<td>小图图片地址</td>
<td>空</td>
<td>字符串</td>
</tr>
</tbody>
</table>

------------------------------

### 数字格式化

此数字格式化工具的主要作用是：对数据进行加、减、乘、除 等运算<br/>
当需要输出显示时，请在最后用 toFixed(小数位数); 进行最后处理显示出来就好<br/>
操作者只需要关注逻辑

> 使用方法

    // 加
    console.log('add', $.SW.NUM.add(13.2, 13.333333333333));
    // add 26.533333333333
    
    // 减
    console.log('sub', $.SW.NUM.sub(13.333333333, 12.3333));
    // sub 1.000033333
    
    // 乘
    console.log('mul', $.SW.NUM.mul(13.333333333, 12.3333));
    // mul 164.4439999958889
    
    // 除
    console.log('div', $.SW.NUM.div(13.333333333, 12.3333));
    // div 1.0810840029027107
    
    console.log('div', $.SW.NUM.div(10000, 3));
    // div 3333.3333333333335
    
    // 将百分比转化成小数
    console.log('toDecimal', $.SW.NUM.toDecimal('17%'));
    // toDecimal 0.17
    
    // 将小数转化成百分比
    console.log('toPercentFormat', $.SW.NUM.toPercentFormat(0.17));
    // toPercentFormat 17%

------------------------------

### 数据存储
> 使用方法

    // 返回 boolean true表示浏览器支持本地存储， false表示不支持
    $.SW.storage.storage
    
    // 设置数据 相同的key就是替换
    $.SW.storage.set('key', {id:1, name:'成功'});
    $.SW.storage.set('key', '直接存储字符串');
    $.SW.storage.set('key', 98.3);
    
    // 添加数据，返回的是个数组 类似这样的返回值[{},{},'',{}]
    $.SW.storage.add('key', {id:1, name:'成功'}); 
    
    // 获取数据
    $.SW.storage.get('key');
    
    // 清除所有数据 当填入 key 时，只清除 key 的数据
    $.SW.storage.clear('key'); 

------------------------------