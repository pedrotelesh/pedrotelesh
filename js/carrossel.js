(function () {
  const track = document.getElementById('marcas-track');
  const indicatorsContainer = document.getElementById('carrossel-indicadores');
  const carousel = document.querySelector('.marcas-carrossel');

  if (!track || !indicatorsContainer) return;

  const items = Array.from(track.querySelectorAll('.marcas-item'));
  if (items.length === 0) return;

  let currentPage = 0;
  let autoplayTimer = null;
  const autoplayDelay = 3500;
  let lastPageCount = -1;

  function getVisibleCount() {
    const trackWidth = track.clientWidth;
    const first = items[0];
    if (!first || trackWidth === 0) return 3;
    const itemWidth = first.getBoundingClientRect().width;
    if (itemWidth <= 0) return 3;
    return Math.max(1, Math.round(trackWidth / itemWidth));
  }

  function getPageCount() {
    const visible = getVisibleCount();
    return Math.max(1, Math.ceil(items.length / visible));
  }

  function getMaxScroll() {
    return Math.max(0, track.scrollWidth - track.clientWidth);
  }

  function getScrollForPage(pageIndex) {
    const maxScroll = getMaxScroll();
    if (maxScroll <= 0) return 0;
    const pageCount = getPageCount();
    if (pageIndex >= pageCount - 1) {
      return maxScroll;
    }
    if (pageIndex <= 0) {
      return 0;
    }
    const visible = getVisibleCount();
    const targetIndex = Math.min(items.length - 1, pageIndex * visible);
    const targetItem = items[targetIndex];
    if (!targetItem) return 0;
    return Math.min(maxScroll, targetItem.offsetLeft - track.offsetLeft);
  }

  function updateActiveDot(pageIndex) {
    const pageCount = getPageCount();
    currentPage = Math.max(0, Math.min(pageIndex, pageCount - 1));
    const dots = indicatorsContainer.querySelectorAll('.carrossel-ponto');
    dots.forEach((dot, idx) => {
      const isActive = idx === currentPage;
      dot.classList.toggle('ativo', isActive);
      dot.setAttribute('aria-selected', isActive ? 'true' : 'false');
    });
  }

  function scrollPageTo(pageIndex, behavior = 'smooth') {
    const pageCount = getPageCount();
    if (pageIndex < 0) pageIndex = pageCount - 1;
    else if (pageIndex >= pageCount) pageIndex = 0;
    const targetLeft = getScrollForPage(pageIndex);
    track.scrollTo({ left: targetLeft, behavior });
    updateActiveDot(pageIndex);
  }

  function buildDots() {
    const pageCount = getPageCount();
    if (pageCount === lastPageCount) return;
    lastPageCount = pageCount;
    indicatorsContainer.innerHTML = '';
    if (pageCount <= 1) return;

    for (let i = 0; i < pageCount; i++) {
      const dot = document.createElement('button');
      dot.type = 'button';
      dot.className = 'carrossel-ponto' + (i === currentPage ? ' ativo' : '');
      dot.setAttribute('role', 'tab');
      dot.setAttribute('aria-label', 'Ir para página ' + (i + 1) + ' de ' + pageCount);
      dot.setAttribute('aria-selected', i === currentPage ? 'true' : 'false');
      dot.addEventListener('click', () => {
        scrollPageTo(i);
        restartAutoplay();
      });
      indicatorsContainer.appendChild(dot);
    }
  }

  function updateActiveDotFromScroll() {
    const maxScroll = getMaxScroll();
    if (maxScroll <= 0) {
      updateActiveDot(0);
      return;
    }
    const progress = Math.max(0, Math.min(1, track.scrollLeft / maxScroll));
    const pageCount = getPageCount();
    const page = Math.min(pageCount - 1, Math.round(progress * (pageCount - 1)));
    updateActiveDot(page);
  }

  let scrollTimeout;
  track.addEventListener('scroll', () => {
    if (isDragging) return;
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(updateActiveDotFromScroll, 40);
  }, { passive: true });

  function startAutoplay() {
    stopAutoplay();
    autoplayTimer = setInterval(() => {
      const pageCount = getPageCount();
      let next = currentPage + 1;
      if (next >= pageCount) next = 0;
      scrollPageTo(next);
    }, autoplayDelay);
  }

  function stopAutoplay() {
    if (autoplayTimer) {
      clearInterval(autoplayTimer);
      autoplayTimer = null;
    }
  }

  function restartAutoplay() {
    stopAutoplay();
    startAutoplay();
  }

  let isDown = false;
  let isDragging = false;
  let startX = 0;
  let scrollStart = 0;
  let draggedDistance = 0;

  track.addEventListener('pointerdown', (e) => {
    if (e.pointerType === 'mouse' && e.button !== 0) return;
    isDown = true;
    isDragging = false;
    draggedDistance = 0;
    startX = e.clientX;
    scrollStart = track.scrollLeft;
    stopAutoplay();
  });

  window.addEventListener('pointermove', (e) => {
    if (!isDown) return;
    const dx = e.clientX - startX;
    draggedDistance = Math.abs(dx);
    if (draggedDistance > 5) {
      if (!isDragging) {
        isDragging = true;
        track.classList.add('is-dragging');
      }
      track.scrollLeft = scrollStart - dx;
    }
  });

  function endDrag() {
    if (!isDown) return;
    isDown = false;
    if (isDragging) {
      track.classList.remove('is-dragging');
      const maxScroll = getMaxScroll();
      if (maxScroll > 0) {
        const progress = Math.max(0, Math.min(1, track.scrollLeft / maxScroll));
        const pageCount = getPageCount();
        const nearest = Math.min(pageCount - 1, Math.round(progress * (pageCount - 1)));
        scrollPageTo(nearest);
      }
      setTimeout(() => {
        isDragging = false;
      }, 50);
    }
    restartAutoplay();
  }

  window.addEventListener('pointerup', endDrag);
  window.addEventListener('pointercancel', endDrag);

  track.addEventListener('click', (e) => {
    if (draggedDistance > 5) {
      e.preventDefault();
      e.stopPropagation();
      draggedDistance = 0;
    }
  }, true);

  if (carousel) {
    carousel.addEventListener('mouseenter', stopAutoplay);
    carousel.addEventListener('mouseleave', startAutoplay);
    carousel.addEventListener('focusin', stopAutoplay);
    carousel.addEventListener('focusout', startAutoplay);
    carousel.addEventListener('touchstart', stopAutoplay, { passive: true });
    carousel.addEventListener('touchend', restartAutoplay, { passive: true });

    carousel.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') {
        scrollPageTo(currentPage - 1);
        restartAutoplay();
      } else if (e.key === 'ArrowRight') {
        scrollPageTo(currentPage + 1);
        restartAutoplay();
      }
    });
  }

  window.addEventListener('resize', () => {
    buildDots();
    updateActiveDotFromScroll();
  });

  buildDots();
  updateActiveDot(0);
  startAutoplay();
})();
