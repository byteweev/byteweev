/**
 * ============================================================================
 * BYTEWEEV — APPLICATION ENGINE & GALLERY SHOWCASE
 * Handles navigation active state, scroll progress, interactive screenshot
 * gallery spotlight, lightbox modal, category filtering, and contact form.
 * ============================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
  // Ensure solid dark mode is always enforced
  document.documentElement.setAttribute('data-theme', 'dark');

  initScrollProgress();
  initNavActiveState();
  initMobileMenu();
  initHeroLogoPhysics();
  initLightbox();

  // Page-specific initializers based on present DOM containers
  initCurvedGallery();
  initImageGallery();
  renderHomeStats();
  renderShowcasePage();
  renderAboutPage();
  renderContactPage();
  initFaqAccordion();
  initContactForm();
});

/* ==========================================================================
   1. Scroll Progress Bar
   ========================================================================== */
function initScrollProgress() {
  const progressBar = document.getElementById('scroll-progress');
  if (!progressBar) return;

  window.addEventListener('scroll', () => {
    const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
    if (totalHeight > 0) {
      const progress = (window.scrollY / totalHeight) * 100;
      progressBar.style.width = `${progress}%`;
    }
  }, { passive: true });
}

/* ==========================================================================
   2. Navigation Active State & Mobile Menu
   ========================================================================== */
function initNavActiveState() {
  const path = window.location.pathname;
  const navLinks = document.querySelectorAll('.nav-link');

  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (!href) return;

    if (
      (href === 'index.html' && (path.endsWith('/') || path.endsWith('index.html') || path === '')) ||
      (href !== 'index.html' && path.includes(href))
    ) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
}

function initMobileMenu() {
  const menuToggle = document.getElementById('mobile-menu-toggle');
  const mobileNav = document.getElementById('mobile-nav');
  if (!menuToggle || !mobileNav) return;

  menuToggle.addEventListener('click', () => {
    const isHidden = mobileNav.classList.contains('hidden');
    if (isHidden) {
      mobileNav.classList.remove('hidden');
      menuToggle.setAttribute('aria-expanded', 'true');
    } else {
      mobileNav.classList.add('hidden');
      menuToggle.setAttribute('aria-expanded', 'false');
    }
  });
}

/* ==========================================================================
   3. ByteWeev Logo Emblem Hover Physics
   ========================================================================== */
