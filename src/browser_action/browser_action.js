function add_sticker(e) {
  //var imgUrl = chrome.extension.getURL("../../img/stickers/github.png");
  var imgUrl = chrome.extension.getURL(e.currentTarget.getAttribute('src'));

  chrome.tabs.getSelected(null, function(tab) {
    chrome.tabs.sendMessage(tab.id, {'imgUrl': imgUrl});
  });

  window.close();
}

document.addEventListener('DOMContentLoaded', function () {
  var imgs = document.querySelectorAll('img');

  for (var i = 0; i < imgs.length; i++) {
    imgs[i].addEventListener('click', add_sticker);
  }
});