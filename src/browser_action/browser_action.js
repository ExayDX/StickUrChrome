function click(e) {
  console.log("adding a sticker");
  chrome.tabs.executeScript(null, {code:"document.body.style.background='red'"});
  window.close();
}

document.addEventListener('DOMContentLoaded', function () {
  var imgs = document.querySelectorAll('img');
  for (var i = 0; i < imgs.length; i++) {
    imgs[i].addEventListener('click', click);
  }
});