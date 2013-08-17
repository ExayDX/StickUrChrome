function save_position(e) {
  console.log(e);
  var i = $(e.target).data('stickid');
  gstickers[i].x = e.pageX - e.offsetX;
  gstickers[i].y = e.pageY - e.offsetY;
  chrome.storage.sync.set({'stickers': gstickers}, function() {
    console.log('Settings saved');
  });
}

var gstickers = new Array();

chrome.extension.onMessage.addListener(function(request, sender, sendResponse){

  var img = document.createElement('img');
  img.setAttribute('src', request.imgUrl);
  img.setAttribute('class', "sticker");
  img.setAttribute('data-stickid', gstickers.length);
  img.setAttribute('title', request.content);
  $("body").prepend(img);
  $(".sticker").draggable({
    stop: save_position,
    containment: "body"
  });

  var obj = {id: gstickers.length,url: request.imgUrl, location: window.location.href, content: request.content};

  gstickers.push(obj);

  chrome.storage.sync.set({'stickers': gstickers}, function() {
    console.log('Settings saved');
  });

});

$(document).ready(function(){
  //chrome.storage.sync.remove('stickers');
  chrome.storage.sync.get('stickers', function(obj){;

    if (!jQuery.isEmptyObject(obj)) {

      gstickers = obj.stickers;
      console.log(gstickers);

      for (var i = 0; i < gstickers.length; i++) {
        console.log(gstickers[i].location);
        if (gstickers[i].location == window.location.href) {
          var img = document.createElement('img');
          img.setAttribute('src', gstickers[i].url);
          img.setAttribute('class', "sticker");
          img.setAttribute('title', gstickers[i].content);
          img.setAttribute('data-stickid', gstickers[i].id);
          $(img).css('left', gstickers[i].x);
          $(img).css('top', gstickers[i].y);
          $("body").prepend(img);
          $(".sticker").draggable({
            stop: save_position,
            containment: "body"
          });
        }
      }
    }
    $( document ).tooltip();
  });
});