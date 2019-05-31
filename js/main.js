var iframe;
var player;
var droneVids = [
	304825753,
	304824842,
	304824964,
	304824270,
	304824383,
	304824166,
	304824656,
	304827969,
	304824436,
	304824497,
	304824580,
	304824114,
	304828072,
	304825095,
	304823871,
	304823989,
	304825196
]
var tracks = [
	"aud/Daniel_Mar2019_Master_rev1-001.mp3",
	"aud/Daniel_Mar2019_Master_rev1-002.mp3",
	"aud/Daniel_Mar2019_Master_rev1-003.mp3",
]; // List of Songs
var vidCounter = 0;
var selection = 0;

var audioPlayer = document.getElementById("audioplayer"); // Get Audio Element

//when ready
$( document ).ready(function() {
	shuffle(tracks);
	selectSong(); // Select initial song

	audioPlayer.autoplay=true;
	audioPlayer.addEventListener("ended", selectSong); // Run function when song ends

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
		}, 200);
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
		$( '.vimeo-wrapper' ).fadeTo(0, 0.1).fadeTo(3000, 1)
	});

	//dialog box
	$( "#dialog" ).dialog({
		autoOpen: false,
		width: $(window).width() * 0.55,
		// maxWidth: 500
	});
	//opener
	$( ".logoContainer info title" ).on( "click", function() {
    $( "#dialog" ).dialog( "open" );
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

// shuffle array
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

function selectSong(){
	if (selection < tracks.length) {
		console.log(tracks[selection]);
		audioPlayer.src = tracks[selection]; // Tell HTML the location of the new Song
		selection += 1;
	} else {
		console.log("music over!");
		$( '.vimeo-wrapper' ).fadeOut(2000);
		setTimeout(function() {
			player.destroy();
		}, 2000);
	}
}
