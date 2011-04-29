function AonaManager() {

  var serviceUrl = "http://tratu.vn/dispatchaddon.php?";

  this.createURL = createURL;

  function createURL(dictID, word) {
    url = serviceUrl + "dict="+dictID+"&title="+word+"&ver=0.9.55";
    return url;
  }

}
