
function fetchMeaning(text) {
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function() {
    if (xhr.readyState == 4) {
      if (xhr.status == 200) {
        onReceive(escape(xhr.responseText));
      } else {
        onReceive(null);
      }
    }
  }
  
  var url = 'http://kaworldia.appspot.com/kdict/en_vn/' + text;
  xhr.open('GET', url, true);
  xhr.send();
}

function onReceive(data) {
	if (data) {
		var el = document.getElementById("kdict-content");
		if (el) {
			el.innerHTML = unescape(data);
		}
	}
};

function callTranslate(request, sender, sendResponse) {
	var text = request.selectedText;
	fetchMeaning(text);
	
	var root = document.createElement('div');
	var head = document.createElement('div');
	var content = document.createElement('div');
	var close = document.createElement('div');
	
	var closeImg = chrome.extension.getURL("images/close.gif");
	
	root.id = "kdict-root";
	root.style.cssText = [
	  'background-color: #CCEFFF;',
	  'background-image: -webkit-repeating-linear-gradient(' +
	      '45deg, transparent, transparent 35px,' +
	      'rgba(150,150,150,.1) 35px, rgba(150,150,150,.1) 70px);',
	  'color: #000;',
	  'width: 300px;',
	  'font: 14px Arial;',
	  'position: fixed;',
	  'top: 20px;',
	  'left: 20px;',
	  'z-index: 10000;'
	].join(' ');
	
	head.style.cssText = [
		'width: 275px;',
		'font-size: 15px;',
		'font-weight: bold;',
		'padding: 0 5px;',
		'display: block;',
		'float: left;'
	].join(' ');
	head.innerText = "Nghĩa của từ: '" + text + "'";
	
	close.innerHTML = "<img src='" + closeImg + "' border=0 style='margin:0;padding:0;width:10px;height:10px;' />";
	close.style.cssText = [
		'width: 12px;',
		'height: 12px;',
		'padding: 3px 0 0 0;',
		'display: block;',
		'float: right;',
		'cursor: pointer;'
	].join(' ');
	close.onclick = function() {
		var el = document.getElementById("kdict-root");
		el.parentNode.removeChild(el);
	}
	
	content.id = "kdict-content";
	content.style.cssText = [
		'height: 160px;',
		'width: 270px;',
		'overflow-y: auto;',
		'clear: both;',
		'padding: 10px;',
		'margin: 5px;'
	].join(' ');
	content.innerHTML = "Đang đọc dữ liệu...";
	
	root.appendChild(head);
	root.appendChild(close);
	root.appendChild(content);
	document.getElementsByTagName('body')[0].appendChild(root);
}

chrome.extension.onRequest.addListener(callTranslate);










