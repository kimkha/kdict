//global.js
//23/10/08 vietnc update: Google_translate integration
var DEFAULT_PANEL_HEIGHT = 200;
var DEFAULT_PANEL_WIDTH = 300;
var DEFAULT_FONT_SIZE = 12;

var PANEL_HEIGHT = "extensions.kdict.panel-height";
var PANEL_WIDTH = "extensions.kdict.panel-width";
var FONT_SIZE = "extensions.kdict.font-size";
var DICT_ID = "extensions.kdict.dict-id";
var TAB_ID = "extensions.kdict.tab-id";
var SHOW_ICON = "extensions.kdict.show-icon";
var USE_SHORTCUT = "extensions.kdict.use-shortcut";
var USE_DBLCLICK = "extensions.kdict.use-dblclick";
var USE_CTRLMOUSE = "extensions.kdict.use-ctrlmouse";
var USE_GOOGLE = "extensions.kdict.use-google";
var prefs = Components.classes["@mozilla.org/preferences-service;1"]
        .getService(Components.interfaces.nsIPrefBranch);
        
var observer = Components.classes["@mozilla.org/observer-service;1"]
        .getService(Components.interfaces.nsIObserverService);

//Something to initialize in global level
function initMSTSDict() {
  //observer.addObserver(showMSTSIcon, "SHOW_MSTS_ICON", false);
  //observer.addObserver(hideMSTSIcon, "HIDE_MSTS_ICON", false);
  
  var isCheckedIcon = getPreferenceValue(SHOW_ICON, prefs.PREF_INT);
  enableMSTSIcon(isCheckedIcon==1);
    
}

function getPreferenceValue(key, type) {

  var val = null;
  if (prefs.getPrefType(key)==type) {
    if (type==prefs.PREF_INT) {
      val = prefs.getIntPref(key);
    } else if (type==prefs.PREF_STRING) {
      val = prefs.getCharPref(key);        
    }
  }
  return val;
}

function isNumeric(num){
  if (num.match(/[^0-9]/g)) {
    return false;
  }
  return true;
}

function openMSTSOption() {
  window.openDialog("chrome://kdict/content/options.xul",
                    "mstsOptions",
                    "chrome,centerscreen,resizable=no");
}

function goHomepage() {
  openUILinkIn("http://code.google.com/p/kdict/", "tab", false, null, null);
}

function goHomepage1() {
  window.opener.gBrowser.addTab("http://code.google.com/p/kdict/");
  window.close();
}

function openAbout() {
  window.openDialog("chrome://kdict/content/about.xul",
                    "mstsAbout",
                    "chrome,centerscreen,resizable=no");
}

var showMSTSIcon = {
  observe: function() {
    enableMSTSIcon(true);
  }
};

var hideMSTSIcon = {
  observe: function() {
    enableMSTSIcon(false);
  }
};

function enableMSTSIcon(bln) {
  var elmIcon = document.getElementById("msts-status");
  if (elmIcon!=null) {
    if (bln)
      elmIcon.removeAttribute("hidden");
    else
  	  elmIcon.setAttribute("hidden", true);
  }
}
