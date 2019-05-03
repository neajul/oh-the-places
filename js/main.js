var iframe;
var player;
var droneVids = [
	// 304825753,
	// 304824842,
	// 304824964,
	// 304824270,
	// 304824383,
	// 304824166,
	// 304824656,
	// 304827969,
	304824436,
	// 304824497,
	// 304824580,
	304824114,
	// 304828072,
	// 304825095,
	// 304823871,
	// 304823989,
	// 304825196
]
var vidCounter = 0;

//when ready
$( document ).ready(function() {
	// shuffle drone array
	shuffle(droneVids);
	//find vimeo video
	iframe = document.querySelector('iframe');
	player = new Vimeo.Player(iframe);
	// load random video
	loadNewVideo(droneVids[0]);
	// load new video when old video ended
	player.on('ended', function() {
		$(".vimeo-wrapper").hide();
		// console.log("ended");
		vidCounter++;
		console.log(vidCounter);
		// check if the whole array is already over, otherwise restart
		if (vidCounter > droneVids.length - 1) {
			vidCounter = 0;
		}
    loadNewVideo(droneVids[vidCounter]);
		// $('.vimeo-wrapper').show();
	});
	player.on('play', function() {
		setTimeout(function() {
			$(".vimeo-wrapper").show();
		}, 500);
	});

	$( "#dialog" ).dialog({
    autoOpen: false,
		maxWidth:600,
    maxHeight: 500,
    width: 600,
    // height: 500,
    modal: true,
  });

  $( ".logoContainer.info.title" ).on( "click", function() {
    $( "#dialog" ).dialog( "open" );
  });

	// on click of the logo, start sound
	$('.logoContainer.logo, .logoContainer.bottom-bar, .vimeo-wrapper').click(function() {
		// audio...
		$("#audioplayer")[0].play();
		// fade out the logo
		$( '.logoContainer' ).fadeOut(5000);
	});
});

function loadNewVideo(videoID){
	player.loadVideo(videoID).then(function(id) {
	}).catch(function(error) {
			switch (error.name) {
					case 'TypeError':
							// the id was not a number
							break;

					case 'PasswordError':
							// the video is password-protected and the viewer needs to enter the
							// password first
							break;

					case 'PrivacyError':
							// the video is password-protected or private
							break;

					default:
							// some other error occurred
							break;
			}
	});
}

// shuffle array of vids
function shuffle(a) {
    var j, x, i;
    for (i = a.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = a[i];
        a[i] = a[j];
        a[j] = x;
    }
    return a;
}
