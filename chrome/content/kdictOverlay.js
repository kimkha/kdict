 
var appname = "KDict";

//Selected value
var selectedValue = "";
var focusedWindow;

var maindiv;

var mouseX = -1; 
var mouseY = -1;

var mouseMX = -1; 
var mouseMY = -1;

var req = false;

var definition;
var loadingMsg;

var isUseShortcut = 1;
var isUseDblClick = 1;
var isUseGoogle = 1;

window.addEventListener("load", init, false);
window.addEventListener("keypress", closeDefinePane, false);
window.addEventListener("keydown", keyDownProcess, false);
window.addEventListener("mousemove", getMouseXY, true);
window.addEventListener("dblclick", dblClickProcess, true);
//230808 vietnc add 
window.addEventListener("click", CtrlMouse, true);
function init() {
  //Initialize the right-click popup menu
  if (document.getElementById("contentAreaContextMenu")) {
    document.getElementById("contentAreaContextMenu")
      .addEventListener("popupshowing", initPopupLabel, false);
  }
  initKDict();
}

function initPopupLabel(e) {
  selectedValue = getSelectedText();
  var menuLookup = document.getElementById("lookup-menu");
  
  if (selectedValue != "") {
	menuLookup.hidden = false;
    menuLookup.label = "Tra t\u1EEB \u0111i\u1EC3n: \"" + selectedValue + "\"";
    mouseX = e.pageX;
    mouseY = e.pageY;    
  } else {
    menuLookup.hidden = true;
  }  
}

function getSelectedText() {
  
  var node = document.popupNode;
  var selection = "";

  if ((node instanceof HTMLTextAreaElement) 
    || (node instanceof HTMLInputElement && node.type == "text")) {
    selection = node.value.substring(node.selectionStart, node.selectionEnd);
  }else {
    var focusedWindow = new XPCNativeWrapper(
      document.commandDispatcher.focusedWindow, 'document', 'getSelection()'
    );
    selection = focusedWindow.getSelection().toString();
  }

	selection = selection.replace(/(\n|\r|\t|(\r\n))+/g, " ");

	//Trim the value(remove the space at the beginning and the end)
	selection = selection.replace(/(^\s+)|(\s+$)/g, "");
	selection = selection.split(" ");
	    
	//Remove certain characters at the beginning and end of every word
	//for (i = 0; i < selection.length; i++){
	//	selection[i] = selection[i].replace(/^(\&|\(|\)|\[|\]|\{|\}|"|,|\.|!|\?|'|:|;)+/, "");
	//	selection[i] = selection[i].replace(/(\&|\(|\)|\[|\]|\{|\}|"|,|\.|!|\?|'|:|;)+$/, "");
	//}
	
	selection = selection.join(" ");
	
	return selection;
}

function getMouseXY(e) {
  mouseMX = e.pageX;
  mouseMY = e.pageY;
  return true;
}

function showDefinitionPanel() {

  removePane();
  createDefinitionPanel();
  
}

