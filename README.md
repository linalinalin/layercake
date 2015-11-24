# layercake
layercake内部系统用的jQuery插件
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
    
    $('.winOpen').winOpen({
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

