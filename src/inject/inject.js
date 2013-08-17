// Variable globale qui contient tous les stickers du localStorage
var gstickers = new Array();

/**
 * Reçoit un message du browser action comme quoi un nouveau sticker
 * a été ajouté
 */
chrome.extension.onMessage.addListener(function(request, sender, sendResponse){
  // On crée l'objet sticker
  var sticker = {
    id: gstickers.length,
    url: request.imgUrl, 
    location: window.location.href, 
    content: request.content };

  // Ajout du sticker
  var el = create_sticker_el(sticker);
  $("body").prepend(el);

  // Sauvegarde du sticker
  save_sticker(sticker);

  // Setup du drag/drop
  $(".sticker").draggable({
    stop: save_position,
    containment: "body"
  });
});

/**
 * Sauvegarde la position d'un sicker
 */
function save_position(e) {
  var i = $(e.target).data('stickid');
  gstickers[i].x = e.pageX - e.offsetX;
  gstickers[i].y = e.pageY - e.offsetY;
  chrome.storage.sync.set({'stickers': gstickers});
}

function save_sticker(sticker) {
  gstickers.push(sticker);

  chrome.storage.sync.set({'stickers': gstickers}, function() {
    console.log('Settings saved');
  });
}

// Créer un element html représentant un sticker
function create_sticker_el(sticker) {
  var img = $("<img />");
  img.attr('src', sticker.url);
  img.attr('class', "sticker");
  img.attr('title', sticker.content);
  img.attr('data-stickid', sticker.id);
  img.css('left', sticker.x);
  img.css('top', sticker.y);
  return img;
}

// Affiche les stickers passés en paramètres
function display_stickers(stickers) {
  for (var i = 0; i < gstickers.length; i++) {
    if (gstickers[i].location == window.location.href) {
      var el = create_sticker_el(gstickers[i]);
      $("body").prepend(el);
    }
  }
}

$(document).ready(function(){
  // uncomment to remove all sitckers from localstorage
  // chrome.storage.sync.remove('stickers');

  // Récupératio des stickers dans le localstorage
  chrome.storage.sync.get('stickers', function(obj){

    // On traite seulement s'il y a des stickers de sauvegardé
    if (!jQuery.isEmptyObject(obj)) {

      // On assigne enregistre le contenu du localstorage dans la 
      // variable globale gstickers
      gstickers = obj.stickers;

      // affichage des stickers
      display_stickers(gstickers);

    }

    // Setup des tooltips
    $( document ).tooltip();

    // Setup du drag/drop
    $(".sticker").draggable({
      stop: save_position,
      containment: "body"
    });
  });
});