function createDefinitionPanel()
{
//  var url = serviceUrl + selectedValue;
  //201008 vietnc mod
  doTranslation();
  //loadDefinition();

  focusedWindow = document.commandDispatcher.focusedWindow.document;
  
  //Get the values from preferences
  var panelHeight = getPreferenceValue(PANEL_HEIGHT, prefs.PREF_INT);
  if (panelHeight == null) panelHeight = DEFAULT_PANEL_HEIGHT;
   
  var panelWidth = getPreferenceValue(PANEL_WIDTH, prefs.PREF_INT);
  if (panelWidth == null) panelWidth = DEFAULT_PANEL_WIDTH;
  
  var fontSize = getPreferenceValue(FONT_SIZE, prefs.PREF_INT);
  if (fontSize == null) fontSize = DEFAULT_FONT_SIZE; 
  
  if ((focusedWindow.body.scrollTop == 0) && (focusedWindow.lastChild.scrollTop != 0)) {
	    mouseY += focusedWindow.lastChild.scrollTop;
  }else {
	    mouseY += focusedWindow.body.scrollTop;
  }
  
  if ((mouseX + 5 + panelWidth) >= window.innerWidth) {
    mouseX -= panelWidth;
  }
	
  if ((mouseY + 5 + panelHeight) >= window.innerHeight) {
    mouseY -= panelHeight;
  }
  
  if (mouseY <= 0) {
    mouseY = 0;
  }
  
  //Create definition panel
  maindiv=focusedWindow.createElement('div');
  maindiv.id='maindiv';
  maindiv.style.borderRadius = "15px";
  maindiv.style.boxShadow = "0 0 15px #666";
  maindiv.style.position='absolute';    
  maindiv.style.left=mouseX+'px';
  maindiv.style.top=mouseY+'px';
  maindiv.style.width=panelWidth+'px';
  maindiv.style.height=(panelHeight+5)+'px';
  maindiv.style.padding='0 1px 3px';
  maindiv.style.backgroundColor='#fff';
  maindiv.style.margin='5px';
  maindiv.style.border='2px #CCC solid';
  maindiv.style.zIndex = "9999";
  
  var titlediv=focusedWindow.createElement('div');
  titlediv.id='titlediv';
  titlediv.style.position='relative';
  titlediv.style.height = '20px';
  titlediv.style.width = panelWidth+'px';
  titlediv.style.backgroundColor='transparent';
  //titlediv.style.cursor = "move";

  var titleCaption = focusedWindow.createElement("div");
  titleCaption.id='titleCaption';
  titleCaption.setAttribute("style", 
    "float: left; margin: 0px; padding: 2px 5px 1px 5px;");
  titleCaption.appendChild(focusedWindow.createTextNode('KDict - Ngh\u0129a c\u1EE7a t\u1EEB "'+trim(selectedValue.substring(0,15))+'"'));
  titleCaption.style.fontFamily = 'Arial, Verdana, sans-serif';
  titleCaption.style.color = '#000000';
  titleCaption.style.fontSize = '13px';
  titleCaption.style.fontWeight = 'bold';
  titleCaption.style.width = (panelWidth-20)+'px';
  titleCaption.style.backgroundColor='transparent';

  var closeimglink = focusedWindow.createElement("a");
  closeimglink.setAttribute("href", "javascript:void(0);");
  closeimglink.setAttribute("title", "Close"); 
  closeimglink.setAttribute("style", "float: right; margin: 0px;");
  closeimglink.addEventListener("click", function(){removePane();}, false);
   
  var closeimg=focusedWindow.createElement('img');
  closeimg.src = 'http://kakalia.co.cc/apps/kdict/close.gif';
  closeimg.style.border = '0px';
  closeimg.style.backgroundColor='transparent';
  closeimg.style.padding='5px';
    
  var bg = focusedWindow.createElement('div');
  bg.id = "definepanel";
  bg.style.clear 	= 'both';
  bg.style.position='relative';
  bg.style.left='0px';
  bg.style.top='0px';
  bg.style.height = (panelHeight-20-4)+'px';
  bg.style.width = (panelWidth-10)+'px';
  bg.style.backgroundColor='transparent';
  bg.style.fontSize = fontSize+"px";
  bg.style.fontFamily = 'Arial, Verdana, sans-serif';
  bg.style.color = '#000000';
  bg.style.overflowY = "auto";
  bg.style.overflowX = "hidden";
  bg.style.padding = "2px 5px 2px 5px";
  bg.align="left";
  loadingMsg = focusedWindow.createTextNode("\u0110ang l\u1EA5y d\u1EEF li\u1EC7u...");
  bg.appendChild(loadingMsg);
  
  closeimglink.appendChild(closeimg);
  titlediv.appendChild(titleCaption);
  titlediv.appendChild(closeimglink);
  maindiv.appendChild(titlediv);
  maindiv.appendChild(bg);
  
  focusedWindow.body.appendChild(maindiv);
}
function trim(stringToTrim) {
	return stringToTrim.replace(/^\s+|\s+$/g,"");
}

function closeDefinePane(e) {
  if (e.keyCode==e.DOM_VK_ESCAPE) {
    removePane();
  } 
}

function keyDownProcess(e){
    if(e.ctrlKey){
		if (String.fromCharCode(e.keyCode)=="Z") {//90=Z
			isUseShortcut = getPreferenceValue(USE_SHORTCUT, prefs.PREF_INT);
			if (isUseShortcut == 1) 
			{	
				mouseX = mouseMX;
				mouseY = mouseMY;
				
				focusedWindow = document.commandDispatcher.focusedWindow.document;
  
				if ((focusedWindow.body.scrollTop == 0) && (focusedWindow.lastChild.scrollTop != 0)) {
				    mouseY -= focusedWindow.lastChild.scrollTop;
				} else {
				    mouseY -= focusedWindow.body.scrollTop;
				}
				
				selectedValue = getSelectedText();
				showDefinitionPanel();				
			}
		}
	}  
}

function CtrlMouse(e) {
	var rightclick;
	if(e.ctrlKey){
		if (!e) var e = window.event;
		if (e.which) rightclick = (e.which == 3);
		else if (e.button) rightclick = (e.button == 2);
		if(rightclick) {
			mouseX = mouseMX;
			mouseY = mouseMY;
			
			focusedWindow = document.commandDispatcher.focusedWindow.document;

			if ((focusedWindow.body.scrollTop == 0) && (focusedWindow.lastChild.scrollTop != 0)) {
				mouseY -= focusedWindow.lastChild.scrollTop;
			} else {
				mouseY -= focusedWindow.body.scrollTop;
			}
			
			selectedValue = getSelectedText();
			showDefinitionPanel();
			
			e.preventDefault();			
		}
	}
}
function dblClickProcess(e){
	isUseDblClick = getPreferenceValue(USE_DBLCLICK, prefs.PREF_INT);
	if (isUseDblClick == 1) 
	{	
		mouseX = mouseMX;
		mouseY = mouseMY;
		
		focusedWindow = document.commandDispatcher.focusedWindow.document;

		if ((focusedWindow.body.scrollTop == 0) && (focusedWindow.lastChild.scrollTop != 0)) {
			mouseY -= focusedWindow.lastChild.scrollTop;
		} else {
			mouseY -= focusedWindow.body.scrollTop;
		}
		
		selectedValue = getSelectedText();
		showDefinitionPanel();
		
	}
}

