/* ============================================================
   Atom — UX/UI & Visual Designer Portfolio
   main.js — projects data, grid render, category filter,
   scroll reveals, nav behavior, mobile menu.
   Every project card links to its own case-study page.
   Site is opened via file:// — all paths relative, raw strings
   kept EXACTLY as on disk and encoded via encodeURI().
   ============================================================ */
'use strict';

/* ------------------------------------------------------------
   1. PROJECT CATALOG — cover paths are byte-for-byte as on disk.
   Never "clean up" a filename. `url` = case-study page at root.
   Optional per-project cover options (image-handling standard):
   - fit: 'contain' → logo/wide artwork shown whole, padded, on a
     calm background (bg: 'white' | 'surface', default white)
   - pos: 'top'     → tall screenshots/posters crop from the top
     so the meaningful header/branding stays visible
   ------------------------------------------------------------ */
const PROJECTS = [
  {
    title: 'Baania',
    category: 'UX/UI Design',
    tagline: "Full UX/UI for Thailand's real-estate marketplace, from search to price estimates.",
    cover: 'images/projects/baania/Home-01.jpg',
    url: 'baania.html'
  },
  {
    title: 'Smart Utilities',
    category: 'UX/UI Design',
    tagline: "Municipal utility platform that grew one district's revenue from ฿0.9M to ฿8M a month.",
    cover: 'images/projects/smart-utilities/Dashboard.jpg',
    url: 'smart-utilities.html'
  },
  {
    title: 'TILOG Virtual Expo',
    category: 'UX/UI Design',
    tagline: 'Online business-matching platform for the TILOG-LOGISTIX trade event.',
    cover: 'images/projects/tivlog/home page.png',
    url: 'tivlog.html'
  },
  {
    title: 'True iService',
    category: 'UX/UI Design',
    tagline: 'Tablet POS app that guides telecom staff through a complete SIM sale in one flow.',
    cover: 'images/projects/true-iservice/Screen1.jpg',
    url: 'true-iservice.html'
  },
  {
    title: 'M-Culture Big Data',
    category: 'UX/UI Design',
    tagline: 'Big-data platform UI for the Ministry of Culture, where Thai motifs meet modern layout.',
    cover: 'images/projects/MOC/Landing-page.png',
    pos: 'top',   /* very tall page screenshot — keep the hero header visible */
    url: 'moc.html'
  },
  {
    title: 'K-FLO',
    category: 'UX/UI Design',
    tagline: 'Bilingual corporate website for an industrial filtration brand, responsive on every screen.',
    cover: 'images/projects/k-flo/Mockup1.jpg',
    url: 'k-flo.html'
  },
  {
    title: 'Crypto Wushu Game',
    category: 'UX/UI Design',
    tagline: 'Landing page, character cards and marketplace UI for an NFT martial-arts game.',
    cover: 'images/projects/wushu Game/Landing page.jpg',
    pos: 'top',   /* very tall page screenshot — keep the game hero visible */
    url: 'wushu.html'
  },
  {
    title: 'Neue Space Cafe',
    category: 'Branding',
    tagline: 'A kraft-and-white pattern system carried across logo, packaging and bags.',
    cover: 'images/projects/Nueu-Cafe/Bag.png',
    url: 'nueu-cafe.html'
  },
  {
    title: 'Korner St.',
    category: 'Branding',
    tagline: 'Hotel branding for a Siem Reap corner stay — window-grille shapes recast in warm shades of orange.',
    cover: 'images/projects/Korner st./logo.jpg',
    url: 'korner-st.html'
  },
  {
    title: 'Ordinary Bangkok',
    category: 'Branding',
    tagline: 'Minimalist kraft-and-white identity for a Thai homeware label — creatively ordinary.',
    cover: 'images/projects/Ordinaly Bangkok/Hero Banner_Ord.jpg',
    /* client-approved cover crop — wordmark sits dead center, default center position reads well */
    url: 'ordinary-bangkok.html'
  },
  {
    title: 'New Economy Academy',
    category: 'Branding',
    tagline: 'Full identity for a government learning academy — logo, color, graphic style and print.',
    cover: 'images/projects/new-economy-academy/NEA_FULL_LOGO.png',
    fit: 'contain',   /* wide logo lockup — logos are always shown whole */
    bg: 'white',
    url: 'new-economy-academy.html'
  },
  {
    title: 'Craftman Roastery',
    category: 'Branding',
    tagline: "A cafe in Silpa Bhirasri's former house — where a coffee visit becomes a museum visit.",
    cover: 'images/projects/craftman-roastery/Craftman cafe  design.png',
    url: 'craftman-roastery.html'
  },
  {
    title: 'Bangkok University Bulletin',
    category: 'Graphic Design',
    tagline: "Editorial design for BU International's bulletin, wrapped in a low-poly world map.",
    cover: 'images/projects/Bangkok University Bullentin/Cover-Bangkok University Bullentin.png',
    fit: 'contain',   /* wide book spread — a center 4/3 crop cuts both covers */
    bg: 'surface',
    url: 'bangkok-university-bulletin.html'
  },
  {
    title: 'DCA Book',
    category: 'Graphic Design',
    tagline: 'Book and poster design for a DCA investment publication, plus launch rewards.',
    cover: 'images/projects/dca-book/Book&Poster.png',
    url: 'dca-book.html'
  },
  {
    title: 'TCEB × Thai Airways',
    category: 'Graphic Design',
    tagline: 'Leaflet and banner set for the TCEB & TG "Optimice Pass" MICE-travel campaign.',
    cover: 'images/projects/Tceb/AW_TCEB&TG_Optimice Pass_leaflet_A5-PREVIEW.jpg',
    url: 'tceb.html'
  },
  {
    title: 'NT Life Smart Solutions',
    category: 'Graphic Design',
    tagline: 'Six "Smart" key visuals, brochures and roll-up banners for NT Digital Solutions.',
    cover: 'images/projects/nt-life/KV/Smart-Business.jpg',
    pos: 'top',   /* portrait key visual — headline and logo sit at the top */
    url: 'nt-smart-life.html'
  },
  {
    title: 'CAT Market 4.0',
    category: 'Marketing & Social',
    tagline: "An online-to-offline campaign that launched CAT's iget mart app through a real market event.",
    cover: 'images/projects/cat-marketing/Key visual.jpg',
    url: 'cat-marketing.html'
  },
  {
    title: 'Social Media Content',
    category: 'Marketing & Social',
    tagline: 'Ongoing social content for 7-Eleven, SCG, Arabus, Weber and Thailand Trust Mark.',
    cover: 'images/projects/social-media/7-11.jpg',
    url: 'social-media.html'
  }
];

