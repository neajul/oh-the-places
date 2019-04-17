//when document is ready, stop everything and add control to logo
$( document ).ready(function() {
	//pause background video
	$('.fullscreenBgVideo').trigger('pause');
	// on click of the logo, start..
	$('#logoContainer').click(function() {
		// audio...
		$("#audioplayer")[0].play();
		// the black video...
		$('.fullscreenBgVideo').trigger('play');
		// video shuffle function...
		videoPlayerFunction();
		// // grow the logo
		// $('#logoContainer img').css({
		// 	"max-width": "none",
		// 	"max-height": "none",
		// 	"min-width": "100%",
		// 	"min-height": "100%",
		// })
		// fade out the logo
		$( this ).delay(5000).fadeOut(5000);
	});
});

//video shuffle function at beginning
$.fn.shuffleChildren = function() {
	$.each(this.get(), function(index, el) {
			var $el = $(el);
			var $find = $el.children();
			$find.sort(function() {
					return 0.5 - Math.random();
			});
			$el.empty();
			$find.appendTo($el);
	});
};

function videoPlayerFunction() {
	//video index
	function getCurrentVideoIndex( ) {
		var video_links = $( '.videoPlaylist a' );
		var current_link = $( '.videoPlaylist a.current-video' );
		return video_links.index( current_link );
	}

	// play videos, preload next video
	function playVideo( index ) {
		allLinks[index].classList.add( 'current-video' );
		currentVideo = index;
		// source[2].src = videoDirectory + linkList[index] + '.ogv';
		// source[1].src = videoDirectory + linkList[index] + '.webm';
		source[0].src = videoDirectory + linkList[index] + '.mp4';
		video.load();
		video.play();

		preloadNextVideo( );
	}

	function preloadNextVideo() {
		nextVideo = currentVideo + 1;
		if ( nextVideo >= linkNumber ) {
			nextVideo = 0;
		}
		var nextSrc = videoDirectory + linkList[ nextVideo ] + '.mp4';
		var req = new XMLHttpRequest( );
		req.open('GET', nextSrc, true);
		req.send();
		console.log( nextVideo + ' / ' + linkNumber + ' ' + nextSrc );
	}

	//shuffle videos in html
	$( '.videoPlaylist' ).shuffleChildren( );

	//variables to play video
	var videoPlayer = document.getElementById( 'videoPlayer' ),
		video = videoPlayer.getElementsByClassName( 'fullscreenBgVideo' )[0],
		playlist = videoPlayer.getElementsByClassName( 'videoPlaylist' )[0],
		source = video.getElementsByTagName( 'source' ),
		linkList = [],
		videoDirectory = 'vidblack/',
		currentVideo = getCurrentVideoIndex( ),
		i, filename;
	var allLinks = playlist.children; // shuffle(playlist.children);
	var linkNumber = allLinks.length;

	// // Save all video sources from playlist
	for ( i = 0; i < linkNumber; i++ ) {
		filename = allLinks[i].href;
		linkList[i] = filename.match( /([^\/]+)(?=\.\w+$)/ )[0];
	}

	/**
	 * Play next video
	 */
	video.addEventListener( 'ended', function () {

		console.log( currentVideo );
		allLinks[currentVideo].classList.remove( 'current-video' );
		nextVideo = currentVideo + 1;
		if ( nextVideo >= linkNumber ) {
			nextVideo = 0;
		}
		playVideo( nextVideo );
	} );

	preloadNextVideo( );
}
