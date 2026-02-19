document.addEventListener('DOMContentLoaded', () => {
  initHeader();
  initSlider();
});

function initHeader() {
  const header = document.querySelector('#header');
  const nav = document.querySelector('#nav-bar');
  const opener = nav?.querySelector('.nav-opener');
  const drop = nav?.querySelector('.nav-drop');

  window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 0);
  });
  
  function setHeaderHeightVar() {
    const headerHeight = header.getBoundingClientRect().height;
    header.style.setProperty('--_header-height', `${headerHeight}px`);
  }

  function openMenu() {
    setHeaderHeightVar();
    nav.classList.add('nav-active');
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    nav.classList.remove('nav-active');
    document.body.style.overflow = '';
  }

  function toggleMenu() {
    nav.classList.contains('nav-active') ? closeMenu() : openMenu();
  }

  opener.addEventListener('click', (e) => {
    e.preventDefault();
    toggleMenu();
  });

  const isDesktop = window.matchMedia('(min-width: 768px)').matches;

  drop.addEventListener('click', (e) => {
    const link = e.target.closest('a');
    if (!link) return;

    if(isDesktop && nav.classList.contains('nav-active')) {
      closeMenu()
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key !== 'Escape') return;
    closeMenu()
  });

  window.addEventListener('resize', () => {
    setHeaderHeightVar();

    if(isDesktop) {
      closeMenu()
    }
  });

  setHeaderHeightVar();
}

function initSlider() {
  const sliderProductsBlock = document.querySelector('.products-swiper');
  const sliderFeaturesBlock = document.querySelector('.features-swiper');
  const sliderDetailsBlock = document.querySelector('.details-swiper');
  
  if (!sliderProductsBlock) return;
  if (!sliderFeaturesBlock) return;
  if (!sliderDetailsBlock) return;

  const prevBtn = sliderProductsBlock.querySelector('.bullet-prev');
  const activeBtn = sliderProductsBlock.querySelector('.bullet-active');
  const nextBtn = sliderProductsBlock.querySelector('.bullet-next');
  if (!prevBtn || !activeBtn || !nextBtn) return;

  const originalSlides = Array.from(sliderProductsBlock.querySelectorAll('.swiper-wrapper > .swiper-slide'));
  const colors = originalSlides.map(s => s.dataset.color || '#dedede');
  const total = colors.length;

  const productsSwiper = new Swiper(sliderProductsBlock, {
    loop: true,
    centeredSlides: true,
    slidesPerView: 2,
	  spaceBetween: 30,
    initialSlide: 1,
    centeredSlides: true,
	  breakpoints: {
      480: {        
        slidesPerView: 2,
      },
      1024: {       
        slidesPerView: 3,
        spaceBetween: 60,
      },
    },
  });

  const featuresSwiper = new Swiper(sliderFeaturesBlock, {
    slidesPerView: 1.035,
	  spaceBetween: 16,
    centeredSlides: true,
    breakpoints: {
      1024: {       
        centeredSlides: false,
      },
    },
  });

  const detailsSwiper = new Swiper(sliderDetailsBlock, {
    slidesPerView: 1.1,
	  spaceBetween: 16,
    centeredSlides: true,
    breakpoints: {
      480: {        
        slidesPerView: 2.2,
      },
      1024: {       
        slidesPerView: 2.82,
        centeredSlides: false,
      },
    },
  });

  function setColor(btn, color) {
    btn.style.background = color || '#dedede';
  }

  function customPagination() {
    const i = productsSwiper.realIndex;

    const prevIdx = (i - 1 + total) % total;
    const nextIdx = (i + 1) % total;

    setColor(prevBtn, colors[prevIdx]);
    setColor(activeBtn, colors[i]);
    setColor(nextBtn, colors[nextIdx]);

    console.log('realIndex:', i);
  }

  productsSwiper.on('slideChangeTransitionEnd', () => setTimeout(customPagination, 0));
  customPagination();

  prevBtn.addEventListener('click', () => productsSwiper.slidePrev());
  nextBtn.addEventListener('click', () => productsSwiper.slideNext());
}