/* ------------------------------------------------------------
   Helpers
   ------------------------------------------------------------ */
const REDUCED_MOTION = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/** Lock/unlock page scroll, compensating scrollbar width (no layout jump). */
function lockScroll() {
  const sw = window.innerWidth - document.documentElement.clientWidth;
  document.documentElement.style.overflow = 'hidden';
  if (sw > 0) document.body.style.paddingRight = sw + 'px';
}
function unlockScroll() {
  document.documentElement.style.overflow = '';
  document.body.style.paddingRight = '';
}

/* ------------------------------------------------------------
   2. Work grid render — every card is a link to its case page
   ------------------------------------------------------------ */
function renderGrid() {
  const grid = document.getElementById('work-grid');
  if (!grid) return;

  PROJECTS.forEach(function (project, idx) {
    const li = document.createElement('li');
    li.className = 'work-item reveal';
    li.dataset.category = project.category;
    li.style.setProperty('--i', Math.min(idx, 5));

    const card = document.createElement('a');
    card.className = 'project-card';
    card.href = project.url;

    /* Figure (span keeps the card content as phrasing content) */
    const figure = document.createElement('span');
    figure.className = 'card-figure';
    if (project.fit === 'contain') {
      figure.classList.add('card-figure--contain');
      if (project.bg === 'surface') figure.classList.add('card-figure--surface');
    }

    const img = document.createElement('img');
    img.src = encodeURI(project.cover);
    img.alt = project.title + ' — project cover';
    img.loading = 'lazy';
    img.decoding = 'async';
    if (project.pos === 'top') img.style.objectPosition = 'top';
    figure.appendChild(img);

    const overlay = document.createElement('span');
    overlay.className = 'card-overlay';
    overlay.setAttribute('aria-hidden', 'true');
    const overlayLabel = document.createElement('span');
    overlayLabel.className = 'card-overlay-label';
    overlayLabel.textContent = 'View case study →';
    overlay.appendChild(overlayLabel);
    figure.appendChild(overlay);

    card.appendChild(figure);

    const tags = document.createElement('span');
    tags.className = 'card-tags';
    const pill = document.createElement('span');
    pill.className = 'tag-pill';
    pill.textContent = project.category;
    tags.appendChild(pill);
    card.appendChild(tags);

    const title = document.createElement('span');
    title.className = 'card-title';
    title.textContent = project.title;
    card.appendChild(title);

    const tagline = document.createElement('span');
    tagline.className = 'card-tagline';
    tagline.textContent = project.tagline;
    card.appendChild(tagline);

    li.appendChild(card);
    grid.appendChild(li);
  });
}

