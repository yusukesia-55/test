/* ===========================================================
   MATSURI — Photo Showcase Interactions
   =========================================================== */

(() => {
  'use strict';

  /* ---------- Progress bar + section counter ---------- */
  const progressBar = document.querySelector('.progress__bar');
  const counter = document.querySelector('.counter');
  const counterNum = counter?.querySelector('b');
  const counterName = counter?.querySelector('span');
  const sections = Array.from(document.querySelectorAll('section[data-idx]'));
  const total = sections.length;

  const updateProgress = () => {
    const h = document.documentElement;
    const scrolled = h.scrollTop || document.body.scrollTop;
    const max = h.scrollHeight - h.clientHeight;
    const pct = max > 0 ? (scrolled / max) * 100 : 0;
    if (progressBar) progressBar.style.width = pct + '%';
  };

  const updateCounter = () => {
    const mid = window.innerHeight * 0.4;
    let cur = sections[0];
    for (const s of sections) {
      const r = s.getBoundingClientRect();
      if (r.top <= mid) cur = s;
    }
    if (cur && counterNum) {
      const idx = cur.dataset.idx.padStart(2, '0');
      const name = cur.dataset.name || '';
      counterNum.textContent = idx;
      counterName.textContent = name;
      // switch counter theme for dark sections
      if (cur.classList.contains('dark')) counter.classList.add('on-dark');
      else counter.classList.remove('on-dark');
    }
  };

  // dark theme for counter
  const style = document.createElement('style');
  style.textContent = `
    .counter.on-dark{background:rgba(26,22,20,.55);border-color:rgba(245,241,234,.1);color:#a89f92}
    .counter.on-dark b{color:var(--ivory)}
    .counter.on-dark em{color:#7a7166}
  `;
  document.head.appendChild(style);

  let ticking = false;
  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        updateProgress();
        updateCounter();
        parallax();
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });

  /* ---------- Reveal on scroll ---------- */
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add('is-in');
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
  document.querySelectorAll('.reveal').forEach((el) => io.observe(el));

  /* ---------- Hero parallax (subtle) ---------- */
  const heroImg = document.querySelector('.hero__img');
  const parallax = () => {
    if (!heroImg) return;
    const y = window.scrollY;
    const vh = window.innerHeight;
    if (y > vh) return;
    // gentle 12% shift over first viewport
    const t = Math.min(y / vh, 1);
    heroImg.style.transform = `translate3d(0, ${t * 60}px, 0) scale(${1 + t * 0.04})`;
  };

  /* ---------- Lightbox ---------- */
  const lb = document.querySelector('.lb');
  const lbImg = lb?.querySelector('.lb__img');
  const lbCap = lb?.querySelector('.lb__cap');
  const lbCount = lb?.querySelector('.lb__count');
  const lbTargets = Array.from(document.querySelectorAll('[data-lb]'));
  let lbIndex = 0;

  const items = lbTargets.map((el) => ({
    src: el.dataset.lb,
    cap: el.dataset.cap || '',
  }));

  const openLb = (i) => {
    lbIndex = (i + items.length) % items.length;
    const it = items[lbIndex];
    lbImg.src = it.src;
    lbCap.textContent = it.cap;
    lbCount.textContent = `${String(lbIndex + 1).padStart(2, '0')} / ${String(items.length).padStart(2, '0')}`;
    lb.classList.add('is-open');
    document.body.style.overflow = 'hidden';
  };
  const closeLb = () => {
    lb.classList.remove('is-open');
    document.body.style.overflow = '';
  };
  lbTargets.forEach((el, i) => {
    el.addEventListener('click', () => openLb(i));
    el.style.cursor = 'zoom-in';
  });
  lb?.addEventListener('click', (e) => {
    if (e.target === lb || e.target.classList.contains('lb__stage')) closeLb();
  });
  document.querySelector('.lb__close')?.addEventListener('click', closeLb);
  document.querySelector('.lb__nav--prev')?.addEventListener('click', () => openLb(lbIndex - 1));
  document.querySelector('.lb__nav--next')?.addEventListener('click', () => openLb(lbIndex + 1));
  window.addEventListener('keydown', (e) => {
    if (!lb?.classList.contains('is-open')) return;
    if (e.key === 'Escape') closeLb();
    if (e.key === 'ArrowLeft') openLb(lbIndex - 1);
    if (e.key === 'ArrowRight') openLb(lbIndex + 1);
  });

  /* ---------- Before / After slider ---------- */
  document.querySelectorAll('.ba__slider').forEach((slider) => {
    const after = slider.querySelector('.ba__after');
    const handle = slider.querySelector('.ba__handle');
    const grip = slider.querySelector('.ba__grip');
    let dragging = false;

    const setPos = (x) => {
      const r = slider.getBoundingClientRect();
      const pct = Math.max(2, Math.min(98, ((x - r.left) / r.width) * 100));
      after.style.clipPath = `inset(0 0 0 ${pct}%)`;
      handle.style.left = pct + '%';
      grip.style.left = pct + '%';
    };

    // init 50%
    setPos(slider.getBoundingClientRect().left + slider.getBoundingClientRect().width * 0.5);

    const onDown = (e) => {
      dragging = true;
      const x = e.touches ? e.touches[0].clientX : e.clientX;
      setPos(x);
    };
    const onMove = (e) => {
      if (!dragging) return;
      const x = e.touches ? e.touches[0].clientX : e.clientX;
      setPos(x);
    };
    const onUp = () => { dragging = false; };

    slider.addEventListener('mousedown', onDown);
    slider.addEventListener('touchstart', onDown, { passive: true });
    window.addEventListener('mousemove', onMove);
    window.addEventListener('touchmove', onMove, { passive: true });
    window.addEventListener('mouseup', onUp);
    window.addEventListener('touchend', onUp);
  });

  /* ---------- Hotspots ---------- */
  const hsPoints = document.querySelectorAll('.hotspot__pt');
  const hsTitle = document.querySelector('.hotspot__panel h3');
  const hsBody = document.querySelector('.hotspot__panel p');
  const hsHint = document.querySelector('.hotspot__panel .hint');

  const hsData = {
    a: { title: '提灯', body: 'この祭りの空気を最も強く支配しているのは、頭上に連なる提灯の温かい光です。夜が近づくにつれて内側から灯りが漏れ、和紙の繊維までもがオレンジに透ける。' },
    b: { title: '法被', body: '揃いの法被と鉢巻きは、担ぎ手や踊り手にとって「役割」を示す衣装です。背中の紋、襟元の色、袖の折り方に、その町会ごとの誇りが宿ります。' },
    c: { title: '手の形', body: '盆踊りの所作では、指先の角度、手のひらの向き、肘の高さで意味が変わります。カメラを引くと集団の統一に、寄ると一人の指先の物語になる。' },
    d: { title: '足元', body: '下駄が石畳を打つ音、浴衣の裾のわずかな揺れ。祭りの音は上からではなく、いつも足元からやってきます。' },
    e: { title: '屋台', body: '湯気と油、金魚の水槽の光、綿飴の白。屋台は視覚だけでなく嗅覚と記憶を呼び覚ますディテールです。' },
  };

  hsPoints.forEach((pt) => {
    pt.addEventListener('click', () => {
      hsPoints.forEach((p) => p.classList.remove('is-active'));
      pt.classList.add('is-active');
      const d = hsData[pt.dataset.pt];
      if (d) {
        hsTitle.textContent = d.title;
        hsBody.textContent = d.body;
        hsHint.textContent = `Detail — ${pt.dataset.pt.toUpperCase()} of ${Object.keys(hsData).length}`;
      }
    });
  });

  /* ---------- initial ---------- */
  updateProgress();
  updateCounter();
  parallax();
})();
