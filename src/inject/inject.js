chrome.extension.onMessage.addListener(function(request, sender, sendResponse){
  console.log(request.imgUrl);

  var img = document.createElement('img');
  img.setAttribute('src', request.imgUrl);
  img.setAttribute('class', "sticker");
  $("body").prepend(img);
  $(".sticker").draggable();
});