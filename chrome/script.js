
function fetchMeaning(text) {
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function() {
    if (xhr.readyState == 4) {
      if (xhr.status == 200) {
        onReceive(xhr.responseText);
      } else {
        onReceive(null);
      }
    }
  }
  
  var url = 'https://kaworldia.appspot.com/kdict/en_vn/' + text;
  xhr.open('GET', url, true);
  xhr.send();
}

function onReceive(data) {
	if (data) {
		var root = document.createElement('div');
		root.style.cssText = [
		  'background-color: #CCEFFF;',
		  'background-image: -webkit-repeating-linear-gradient(' +
		      '45deg, transparent, transparent 35px,' +
		      'rgba(150,150,150,.1) 35px, rgba(150,150,150,.1) 70px);',
		  'color: #000;',
		  'width: 300px;',
		  'height: 160px;',
		  'overflow-y: auto;',
		  'padding: 10px;',
		  'font: 14px Arial;',
		  'position: fixed;',
		  'top: 20px;',
		  'left: 20px;',
		  'z-index: 10000;'
		].join(' ');
		root.innerHTML = data;
		document.body.parentElement.insertBefore(root, document.body);
	}
};

function callTranslate(request, sender, sendResponse) {
	var text = request.seletedText;
	fetchMeaning(text);
}

chrome.extension.onRequest.addListener(callTranslate);










