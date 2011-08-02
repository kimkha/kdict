// options.js


function getUserPref() {

  //Get dictionary ID
  var dictID = getPreferenceValue(DICT_ID, prefs.PREF_STRING);
  //180808 
  if (dictID == null) {
    dictID = "en_vn";
  }
  
  //140808 vietnc mod
  var rdoDict = new Array();
  rdoDict[0] = document.getElementById("jp_vn");
  rdoDict[1] = document.getElementById("vn_jp");
  rdoDict[2] = document.getElementById("jp_en");
  rdoDict[3] = document.getElementById("en_jp");
  rdoDict[4] = document.getElementById("vn_fr");
  rdoDict[5] = document.getElementById("td_vt");
  rdoDict[6] = document.getElementById("en_vn");
  rdoDict[7] = document.getElementById("vn_en");
  rdoDict[8] = document.getElementById("fr_vn");
  rdoDict[9] = document.getElementById("vn_vn");
  
  for(var i = 0;i < rdoDict.length;i++){
		rdoDict[i].setAttribute("selected", false);  
  }
  //var rdoBouvier = document.getElementById("bouvier");    
  for(var i = 0;i < rdoDict.length;i++){
		if(rdoDict[i].getAttribute("value")==dictID){
			rdoDict[i].setAttribute("selected", true);  
			break;
		}
  }


  var isCheckedUseShortcut = getPreferenceValue(USE_SHORTCUT, prefs.PREF_INT);
  var chkUseShortcut = document.getElementById("use-shortcut");
  if (isCheckedUseShortcut==1) {
    chkUseShortcut.setAttribute("checked","true");
  } else {
    chkUseShortcut.setAttribute("checked","false");
  }
  var isCheckedUseCtrlMouse = getPreferenceValue(USE_CTRLMOUSE, prefs.PREF_INT);
  var chkUseCtrlMouse = document.getElementById("use-ctrlmouse");
  if (isCheckedUseCtrlMouse==1) {
    chkUseCtrlMouse.setAttribute("checked","true");
  } else {
    chkUseCtrlMouse.setAttribute("checked","false");
  }  
  var isCheckedUseDblClick = getPreferenceValue(USE_DBLCLICK, prefs.PREF_INT);
  var chkUseDblClick = document.getElementById("use-dblclick");
  if (isCheckedUseDblClick == 1) {
    chkUseDblClick.setAttribute("checked","true");
  } else {
    chkUseDblClick.setAttribute("checked","false");
  }

  var isCheckedUseGoogle = getPreferenceValue(USE_GOOGLE, prefs.PREF_INT);
  var chkUseGoogle = document.getElementById("use-google");
  if (isCheckedUseGoogle == 1) {
    chkUseGoogle.setAttribute("checked","true");
  } else {
    chkUseGoogle.setAttribute("checked","false");
  }
  
  //Last selected tab
  //var optionTabs = document.getElementById("option-tabs");
  //optionTabs.selectedIndex = getPreferenceValue(TAB_ID, prefs.PREF_INT);
}

function onOK() {

  //var txtPanelHeight = document.getElementById("height-pane");
  var panelHeight = 200;//txtPanelHeight.value;
  //var txtPanelWidth = document.getElementById("width-pane");
  var panelWidth = 300;//txtPanelWidth.value;  
  //var txtFontSize = document.getElementById("font-size");
  var fontSize = 12;//txtFontSize.value;
  
  prefs.setIntPref(PANEL_HEIGHT, panelHeight);
  prefs.setIntPref(PANEL_WIDTH, panelWidth);
  prefs.setIntPref(FONT_SIZE, fontSize);
    
  //140808 vietnc mod
  var rdoDict = new Array();
  rdoDict[0] = document.getElementById("jp_vn");
  rdoDict[1] = document.getElementById("vn_jp");
  rdoDict[2] = document.getElementById("jp_en");
  rdoDict[3] = document.getElementById("en_jp");
  rdoDict[4] = document.getElementById("vn_fr");
  rdoDict[5] = document.getElementById("td_vt");
  rdoDict[6] = document.getElementById("en_vn");
  rdoDict[7] = document.getElementById("vn_en");
  rdoDict[8] = document.getElementById("fr_vn");
  rdoDict[9] = document.getElementById("vn_vn");
  
  //var rdoBouvier = document.getElementById("bouvier");
  var dictID = "wn";
  
  for(var i = 0;i < rdoDict.length;i++){
  		if(rdoDict[i].getAttribute("selected")=="true"){
    		dictID = rdoDict[i].getAttribute("value");
    		break;
    	}
  }

  //180808 
  if(dictID == "wn"){
	dictID = "en_vn";
  }
  for(var i = 0;i < rdoDict.length;i++){
  		if(rdoDict[i].getAttribute("value")==dictID){
    		rdoDict[i].setAttribute("selected", true);  
    		break;
    	}
  }
  
  //if (rdoBouvier.getAttribute("selected") == "true")
  //  dictID = rdoBouvier.getAttribute("value");
  
  prefs.setCharPref(DICT_ID, dictID);
 
  var chkUseShortcut = document.getElementById("use-shortcut");
  var isCheckedUseShortcut = chkUseShortcut.getAttribute("checked");
  if (isCheckedUseShortcut=="true"){
    prefs.setIntPref(USE_SHORTCUT, 1);
  } else {
    prefs.setIntPref(USE_SHORTCUT, 0);
  }
  var chkUseCtrlMouse = document.getElementById("use-ctrlmouse");
  var isCheckedUseCtrlMouse = chkUseCtrlMouse.getAttribute("checked");
  if (isCheckedUseCtrlMouse=="true"){
    prefs.setIntPref(USE_CTRLMOUSE, 1);
  } else {
    prefs.setIntPref(USE_CTRLMOUSE, 0);
  }
  var chkUseDblClick = document.getElementById("use-dblclick");
  var isCheckedUseDblClick = chkUseDblClick.getAttribute("checked");
  if (isCheckedUseDblClick=="true"){
    prefs.setIntPref(USE_DBLCLICK, 1);
  } else {
    prefs.setIntPref(USE_DBLCLICK, 0);
  }
  
  var chkUseGoogle = document.getElementById("use-google");
  var isCheckedUseGoogle = chkUseGoogle.getAttribute("checked");
  if (isCheckedUseGoogle=="true"){
    prefs.setIntPref(USE_GOOGLE, 1);
  } else {
    prefs.setIntPref(USE_GOOGLE, 0);
  }
  
  return true;
}

function onCancel() {
}
