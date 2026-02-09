document.addEventListener('DOMContentLoaded', () => {
  initSlider();
});

function initSlider() {
	const sliderBlock =  document.querySelector('.product-swiper');
	const prevBtn = sliderBlock.querySelector('.bullet-prev');
	const activeBtn = sliderBlock.querySelector('.bullet-active');
	const nextBtn = sliderBlock.querySelector('.bullet-next');
	
	const swiper = new Swiper('.products-swiper', {
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

	function updateCustomPagination() {
    // В loop режиме swiper.slides содержит клоны, поэтому берём "реальные" индексы через realIndex
    const realIndex = swiper.realIndex; // 0..(n-1)
    const realSlides = sliderBlock.querySelectorAll('.swiper-wrapper > .swiper-slide:not(.swiper-slide-duplicate)');
    const total = realSlides.length;

    const prevIdx = (realIndex - 1 + total) % total;
    const nextIdx = (realIndex + 1) % total;

    btnPrev.style.background = getColorFromSlideEl(realSlides[prevIdx]);
    btnActive.style.background = getColorFromSlideEl(realSlides[realIndex]);
    btnNext.style.background = getColorFromSlideEl(realSlides[nextIdx]);
  }
	
	// document.querySelector('.custom-pagination').addEventListener('click', e => {
	// 	if (e.target.dataset.dir === 'prev') swiper.slidePrev();
	// 	if (e.target.dataset.dir === 'next') swiper.slideNext();
	// });
} 