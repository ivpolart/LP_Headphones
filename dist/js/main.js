jQuery(function() {
	initVideo();
});

function initVideo() {
	$(".video-block .play-button").on("click", function (e) {
		e.preventDefault();

		const $btn = $(this);
		const $block = $btn.closest(".video-block");
		const $video = $block.find("video").get(0);

		if ($video) {
			$video.play(); 
			$btn.fadeOut(300);
		}
	});
}