/* ------------------------------------------------------------
   3. Category filter
   ------------------------------------------------------------ */
function initFilter() {
  const bar = document.querySelector('.filter-bar');
  if (!bar) return;
  const pills = bar.querySelectorAll('.filter-pill');
  const items = document.querySelectorAll('.work-item');
  const timers = new WeakMap();
  const HIDE_MS = REDUCED_MOTION ? 0 : 260;

  bar.addEventListener('click', function (e) {
    const pill = e.target.closest('.filter-pill');
    if (!pill || pill.classList.contains('is-active')) return;

    pills.forEach(function (p) {
      const active = p === pill;
      p.classList.toggle('is-active', active);
      p.setAttribute('aria-pressed', String(active));
    });

    const cat = pill.dataset.filter;
    items.forEach(function (item) {
      const match = cat === 'All' || item.dataset.category === cat;
      const pending = timers.get(item);
      if (pending) {
        clearTimeout(pending);
        timers.delete(item);
      }
      if (match) {
        item.classList.remove('is-hidden');
        /* next frame: fade/scale back in */
        requestAnimationFrame(function () {
          requestAnimationFrame(function () {
            item.classList.remove('is-hiding');
          });
        });
      } else {
        item.classList.add('is-hiding');
        timers.set(item, setTimeout(function () {
          item.classList.add('is-hidden');
          timers.delete(item);
        }, HIDE_MS));
      }
    });
  });
}

/* ------------------------------------------------------------
   4. Nav: scrolled state + active section link
   ------------------------------------------------------------ */
function initNav() {
  const nav = document.querySelector('.site-nav');
  if (!nav) return;
  const onScroll = function () {
    nav.classList.toggle('is-scrolled', window.scrollY > 40);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* Active section link */
  const links = document.querySelectorAll('.nav-links a[href^="#"]');
  const map = {};
  links.forEach(function (a) { map[a.getAttribute('href').slice(1)] = a; });
  const sections = document.querySelectorAll('main section[id]');
  if ('IntersectionObserver' in window && sections.length) {
    const io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting && map[entry.target.id]) {
          links.forEach(function (a) { a.classList.remove('is-active'); });
          map[entry.target.id].classList.add('is-active');
        }
      });
    }, { rootMargin: '-40% 0px -55% 0px' });
    sections.forEach(function (s) { io.observe(s); });
  }
}

/* ------------------------------------------------------------
   5. Mobile nav
   ------------------------------------------------------------ */