function removePane() {
  try{
    if (maindiv != null) {
      focusedWindow.body.removeChild(maindiv);
    }
  }catch(ex) {
    //be right back
    //alert(ex);
  }
}

function doTranslation(){
	loadDefinition();
}

function loadDefinition() {
    // branch for native XMLHttpRequest object
    if(window.XMLHttpRequest && !(window.ActiveXObject)) {
      try {
        req = new XMLHttpRequest();
      } catch(e) {
        req = false;
    }
    // branch for IE/Windows ActiveX version
    } else if(window.ActiveXObject) {
      try {
        req = new ActiveXObject("Msxml2.XMLHTTP");
      } catch(e) {
        try {
          req = new ActiveXObject("Microsoft.XMLHTTP");
        } catch(e) {
          req = false;
        }
      }
    }
    if(req) {
      
      var dictID = getPreferenceValue(DICT_ID, prefs.PREF_STRING);
      var url = new AonaManager().createURL(dictID, selectedValue);
	  
	  isUseGoogle = getPreferenceValue(USE_GOOGLE, prefs.PREF_INT);
	  if ((isUseGoogle == 1) && (selectedValue.indexOf(' ') != -1) && selectedValue.length >15){
		var dict = dictID;
		dict = dict.replace('vn','vi');dict = dict.replace('jp','ja');
		var langpair = dict.replace("_","|");
		//url = 'http://www.google.com/translate_t?text='+selectedValue+'&langpair='+langpair+"&ie=UTF8";
		url = 'http://ajax.googleapis.com/ajax/services/language/translate?v=1.0&q='+selectedValue+'&langpair='+langpair;
		req.onreadystatechange = processReqChange2;
	  }else{
	    req.onreadystatechange = processReqChange;
	  }
      req.open("GET", url, true);
      req.send(null);
    }
}
function parseContent() {
    var result = req.responseText;
    
	str = 'translatedText":"([^"]*)"';
    var reg = new RegExp(str);
	var str = new String(result);
    return trans = str.match(reg)[1];
}
function processReqChange2() {
  var definepanel = focusedWindow.getElementById("definepanel");
  
  if (req.readyState == 4) {
    if (req.status == 200) {
		var dictID = getPreferenceValue(DICT_ID, prefs.PREF_STRING);
		var res = parseContent();
		//show_result(definepanel,res);
		var definition = "";
		if (res==null||res=="") {
			definition = "Kh\u00F4ng t\u00ECm th\u1EA5y ngh\u0129a c\u1EE7a t\u1EEB n\u00E0y.";
		} else {
			definition = res;
		}
	  
		definepanel.removeChild(loadingMsg);
		var def = focusedWindow.createElement('div');
		def.id='tratupanel';
		def.style.position	= 'absolute';
		def.style.clear		= 'both';
		def.style.padding = "0px 0px 0px 0px";
		def.style.margin = "0px 5px 5px 5px";
		definition = "<br>" + definition +'<br/><br/><hr style="width:100%;color:blue;"><div id="footer" style="float:right">&nbsp;&nbsp; powered by <font color="red"><b>Google</b></font></div>';
		def.innerHTML = definition + "<br />";
		definepanel.appendChild(def);
		
    } else {
		definepanel.removeChild(loadingMsg);
		definepanel.appendChild("C\u00F3 l\u1ED7i khi y\u00EAu c\u1EA7u d\u1EEF li\u1EC7u.\n"+req.statusText);
        
    }
  }
}

function processReqChange() {
  var definepanel = focusedWindow.getElementById("definepanel");
  
  if (req.readyState == 4) {
    if (req.status == 200) {
	  var dictID = getPreferenceValue(DICT_ID, prefs.PREF_STRING);
 	  var res =  req.responseText;
	  //show_result(definepanel,res);
	var definition = "";
	if (res==null||res=="") {
		definition = "Kh\u00F4ng t\u00ECm th\u1EA5y ngh\u0129a c\u1EE7a t\u1EEB n\u00E0y.";
	} else {
		definition = res;
	}
  
	definepanel.removeChild(loadingMsg);
	var def = focusedWindow.createElement('div');
	def.id='tratupanel';
	def.style.position	= 'absolute';
	def.style.clear		= 'both';
	def.style.padding = "0px 0px 0px 0px";
	def.style.margin = "0px 5px 5px 5px";
	definition = definition + '<div style="margin:10px 0; padding-top:10px; border-top:1px solid blue;">Xem th\u00EAm t\u1EA1i: <a href="http://tratu.vn/dict/'+dictID+'/'+ selectedValue +'" target="_blank">Baamboo-Tra T\u1EEB</a></div>';
	def.innerHTML = definition;
	definepanel.appendChild(def);
	
    } else {
	  definepanel.removeChild(loadingMsg);
      definepanel.appendChild("C\u00F3 l\u1ED7i khi y\u00EAu c\u1EA7u d\u1EEF li\u1EC7u.\n"+req.statusText);
        
    }
  }
}
function show_result(definepanel,res){
	

}