function initHeroLogoPhysics() {
  const emblem = document.querySelector('.logo-emblem-container');
  if (!emblem) return;

  const shape = emblem.querySelector('.logo-geometric-shape');
  if (!shape) return;

  emblem.addEventListener('mousemove', (e) => {
    const rect = emblem.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    const rotateX = (-y / 10).toFixed(2);
    const rotateY = (x / 10).toFixed(2);
    shape.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.04)`;
  });

  emblem.addEventListener('mouseleave', () => {
    shape.style.transform = 'rotateX(0deg) rotateY(0deg) scale(1)';
  });
}

/* ==========================================================================
   4. Universal Screenshot Lightbox Modal
   ========================================================================== */
let activeLightbox = null;

function initLightbox() {
  let lightbox = document.getElementById('screenshot-lightbox');
  if (!lightbox) {
    lightbox = document.createElement('div');
    lightbox.id = 'screenshot-lightbox';
    lightbox.className = 'screenshot-lightbox';
    lightbox.innerHTML = `
      <div class="lightbox-content-box" onclick="event.stopPropagation()">
        <!-- Lightbox Header -->
        <div class="browser-header">
          <div class="browser-dots">
            <span class="browser-dot" style="background-color: #ef4444;"></span>
            <span class="browser-dot" style="background-color: #eab308;"></span>
            <span class="browser-dot" style="background-color: #10b981;"></span>
          </div>
          <div id="lightbox-url" class="browser-url-bar">https://...</div>
          <button id="lightbox-close-btn" class="p-1 text-zinc-400 hover:text-white mono text-sm font-bold" aria-label="Close modal">✕</button>
        </div>

        <!-- Image Display Area -->
        <div class="lightbox-image-holder">
          <img id="lightbox-img" src="" alt="Project screenshot preview">
        </div>

        <!-- Lightbox Caption Footer -->
        <div class="p-5 bg-[#0c0c0f] border-t border-[#222227] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h3 id="lightbox-title" class="font-display font-bold text-lg text-white">Project Title</h3>
            <p id="lightbox-desc" class="text-xs text-[#a1a1aa] mt-1 max-w-xl">Project description</p>
          </div>
          <div class="flex items-center gap-3 w-full sm:w-auto">
            <a id="lightbox-live-link" href="#" target="_blank" rel="noopener" class="btn-primary text-xs w-full sm:w-auto text-center">
              <span>Open Live Site ↗</span>
            </a>
          </div>
        </div>
      </div>
    `;
    document.body.appendChild(lightbox);

    // Close handlers
    lightbox.addEventListener('click', closeLightbox);
    document.getElementById('lightbox-close-btn').addEventListener('click', closeLightbox);
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && lightbox.classList.contains('active')) {
        closeLightbox();
      }
    });
  }
  activeLightbox = lightbox;
}

function openLightbox(item) {
  if (!activeLightbox) initLightbox();
  const imgEl = document.getElementById('lightbox-img');
  const titleEl = document.getElementById('lightbox-title');
  const descEl = document.getElementById('lightbox-desc');
  const urlEl = document.getElementById('lightbox-url');
  const linkEl = document.getElementById('lightbox-live-link');

  const imgSrc = typeof item === 'string' ? item : (item.screenshot || item.image || '');
  const titleText = typeof item === 'string' ? '' : (item.title || '');
  const descText = typeof item === 'string' ? '' : (item.desc || item.shortDesc || item.fullDesc || '');
  const urlText = typeof item === 'string' ? '' : (item.url || '');

  if (imgEl) imgEl.src = imgSrc;
  if (titleEl) {
    titleEl.textContent = titleText;
    titleEl.style.display = titleText ? 'block' : 'none';
  }
  if (descEl) {
    descEl.textContent = descText;
    descEl.style.display = descText ? 'block' : 'none';
  }
  if (urlEl) {
    urlEl.textContent = urlText && urlText !== '#' ? urlText : (titleText || 'BYTEWEEV IMAGE');
  }
  if (linkEl) {
    if (urlText && urlText !== '#') {
      linkEl.href = urlText;
      linkEl.style.display = 'inline-flex';
    } else {
      linkEl.style.display = 'none';
    }
  }

  activeLightbox.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  if (activeLightbox) {
    activeLightbox.classList.remove('active');
    document.body.style.overflow = '';
  }
}

/* ==========================================================================
   5. 3D Curved Horizontal Scroll Gallery (Cylindrical Arc Layout)
   ========================================================================== */
function initCurvedGallery() {
  const viewport = document.getElementById('curved-gallery-viewport');
  const track = document.getElementById('curved-gallery-track');
  const prevBtn = document.getElementById('gallery-prev-btn');
  const nextBtn = document.getElementById('gallery-next-btn');
  if (!viewport || !track) return;

  // 1. Render items from window.GALLERY_DATA (or fallback to projectsData in data.js)
  const items = (window.GALLERY_DATA && window.GALLERY_DATA.length) 
    ? window.GALLERY_DATA 
    : ((typeof projectsData !== 'undefined' && projectsData) ? projectsData : []);

  if (!items.length) return;

  // Helper to create card HTML
  function createCardHtml(item) {
    const title = item.title || 'Project Showcase';
    const tag = item.tag || 'Web Platform';
    const imgSrc = item.image || item.screenshot || '';
    const url = item.url || '#';
    return `
      <div class="curved-card" data-title="${title.replace(/"/g, '&quot;')}" data-url="${url}">
        <img src="${imgSrc}" alt="${title.replace(/"/g, '&quot;')}" loading="eager">
        <div class="curved-card-overlay">
          <span class="curved-card-tag">${tag}</span>
          <span class="curved-card-title">${title}</span>
        </div>
      </div>
    `;
  }

  // Populate first set
  let html = items.map(item => createCardHtml(item)).join('');
  track.innerHTML = html;

  // Duplicate set to guarantee seamless infinite wrap
  const initialCards = Array.from(track.querySelectorAll('.curved-card'));
  initialCards.forEach(card => {
    const clone = card.cloneNode(true);
    clone.setAttribute('data-cloned', 'true');
    track.appendChild(clone);
  });

  const allCards = Array.from(track.querySelectorAll('.curved-card'));
  let halfWidth = 0;

  // Measure card metrics and natural aspect ratio
  function refreshCardMetrics() {
    allCards.forEach(card => {
      const img = card.querySelector('img');
      if (img && img.naturalWidth && img.naturalHeight) {
        card.style.aspectRatio = `${img.naturalWidth} / ${img.naturalHeight}`;
      }
    });

    // Recompute total width of original items (first half of track)
    let totalInitialWidth = 0;
    initialCards.forEach(c => {
      totalInitialWidth += c.offsetWidth + 24; // width + gap
    });
    halfWidth = totalInitialWidth || (track.scrollWidth / 2);
  }

  // Attach load listeners for images that haven't finished loading yet
  allCards.forEach(card => {
    const img = card.querySelector('img');
    if (!img) return;
    if (img.complete && img.naturalWidth > 0) {
      card.style.aspectRatio = `${img.naturalWidth} / ${img.naturalHeight}`;
    } else {
      img.addEventListener('load', () => {
        if (img.naturalWidth && img.naturalHeight) {
          card.style.aspectRatio = `${img.naturalWidth} / ${img.naturalHeight}`;
        }
        refreshCardMetrics();
      });
    }
  });

  refreshCardMetrics();

  // State variables for buttery smooth 60fps auto-scroll
  let currentX = 0;
  let baseSpeed = 0.9;
  let currentSpeed = 0.9;
  let isHovered = false;
  let isDragging = false;
  let startX = 0;
  let dragStartX = 0;
  let hasDragged = false;
  let resumeTimer = null;

  // Update 3D cylindrical transform on EVERY card based on viewport center
  function update3DTransforms() {
    const vpRect = viewport.getBoundingClientRect();
    const vpCenter = vpRect.left + vpRect.width / 2;
    const arcRadius = vpRect.width * 0.42;

    allCards.forEach(card => {
      const rect = card.getBoundingClientRect();
      const cardCenter = rect.left + rect.width / 2;
      const distFromCenter = cardCenter - vpCenter;

      // Normalized distance: -1 at left edge, 0 at center, 1 at right edge
      const normDist = Math.max(-2.5, Math.min(2.5, distFromCenter / arcRadius));

      // 3D cylindrical arc effect:
      // - rotateY creates inward curvature on both sides
      // - scale slightly shrinks items toward edges
      // - translateZ pushes items back into screen depth
      const rotateY = -normDist * 28;
      const scale = 1 - Math.min(Math.abs(normDist) * 0.08, 0.22);
      const translateZ = -Math.abs(normDist) * 65;

      card.style.transform = `perspective(1200px) rotateY(${rotateY.toFixed(2)}deg) translateZ(${translateZ.toFixed(2)}px) scale(${scale.toFixed(3)})`;
    });
  }

  // Animation Loop with delta time and smooth speed damping
  let lastTime = performance.now();

  function animate(now) {
    const dt = Math.min((now - lastTime) / 16.666, 2.5); // normalized ~60fps
    lastTime = now;

    if (!isDragging) {
      // Smoothly decelerate on hover, smoothly accelerate on mouse leave
      const desiredSpeed = isHovered ? 0 : baseSpeed;
      currentSpeed += (desiredSpeed - currentSpeed) * (0.08 * dt);

      currentX -= currentSpeed * dt;

      // Infinite wrap-around
      if (halfWidth > 0) {
        if (currentX <= -halfWidth) {
          currentX += halfWidth;
        } else if (currentX > 0) {
          currentX -= halfWidth;
        }
      }
    }

    // Apply GPU transform to track
    track.style.transform = `translate3d(${currentX.toFixed(2)}px, 0, 0)`;

    // Update 3D card perspective for all visible cards
    update3DTransforms();

    requestAnimationFrame(animate);
  }

  requestAnimationFrame(animate);

  // Hover detection: smoothly pauses scroll
  viewport.addEventListener('mouseenter', () => {
    isHovered = true;
  });

  viewport.addEventListener('mouseleave', () => {
    isHovered = false;
  });

  // Mouse wheel horizontal scroll
  viewport.addEventListener('wheel', (e) => {
    const delta = Math.abs(e.deltaY) > Math.abs(e.deltaX) ? e.deltaY : e.deltaX;
    currentX -= delta * 0.8;
    if (halfWidth > 0) {
      if (currentX <= -halfWidth) currentX += halfWidth;
      if (currentX > 0) currentX -= halfWidth;
    }
  }, { passive: true });

  // Mouse Drag Support
  viewport.addEventListener('mousedown', (e) => {
    isDragging = true;
    hasDragged = false;
    startX = e.pageX;
    dragStartX = currentX;
    clearTimeout(resumeTimer);
  });

  window.addEventListener('mouseup', () => {
    if (isDragging) {
      isDragging = false;
      clearTimeout(resumeTimer);
      resumeTimer = setTimeout(() => {
        hasDragged = false;
      }, 100);
    }
  });

  window.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    const delta = e.pageX - startX;
    if (Math.abs(delta) > 5) {
      hasDragged = true;
    }
    currentX = dragStartX + delta * 1.2;
    if (halfWidth > 0) {
      if (currentX <= -halfWidth) currentX += halfWidth;
      if (currentX > 0) currentX -= halfWidth;
    }
  });

  // Touch Support (mobile & tablet)
  let touchStartX = 0;
  let touchDragStartX = 0;

  viewport.addEventListener('touchstart', (e) => {
    if (!e.touches.length) return;
    isDragging = true;
    hasDragged = false;
    touchStartX = e.touches[0].pageX;
    touchDragStartX = currentX;
  }, { passive: true });

  viewport.addEventListener('touchmove', (e) => {
    if (!isDragging || !e.touches.length) return;
    const delta = e.touches[0].pageX - touchStartX;
    if (Math.abs(delta) > 5) {
      hasDragged = true;
    }
    currentX = touchDragStartX + delta * 1.2;
    if (halfWidth > 0) {
      if (currentX <= -halfWidth) currentX += halfWidth;
      if (currentX > 0) currentX -= halfWidth;
    }
  }, { passive: true });

  viewport.addEventListener('touchend', () => {
    isDragging = false;
    setTimeout(() => { hasDragged = false; }, 100);
  }, { passive: true });

  // Navigation Arrow Buttons
  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      currentX += 340;
      if (halfWidth > 0 && currentX > 0) currentX -= halfWidth;
    });
  }
  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      currentX -= 340;
      if (halfWidth > 0 && currentX <= -halfWidth) currentX += halfWidth;
    });
  }

  // Click on any card (original or clone) opens Lightbox
  track.addEventListener('click', (e) => {
    if (hasDragged) return;
    const card = e.target.closest('.curved-card');
    if (!card) return;
    const img = card.querySelector('img');
    if (!img) return;
    const title = card.getAttribute('data-title') || img.getAttribute('alt') || '';
    const url = card.getAttribute('data-url') || '';
    openLightbox({
      image: img.getAttribute('src'),
      title: title,
      url: url
    });
  });

  // Window resize
  window.addEventListener('resize', () => {
    refreshCardMetrics();
  }, { passive: true });

  // Initial recalculation after layout settles
  setTimeout(() => {
    refreshCardMetrics();
  }, 100);
  setTimeout(() => {
    refreshCardMetrics();
  }, 400);
}

/* ==========================================================================
   5b. Clean Image Gallery Initialization
   ========================================================================== */
function initImageGallery() {
  const container = document.getElementById('image-gallery');
  if (!container) return;

  const cards = container.querySelectorAll('.gallery-card, img');
  cards.forEach(card => {
    card.addEventListener('click', (e) => {
      e.stopPropagation();
      const img = card.tagName === 'IMG' ? card : card.querySelector('img');
      if (!img) return;
      const title = card.getAttribute('data-title') || img.getAttribute('alt') || '';
      const url = card.getAttribute('data-url') || '';
      openLightbox({
        image: img.getAttribute('src'),
        title: title,
        url: url
      });
    });
  });
}

function renderHomeStats() {
  const container = document.getElementById('home-stats-grid');
  const stats = window.BYTEWEEV_DATA?.about?.stats;
  if (!container || !stats) return;

  container.innerHTML = stats.map(stat => `
    <div class="byte-card p-6">
      <div class="font-display font-bold text-3xl sm:text-4xl text-white mb-1">${stat.value}</div>
      <div class="mono text-xs font-semibold uppercase text-[#71717a] mb-2">${stat.label}</div>
      <p class="text-xs text-[#a1a1aa] leading-relaxed">${stat.desc}</p>
    </div>
  `).join('');
}

/* ==========================================================================
   6. Showcase Page Render Logic with Site Screenshots & Lightbox Triggers
   ========================================================================== */
function renderShowcasePage() {
  const container = document.getElementById('showcase-list-grid');
  const filterButtons = document.querySelectorAll('.filter-btn');
  const data = window.BYTEWEEV_DATA;
  if (!container || !data?.showcase) return;

  function renderList(filteredCategory = 'all') {
    const list = filteredCategory === 'all'
      ? data.showcase
      : data.showcase.filter(item => item.categorySlug === filteredCategory);

    container.innerHTML = list.map((item, idx) => `
      <div id="${item.id}" class="byte-card overflow-hidden flex flex-col justify-between group">
        <!-- Site Screenshot Mockup Viewport with Click-to-Expand -->
        <div class="browser-header">
          <div class="browser-dots">
            <span class="browser-dot" style="background-color: #ef4444;"></span>
            <span class="browser-dot" style="background-color: #eab308;"></span>
            <span class="browser-dot" style="background-color: #10b981;"></span>
          </div>
          <div class="browser-url-bar">${item.url && item.url !== '#' ? item.url : item.title}</div>
          <span class="mono text-xs font-semibold px-2 py-0.5 rounded bg-[#141418] text-zinc-300 border border-white/10">
            ${item.year}
          </span>
        </div>

        <div class="w-full h-56 sm:h-64 bg-[#09090b] border-b border-[#222227] overflow-hidden relative cursor-pointer" onclick="openShowcaseLightbox('${item.id}')">
          <img src="${item.image}" alt="${item.title}" class="w-full h-full object-cover object-top transition-transform duration-300 group-hover:scale-105" loading="lazy">
          
          <div class="absolute top-3 right-3 flex items-center gap-2">
            <span class="mono text-xs font-semibold text-emerald-400 bg-black/85 border border-emerald-500/30 px-2.5 py-1 rounded backdrop-blur-sm">
              ${item.metric}
            </span>
          </div>

          <!-- Click to inspect badge -->
          <div class="absolute bottom-3 right-3 mono text-[10px] font-bold text-white bg-black/80 border border-[#333] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
            Click to Expand ⛶
          </div>
        </div>

        <div class="p-8 flex-1 flex flex-col justify-between">
          <div>
            <div class="flex flex-wrap items-center justify-between pb-3 mb-3 border-b border-[#222227] gap-2">
              <span class="mono text-xs font-bold uppercase text-[#71717a]">${item.category}</span>
              <span class="text-xs mono font-medium text-[#71717a]">
                STUDIO / CLIENT: ${item.client}
              </span>
            </div>
            
            <h2 class="font-display font-bold text-2xl sm:text-3xl text-white mb-3">
              ${item.title}
            </h2>
            <p class="text-sm text-[#a1a1aa] leading-relaxed mb-4">
              ${item.fullDesc}
            </p>
          </div>

          <div>
            <div class="flex flex-wrap gap-2 pt-4 mb-6 border-t border-[#222227]">
              ${item.tech.map(t => `<span class="mono text-[11px] font-medium px-2.5 py-1 rounded bg-[#141418] text-white border border-[#222227]">${t}</span>`).join('')}
            </div>
            <div class="flex flex-col sm:flex-row items-center gap-3">
              ${item.url && item.url !== '#' ? `
                <a href="${item.url}" target="_blank" rel="noopener" class="btn-primary w-full sm:w-auto text-xs text-center flex-1">
                  <span>Visit Live Site ↗</span>
                </a>
              ` : ''}
              <button class="btn-secondary w-full sm:w-auto text-xs text-center flex-1" onclick="openShowcaseLightbox('${item.id}')">
                <span>Inspect Screenshot ⛶</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    `).join('');
  }

  // Helper window function for inline onclick
  window.openShowcaseLightbox = function(id) {
    const item = data.showcase.find(p => p.id === id);
    if (item) openLightbox(item);
  };

  // Initial render
  renderList('all');

  // Filter click handlers
  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      filterButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const category = btn.getAttribute('data-filter') || 'all';
      renderList(category);
    });
  });
}

/* ==========================================================================
   7. About Page Render Logic
   ========================================================================= */
function renderAboutPage() {
  const principlesContainer = document.getElementById('about-principles-grid');
  const techRadarContainer = document.getElementById('about-tech-radar');
  const statsContainer = document.getElementById('about-stats-grid');
  const data = window.BYTEWEEV_DATA?.about;
  if (!data) return;

  // Render Stats
  if (statsContainer && data.stats) {
    statsContainer.innerHTML = data.stats.map(stat => `
      <div class="byte-card p-6">
        <div class="font-display font-bold text-3xl sm:text-4xl text-white mb-1">${stat.value}</div>
        <div class="mono text-xs font-semibold uppercase text-[#71717a] mb-2">${stat.label}</div>
        <p class="text-xs text-[#a1a1aa] leading-relaxed">${stat.desc}</p>
      </div>
    `).join('');
  }

  // Render Principles
  if (principlesContainer && data.principles) {
    principlesContainer.innerHTML = data.principles.map(p => `
      <div class="byte-card p-8">
        <div class="mono text-xs font-bold text-[#71717a] mb-3">${p.num} // PRINCIPLE</div>
        <h3 class="font-display font-bold text-xl sm:text-2xl text-white mb-3">${p.title}</h3>
        <p class="text-sm text-[#a1a1aa] leading-relaxed">${p.desc}</p>
      </div>
    `).join('');
  }

  // Render Tech Radar
  if (techRadarContainer && data.techRadar) {
    techRadarContainer.innerHTML = data.techRadar.map(group => `
      <div class="byte-card p-6">
        <div class="mono text-xs font-bold uppercase text-[#71717a] pb-3 mb-4 border-b border-[#222227]">
          ${group.category}
        </div>
        <div class="flex flex-wrap gap-2">
          ${group.items.map(item => `
            <span class="mono text-xs font-medium px-2.5 py-1 rounded bg-[#141418] text-white border border-[#222227]">
              ${item}
            </span>
          `).join('')}
        </div>
      </div>
    `).join('');
  }
}

/* ==========================================================================
   8. Contact Page Render Logic
   ========================================================================== */
function renderContactPage() {
  const urlParams = new URLSearchParams(window.location.search);
  const referencedProject = urlParams.get('project');
  const messageField = document.getElementById('contact-brief');

  if (referencedProject && messageField) {
    messageField.value = `Hi ByteWeev team, I saw the "${referencedProject}" project and would like to build something similar for our business.\n\nKey requirements: `;
  }
}

/* ==========================================================================
   9. FAQ Accordion Logic
   ========================================================================== */
function initFaqAccordion() {
  const faqContainer = document.getElementById('faq-accordion-container');
  const data = window.BYTEWEEV_DATA?.faqs;
  if (!faqContainer || !data) return;

  faqContainer.innerHTML = data.map((faq) => `
    <div class="faq-item">
      <button type="button" class="faq-header" aria-expanded="false">
        <span>${faq.q}</span>
        <span class="faq-icon">+</span>
      </button>
      <div class="faq-body">
        <p>${faq.a}</p>
      </div>
    </div>
  `).join('');

  const items = faqContainer.querySelectorAll('.faq-item');
  items.forEach(item => {
    const header = item.querySelector('.faq-header');
    header.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');
      items.forEach(other => {
        other.classList.remove('open');
        other.querySelector('.faq-header').setAttribute('aria-expanded', 'false');
      });
      if (!isOpen) {
        item.classList.add('open');
        header.setAttribute('aria-expanded', 'true');
      }
    });
  });
}

/* ==========================================================================
   10. Contact Form Submission Handling
   ========================================================================== */
function initContactForm() {
  const form = document.getElementById('contact-inquiry-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('contact-name')?.value.trim();
    const email = document.getElementById('contact-email')?.value.trim();
    const brief = document.getElementById('contact-brief')?.value.trim();
    const feedback = document.getElementById('contact-form-feedback');
    const submitBtn = form.querySelector('button[type="submit"]');

    if (!name || !email || !brief) {
      if (feedback) {
        feedback.textContent = 'Please provide your name, email, and project details.';
        feedback.className = 'mono text-xs text-rose-500 font-bold mt-4';
      }
      return;
    }

    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.innerHTML = `<span>TRANSMITTING...</span>`;
    }

    if (feedback) {
      feedback.textContent = 'Encrypting & sending inquiry to ByteWeev engineers...';
      feedback.className = 'mono text-xs text-[#71717a] mt-4';
    }

    setTimeout(() => {
      form.reset();
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.innerHTML = `<span>INQUIRY TRANSMITTED</span> <span>✓</span>`;
      }
      if (feedback) {
        feedback.textContent = 'Inquiry received. A senior engineer will review your brief and reply within 24 hours.';
        feedback.className = 'mono text-xs text-emerald-400 font-bold mt-4';
      }
    }, 800);
  });
}
