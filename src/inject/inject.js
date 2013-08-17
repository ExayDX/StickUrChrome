var gstickers = new Array();

chrome.extension.onMessage.addListener(function(request, sender, sendResponse){

  var img = document.createElement('img');
  img.setAttribute('src', request.imgUrl);
  img.setAttribute('class', "sticker");
  $("body").prepend(img);
  $(".sticker").draggable();

  var obj = {url: request.imgUrl};

  gstickers.push(obj);

  chrome.storage.sync.set({'stickers': gstickers}, function() {
    console.log('Settings saved');
  });

});

$(document).ready(function(){

  chrome.storage.sync.get('stickers', function(obj){;

    if (!jQuery.isEmptyObject(obj)) {

      gstickers = obj.stickers;

      for (var i = 0; i < gstickers.length; i++) {
        var img = document.createElement('img');
        img.setAttribute('src', gstickers[i].url);
        img.setAttribute('class', "sticker");
        $("body").prepend(img);
        $(".sticker").draggable();
      }
    }
  });
});