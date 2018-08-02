$(document).ready(function() {
  var query = parse_url_params();
  window.query = query;

  let boxes = [];
  boxes.push({
  	id: 'i-am-a-child-of-god',
  	image_url:'https://www.lds.org/bc/content/shared/content/images/gospel-library/magazine/fr09jan41_color.jpg',
  	song_title: 'I am a child of God',
  	music_url: 'http://broadcast.lds.org/churchmusic/MP3/1/2/words/2.mp3?download=true'
  });
  boxes.push({
    id: 'my-heavenly-father-loves-me',
    image_url: 'https://easter-fun.info/wp-content/uploads/04/lds-easter-message-2018-easter-lily-1024x1024.jpg',
    song_title: 'My Heavenly Father loves me',
    music_url: 'http://broadcast.lds.org/churchmusic/MP3/1/2/words/228.mp3?download=true'
  });
  boxes.push({
    id: 'when-i-am-baptized',
    image_url: 'https://media.ldscdn.org/images/media-library/gospel-art/gospel-in-action/baptism-lds-593669-gallery.jpg',
    song_title: 'When I am baptized',
    music_url: 'http://media2.ldscdn.org/assets/music/childrens-songbook/2002-01-0920-when-i-am-baptized-words-and-music-192k-eng.mp3?download=true'
  });
  boxes.push({
    id: 'families-can-be-together-forever',
    image_url: 'https://www.lds.org/bc/content/ldsorg/church/news/2014/2/3/300%20family%20at%20temple.jpg',
    song_title: 'Families can be together forever',
    music_url: 'http://broadcast.lds.org/churchmusic/MP3/1/2/words/188.mp3?download=true'
  });
  boxes.push({
    id: 'a-childs-prayer',
    image_url: 'https://media.ldscdn.org/images/media-library/prayer/young-man-in-fiji-praying-268645-gallery.jpg',
    song_title: "A child's prayer",
    music_url: 'http://broadcast.lds.org/churchmusic/MP3/1/2/words/12.mp3?download=true'
  });
  boxes.push({
    id: 'if-the-savior-stood-beside-me',
    image_url: 'https://media.ldscdn.org/images/media-library/gospel-art/gospel-in-action/jesus-children-37775-gallery.jpg',
    song_title: "If the Savior stood beside me",
    music_url: 'http://broadcast.lds.org/churchmusic/MP3/1/2/words/12.mp3?download=true'
  });

  for (let i in boxes) {
    let box = boxes[i];
    let div = $(`<div class=songbox id=${box.id} />`);
    let img = $(`<img src="${box.image_url}"></img>`);
    div.append(img);
    div.append(`<h3 style="flex-grow:1">${box.song_title}</h3>`);
    let controls=$('<div class=controls />');
    div.append(controls);
    
    controls.append('<p>I listened to this song <span class=count>[0]</span> times.<br><a id=add href="#">add</a> / <a id=subtract href="#">subtract</a> / <a id=reset href="#">reset</a></p>');
    controls.append(`<audio controls><source src="${box.music_url}" /></audio>`);
    $('.songboxes').append(div);
    setup_box(box,div);
  }

  $("audio").on("play", function() {
    $("audio").not(this).each(function(index, audio) {
      audio.pause();
    });
  });

  if (!localStorage.browser_id) {
  	localStorage.browser_id=make_random_id(10);
  }
  console.log('Browser id: '+localStorage.browser_id);

	function setup_box(box,div) {
		update_count(box.id);
		div.find('#add').click(on_add);
		div.find('#subtract').click(on_subtract);
		div.find('#reset').click(on_reset);

		function on_add() {
			increment_count(box.id,1);
			return false;
		}
		function on_subtract() {
			increment_count(box.id,-1);
			return false;
		}
		function on_reset() {
			set_count(box.id,0);
			update_count(box.id);
			return false;
		}
	}

	function increment_count(id,num) {
		set_count(id,get_count(id)+num);
		update_count(id);
	}
	function update_count(id) {
		$(`#${id} .count`).html(get_count(id));
	}
	function get_count(id) {
		try {
			return Number(localStorage['count--'+id]||0);
		}
		catch(err) {
			return 0;
		}
	}
	function set_count(id,num) {
		if (num<0) num=0;
		try {
			localStorage['count--'+id]=Number(num);
		}
		catch(err) {
		}
	}

});


function parse_url_params() {
  var match;
  var pl = /\+/g; // Regex for replacing addition symbol with a space
  var search = /([^&=]+)=?([^&]*)/g;
  var decode = function(s) {
    return decodeURIComponent(s.replace(pl, " "));
  };
  var query = window.location.search.substring(1);
  var url_params = {};
  while (match = search.exec(query))
    url_params[decode(match[1])] = decode(match[2]);
  return url_params;
}

function make_random_id(len) {
  // return a random string of characters
  var text = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (var i = 0; i < len; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));

  return text;
}