function inArray(target, arr) {   // 不适用于引用数据类型
  return arr.some(function(elem, index) {
    if (target === elem) {
      return true;
    }
  })
}
// row ,line : array, 不需要数据的行列值，0或undefined为全选
function exportExcel(tableID,fileName,row,line){
	var agent = navigator.userAgent.toLowerCase();
	var isIE = /(msie\s|trident.*rv:)([\w.]+)/.test(agent);

	if (isIE) {
		alert("暂不支持IE内核的浏览器");
	} else {
		var table = document.getElementById(tableID);
		var oTh = table.getElementsByTagName('th');
		var data = [];
		data[0] = [];
		for(var i = 0; i < oTh.length; i++) {		// 标题th强制导出
			if(line && inArray(i, line)) {
				continue;
			}
			data[0].push(oTh[i].innerHTML)
		}
		var oTr = table.getElementsByTagName('tr');
		for(var i = 1; i < oTr.length; i++) {
			if(row && inArray(i,row)) {
				continue;
			}
			var arr = [];
			var oTd = oTr[i].getElementsByTagName('td');
			for (var j = 0; j < oTd.length; j++) {
				if(line && inArray(j, line)) {
					continue;
				}
				arr.push(oTd[j].innerHTML.replace('\n',' '));
			}
			data.push(arr);
		}
		var str = '';
		data.forEach(function(arr, index){
			str += arr.toString() + '\n';
		})

		str =  encodeURIComponent(str);         //解决换行符无法识别问题
		var url = 'data:text/txt;charset=utf-8,\ufeff'+ str;
		var downloadLink = document.createElement("a");
		downloadLink.href = url;
		downloadLink.download = fileName+".csv";
		document.body.appendChild(downloadLink);
		downloadLink.click();
		downloadLink.remove();
	}
}
