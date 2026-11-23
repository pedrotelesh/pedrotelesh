(function () {
  const track = document.getElementById('marcas-track');
  const btnPrev = document.getElementById('carrossel-prev');
  const btnNext = document.getElementById('carrossel-next');
  const indicatorsContainer = document.getElementById('carrossel-indicadores');
  const carousel = document.querySelector('.marcas-carrossel');

  if (!track || !btnPrev || !btnNext) return;

  const items = Array.from(track.querySelectorAll('.marcas-item'));
  if (items.length === 0) return;

  let currentIndex = 0;
  let autoplayTimer = null;
  const autoplayDelay = 4000;

  // Criar indicadores (pontos)
  if (indicatorsContainer) {
    indicatorsContainer.innerHTML = '';
    items.forEach((item, index) => {
      const dot = document.createElement('button');
      dot.type = 'button';
      dot.className = 'carrossel-ponto' + (index === 0 ? ' ativo' : '');
      dot.setAttribute('role', 'tab');
      dot.setAttribute('aria-label', 'Ir para marca ' + (index + 1));
      dot.setAttribute('aria-selected', index === 0 ? 'true' : 'false');
      dot.addEventListener('click', () => {
        scrollToIndex(index);
        restartAutoplay();
      });
      indicatorsContainer.appendChild(dot);
    });
  }

  function getStep() {
    const first = items[0];
    if (!first) return 300;
    const style = window.getComputedStyle(track);
    const gap = parseFloat(style.gap) || 20;
    return first.getBoundingClientRect().width + gap;
  }

  function updateActiveIndicator(index) {
    currentIndex = Math.max(0, Math.min(index, items.length - 1));
    if (!indicatorsContainer) return;
    const dots = indicatorsContainer.querySelectorAll('.carrossel-ponto');
    dots.forEach((dot, idx) => {
      const isActive = idx === currentIndex;
      dot.classList.toggle('ativo', isActive);
      dot.setAttribute('aria-selected', isActive ? 'true' : 'false');
    });
  }

  function scrollToIndex(index) {
    if (index < 0) {
      index = items.length - 1;
    } else if (index >= items.length) {
      index = 0;
    }
    const target = items[index];
    if (target) {
      const scrollLeft = target.offsetLeft - track.offsetLeft;
      track.scrollTo({ left: scrollLeft, behavior: 'smooth' });
      updateActiveIndicator(index);
    }
  }

  btnPrev.addEventListener('click', () => {
    scrollToIndex(currentIndex - 1);
    restartAutoplay();
  });

  btnNext.addEventListener('click', () => {
    scrollToIndex(currentIndex + 1);
    restartAutoplay();
  });

  // Atualizar indicador ativo durante rolagem touch / manual
  let scrollTimeout;
  track.addEventListener('scroll', () => {
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => {
      const scrollPos = track.scrollLeft;
      const step = getStep();
      const newIndex = Math.round(scrollPos / step);
      updateActiveIndicator(newIndex);
    }, 60);
  }, { passive: true });

  // Autoplay
  function startAutoplay() {
    stopAutoplay();
    autoplayTimer = setInterval(() => {
      scrollToIndex(currentIndex + 1);
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

  if (carousel) {
    carousel.addEventListener('mouseenter', stopAutoplay);
    carousel.addEventListener('mouseleave', startAutoplay);
    carousel.addEventListener('focusin', stopAutoplay);
    carousel.addEventListener('focusout', startAutoplay);
    carousel.addEventListener('touchstart', stopAutoplay, { passive: true });
    carousel.addEventListener('touchend', startAutoplay, { passive: true });

    // Navegação por teclado (setas)
    carousel.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') {
        scrollToIndex(currentIndex - 1);
        restartAutoplay();
      } else if (e.key === 'ArrowRight') {
        scrollToIndex(currentIndex + 1);
        restartAutoplay();
      }
    });
  }

  startAutoplay();
})();
