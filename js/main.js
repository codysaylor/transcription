var video_id = 'CoxT3Hg2-AU';
jQuery("#player").tubeplayer({
    width: 560, // the width of the player
    height: 315, // the height of the player
    allowFullScreen: "true", // true by default, allow user to go full screen
    initialVideo: video_id, // the video that is loaded into the player
    preferredQuality: "default",// preferred quality: default, small, medium, large, hd720
    onPlay: function(id){}, // after the play method is called
    onPause: function(){}, // after the pause method is called
    onStop: function(){}, // after the player is stopped
    onSeek: function(time){}, // after the video has been seeked to a defined point
    onMute: function(){}, // after the player is muted
    onUnMute: function(){} // after the player is unmuted
});

$.ajax({
	type: "GET",
	url: 'http://video.google.com/timedtext?lang=en&v='+video_id,
	dataType: "xml",
	success: function(xml) {
		$(xml).find('text').each(function(){
			var starttime = $(this).attr('start');
			//starttime = Math.floor(starttime);
			var transcript = $(this).text();
			var dur = $(this).attr('dur');
			$('#cc').append('<span id="seek" data-time="'+starttime+'" data-dur="' + dur + '">'+transcript+'</span> ');
		});
	}
});

window.setInterval(function(){
	var video_duration = $("#player").tubeplayer("data").duration;
	var current_time = $("#player").tubeplayer("data").currentTime;
	//current_time = Math.floor(current_time);
	$("#whatupyo").attr("value", current_time);
	$rightnow = $("#whatupyo").val();
function thisisright(){
	return ( $(this).attr("data-time") <= $rightnow && ( $(this).attr("data-time") + $(this).attr("data-dur") >= $rightnow ) )
}

function addremoveclass() {
	var clip_start = parseInt($(this).attr('data-time'), 10);
	var clip_dur = parseInt($(this).attr('data-dur'), 10);
	var atm = parseInt($rightnow);
    return clip_start <= atm && (clip_start+clip_dur) >= atm;
}

$("[data-time]").filter(addremoveclass).addClass('yellow').end().not(addremoveclass).removeClass('yellow');
}, 500);

$('#play').click(function(){
	$('#player').tubeplayer("play");
});
$('#pause').click(function(){
	$('#player').tubeplayer("pause");
});
$('#mute').click(function(){
	$('#player').tubeplayer("mute");
});
$('#newvid').click(function(){
	$('#player').tubeplayer("play", 'YtiFjPVZKHI');
});
$('#timestamp').click(function(){
	$("#showme").text($("#player").tubeplayer("data").currentTime);
});

$('body').on("click", "#seek", function(){
	var foo = $(this).attr('data-time');
	$('#hiddentimeholder').text(foo);
	var foobar = $('#hiddentimeholder').text();
	$('#player').tubeplayer("seek", foobar);
});
$("#gradient").after("<div class='show-hide' style='width:"+$('#cc').css("width")+"; text-align: center; position:relative; top: -28px; text-shadow: 1px 1px 2px white;'>Hide / Show Transcript</div>");
$('.show-hide').click(function(){
	$('#gradient').toggle('slow');
	$('.ui-resizable').slideToggle('slow');
});
$(".resizable").wrap('<div/>').css({'overflow':'hidden'}).parent()
	.css({'display':'inline-block',
		'overflow':'hidden',
		'height':function(){return $('.resizable',this).height();},
		'width':  function(){return $('.resizable',this).width();},
		'paddingRight':'12px',
	}).resizable({
	start: function(event, ui) {
		$(".ui-resizable-s").addClass('noclick');
	},
	stop: function(event, ui) {
		$('body').css('cursor', 'default');
	}
}).find('.resizable')
	.css({overflow:'auto',
		width:'100%',
		height:'100%',
	});

// Handle resizing, click and draggable
$(".ui-resizable-s").click(function(){
	if($(this).hasClass('noclick')) {
		$(this).removeClass('noclick');
	} else {
		$('#gradient').toggle('slow');
		$('.ui-resizable').slideToggle('slow');
	}
})
.css("minHeight","16px")
.css("minWidth","16px");