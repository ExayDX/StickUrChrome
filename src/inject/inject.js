chrome.extension.onMessage.addListener(function(request, sender, sendResponse){
  console.log(request.imgUrl);

  var img = document.createElement('img');
  img.setAttribute('src', request.imgUrl);
  document.body.appendChild(img);
});