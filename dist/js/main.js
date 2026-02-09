document.addEventListener('DOMContentLoaded', () => {
  initSlider();
});

function initSlider() {
	const sliderBlock =  document.querySelector('.products-swiper');
	const prevBtn = sliderBlock.querySelector('.bullet-prev');
	const activeBtn = sliderBlock.querySelector('.bullet-active');
	const nextBtn = sliderBlock.querySelector('.bullet-next');
	
	const swiper = new Swiper(sliderBlock, {
		loop: true,
		centeredSlides: true,
		slidesPerView: 3,
		spaceBetween: 70,
		initialSlide: 1,
	})

	function getColorPagination(slideEl) {
		if (!slideEl) {
			return '#dedede';
		}

		if (!slideEl.dataset) {
			return '#dedede';
		}

		if (!slideEl.dataset.color) {
			return '#dedede';
		}

		return slideEl.dataset.color;
	}

	function customPagination() {
		const activeIndex = swiper.realIndex;
		const realSlides = sliderBlock.querySelectorAll('.swiper-wrapper > .swiper-slide:not(.swiper-slide-duplicate)');
		const totalSlides = realSlides.length;
		
		const prevIdx = (activeIndex - 1 + totalSlides) % totalSlides;
		const nextIdx = (activeIndex + 1) % totalSlides;

		prevBtn.style.background = getColorPagination(realSlides[prevIdx]);
		activeBtn.style.background = getColorPagination(realSlides[activeIndex]);
		nextBtn.style.background = getColorPagination(realSlides[nextIdx]);
		console.log('realIndex:', swiper.realIndex);
		console.log(nextBtn.style.background);
		
		console.log('realIndex', swiper.realIndex, 'activeIndex', swiper.activeIndex);

  	}

	// swiper.on('init', customPagination)
	swiper.on('slideChangeTransitionEnd', customPagination);
	// customPagination();


	prevBtn.addEventListener('click', () => {
		swiper.slidePrev()
	})

	nextBtn.addEventListener('click', () => {
		swiper.slideNext()
	})
}