function initMobileNav() {
  const toggle = document.querySelector('.nav-toggle');
  const menu = document.getElementById('mobile-menu');
  if (!toggle || !menu) return;
  let open = false;

  function setOpen(state) {
    open = state;
    toggle.setAttribute('aria-expanded', String(state));
    toggle.classList.toggle('is-open', state);
    menu.classList.toggle('is-open', state);
    if (state) {
      menu.hidden = false;
      lockScroll();
      requestAnimationFrame(function () { menu.classList.add('is-in'); });
      const firstLink = menu.querySelector('a');
      if (firstLink) firstLink.focus();
    } else {
      menu.classList.remove('is-in');
      unlockScroll();
      const hide = function () { menu.hidden = true; };
      if (REDUCED_MOTION) hide(); else setTimeout(hide, 300);
      toggle.focus();
    }
  }

  toggle.addEventListener('click', function () { setOpen(!open); });
  menu.addEventListener('click', function (e) {
    if (e.target.closest('a')) setOpen(false);
  });
  document.addEventListener('keydown', function (e) {
    if (!open) return;
    if (e.key === 'Escape') {
      setOpen(false);
    } else if (e.key === 'Tab') {
      /* Trap cycles through the toggle (acts as ✕) + menu links */
      const list = [toggle].concat(
        Array.prototype.slice.call(menu.querySelectorAll('a[href]'))
      );
      const first = list[0];
      const last = list[list.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
  });
}

/* ------------------------------------------------------------
   6. Scroll reveals + hero load animation
   ------------------------------------------------------------ */
function initReveals() {
  const els = document.querySelectorAll('.reveal');
  if (REDUCED_MOTION || !('IntersectionObserver' in window)) {
    els.forEach(function (el) { el.classList.add('is-visible'); });
    return;
  }
  const io = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
  els.forEach(function (el) { io.observe(el); });
}

/* ------------------------------------------------------------
   7. Hero constellation — "where insights meet empathy"
   The top layer of the hero: light-blue data points drifting
   over the navy silk banner (Ken Burns + sheen live in
   style.css). Near points connect (insights), and the cloud
   leans gently toward the cursor (empathy). Interim visual until
   the hero video is ready — see FUTURE VIDEO SLOT in index.html.
   - requestAnimationFrame, capped particle count (fewer on small
     screens), paused when the tab is hidden or the hero is out
     of view. Under prefers-reduced-motion a single static frame
     is painted instead of running the loop.
   ------------------------------------------------------------ */
function initHeroField() {
  const canvas = document.getElementById('hero-canvas');
  const hero = document.querySelector('.hero');
  if (!canvas || !hero || !canvas.getContext) return;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  /* Palette: light blues floating over the navy silk banner — visible
     but airy, matching the artwork's baked-in accent (#9DB9F5) */
  const DOT_COLORS = [
    'rgba(157, 185, 245, 0.70)',  /* light blue accent */
    'rgba(255, 255, 255, 0.50)',  /* white sparks */
    'rgba(157, 185, 245, 0.35)'   /* faint blue */
  ];
  const LINE_RGB = '157, 185, 245';
  const LINK_DIST = 150;          /* px — connect dots closer than this */
  const POINTER_R = 200;          /* px — empathy radius */
  const smallScreen = window.matchMedia('(max-width: 700px)');

  let width = 0;
  let height = 0;
  let particles = [];
  let rafId = null;
  let lastT = 0;
  let inView = true;
  const pointer = { x: null, y: null };

  function targetCount() {
    return smallScreen.matches ? 26 : 64;   /* capped, calm */
  }

  function makeParticle() {
    const a = Math.random() * Math.PI * 2;
    const speed = 6 + Math.random() * 10;   /* px per second — a drift, not a swarm */
    return {
      x: Math.random() * width,
      y: Math.random() * height,
      vx: Math.cos(a) * speed,
      vy: Math.sin(a) * speed,
      ax: 0,
      ay: 0,
      r: 1.8 + Math.random() * 1.8,
      color: DOT_COLORS[Math.floor(Math.random() * DOT_COLORS.length)]
    };
  }

  function resize() {
    const w = hero.clientWidth;
    const h = hero.clientHeight;
    /* Ignore tiny mobile viewport-height jitters (URL bar show/hide) */
    if (w === width && Math.abs(h - height) < 120 && particles.length) return;
    width = w;
    height = h;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.round(width * dpr);
    canvas.height = Math.round(height * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    const n = targetCount();
    while (particles.length > n) particles.pop();
    while (particles.length < n) particles.push(makeParticle());
    particles.forEach(function (p) {
      p.x = Math.min(p.x, width);
      p.y = Math.min(p.y, height);
    });
  }

  function draw() {
    ctx.clearRect(0, 0, width, height);

    /* Hairline connections (insights) */
    ctx.lineWidth = 1;
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const a = particles[i];
        const b = particles[j];
        const dx = a.x - b.x;
        const dy = a.y - b.y;
        const d2 = dx * dx + dy * dy;
        if (d2 < LINK_DIST * LINK_DIST) {
          const alpha = (1 - Math.sqrt(d2) / LINK_DIST) * 0.3;
          ctx.strokeStyle = 'rgba(' + LINE_RGB + ', ' + alpha.toFixed(3) + ')';
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
      }
    }

    /* Data points */
    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];
      ctx.fillStyle = p.color;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  function step(t) {
    rafId = null;
    const dt = Math.min((t - lastT) / 1000, 0.05); /* clamp tab-switch jumps */
    lastT = t;

    /* Move */
    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];
      if (pointer.x !== null) {
        const dx = pointer.x - p.x;
        const dy = pointer.y - p.y;
        const d = Math.sqrt(dx * dx + dy * dy);
        if (d > 1 && d < POINTER_R) {
          /* Gentle attraction, strongest near the cursor */
          const f = (1 - d / POINTER_R) * 26;
          p.ax += (dx / d) * f * dt;
          p.ay += (dy / d) * f * dt;
        }
      }
      /* Ease the empathy impulse back out */
      p.ax *= 0.96;
      p.ay *= 0.96;
      p.x += (p.vx + p.ax * 10) * dt;
      p.y += (p.vy + p.ay * 10) * dt;
      /* Wrap softly at the edges */
      if (p.x < -8) p.x = width + 8; else if (p.x > width + 8) p.x = -8;
      if (p.y < -8) p.y = height + 8; else if (p.y > height + 8) p.y = -8;
    }

    draw();

    if (inView && !document.hidden) rafId = requestAnimationFrame(step);
  }

  function play() {
    if (rafId === null && inView && !document.hidden) {
      lastT = performance.now();
      rafId = requestAnimationFrame(step);
    }
  }
  function pause() {
    if (rafId !== null) {
      cancelAnimationFrame(rafId);
      rafId = null;
    }
  }

  /* Reduced motion: paint one static constellation frame over the
     (also static) CSS artwork, keep it sized on resize, no loop. */
  if (REDUCED_MOTION) {
    resize();
    draw();
    window.addEventListener('resize', function () {
      resize();
      draw();
    });
    return;
  }

  /* Pause when the tab is hidden */
  document.addEventListener('visibilitychange', function () {
    if (document.hidden) pause(); else play();
  });

  /* Pause when the hero scrolls out of view */
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver(function (entries) {
      inView = entries[0].isIntersecting;
      if (inView) play(); else pause();
    }, { threshold: 0 });
    io.observe(hero);
  }

  /* Empathy: the field responds to you (canvas itself is
     pointer-events: none, so we listen on the hero) */
  hero.addEventListener('pointermove', function (e) {
    const rect = hero.getBoundingClientRect();
    pointer.x = e.clientX - rect.left;
    pointer.y = e.clientY - rect.top;
  });
  hero.addEventListener('pointerleave', function () {
    pointer.x = null;
    pointer.y = null;
  });

  window.addEventListener('resize', resize);
  resize();
  play();
}

/* ------------------------------------------------------------
   Boot
   ------------------------------------------------------------ */
document.addEventListener('DOMContentLoaded', function () {
  renderGrid();
  initFilter();
  initNav();
  initMobileNav();
  initReveals();
  initHeroField();
});
