function AonaManager() {

  var serviceUrl = "https://kaworldia.appspot.com/kdict/";

  this.createURL = createURL;

  function createURL(dictID, word) {
    url = serviceUrl + dictID + "/"+word;
    return url;
  }

}
