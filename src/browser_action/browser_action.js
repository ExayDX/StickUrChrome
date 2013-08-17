function click(e) {
 chrome.tabs.executeScript(null,
     {code:"document.body.style.backgroundColor='red'"});
 window.close();
}

document.addEventListener('DOMContentLoaded', function () {
  var divs = document.querySelectorAll('img');
  for (var i = 0; i < divs.length; i++) {
    divs[i].addEventListener('click', click);
  }
});