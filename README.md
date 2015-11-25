# layercake
> layercake内部系统用的jQuery插件
> 只保证在layercake系统内可以正常使用，关于功能只为了实现系统需要的，比如点击小图查看大图，在功能和效果上，只做了自己需要的

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

