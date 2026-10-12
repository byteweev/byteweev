/**
 * ============================================================================
 * BYTEWEEV STUDIO — ORIGINAL SHARED COMPONENTS (NAVBAR & FOOTER)
 * ============================================================================
 */

(function() {
  function renderNavbar(activePageId) {
    const headerContainer = document.getElementById('site-header');
    if (!headerContainer) return;

    const data = window.BYTEWEEV_DATA || {};
    const company = data.company || { name: 'ByteWeev' };
    const navLinks = data.navigation || [
      { id: 'home', label: 'Home', href: 'index.html' },
      { id: 'showcase', label: 'Showcase', href: 'showcase.html' },
      { id: 'about', label: 'About', href: 'about.html' },
      { id: 'contact', label: 'Contact', href: 'contact.html' }
    ];

    const navItemsHtml = navLinks.map(link => {
      const isActive = link.id === activePageId;
      const activeClass = isActive 
        ? 'text-white font-semibold bg-white/10 px-4 py-1.5 rounded-full shadow-inner' 
        : 'text-zinc-400 hover:text-white px-4 py-1.5 rounded-full transition-colors';
      return `<a href="${link.href}" class="${activeClass} text-sm">${link.label}</a>`;
    }).join('');

    const mobileNavItemsHtml = navLinks.map(link => {
      const isActive = link.id === activePageId;
      const activeClass = isActive 
        ? 'text-white font-bold bg-zinc-800' 
        : 'text-zinc-400 hover:text-white';
      return `<a href="${link.href}" class="block px-4 py-2.5 rounded-xl text-sm ${activeClass}">${link.label}</a>`;
    }).join('');

    headerContainer.className = 'fixed top-5 left-0 w-full z-50 pointer-events-none flex justify-center px-6';
    headerContainer.innerHTML = `
      <div class="pointer-events-auto glass-pill-nav rounded-full px-5 py-2.5 flex items-center justify-between gap-6 max-w-4xl w-full">
        
        <!-- ByteWeev Logo Badge -->
        <a href="index.html" class="flex items-center gap-3 group">
          <div class="w-9 h-9 rounded-xl bg-black border border-zinc-700/80 flex items-center justify-center p-1.5 shadow-md group-hover:border-cyan-400 transition-colors">
            <img src="assets/logo.png" alt="${company.name}" class="w-full h-full object-contain filter contrast-125">
          </div>
          <div class="flex flex-col">
            <span class="text-base font-extrabold tracking-tight text-white flex items-center gap-1.5">
              ${company.name}
              <span class="inline-block w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
            </span>
          </div>
        </a>

        <!-- Desktop Navigation Links -->
        <nav class="hidden md:flex items-center gap-1">
          ${navItemsHtml}
        </nav>

        <!-- Right Side: Theme Toggle + CTA -->
        <div class="flex items-center gap-3">
          <button id="theme-toggle" aria-label="Toggle theme" class="w-9 h-9 rounded-full border border-zinc-700/60 flex items-center justify-center text-zinc-400 hover:text-white hover:border-zinc-500 transition-colors bg-zinc-900/40">
            <span id="theme-icon"></span>
          </button>

          <a href="contact.html" class="hidden sm:inline-flex items-center gap-2 pl-4 pr-1.5 py-1.5 rounded-full btn-primary-pill text-xs uppercase tracking-wider shadow-sm group">
            <span>Start a Project</span>
            <span class="w-6 h-6 rounded-full bg-cyan-500 text-black flex items-center justify-center group-hover:translate-x-0.5 transition-transform">
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </span>
          </a>

          <!-- Mobile Menu Trigger -->
          <button id="mobile-menu-toggle" aria-label="Menu" class="md:hidden w-9 h-9 rounded-full border border-zinc-700 flex items-center justify-center text-zinc-300">
            <i data-lucide="menu" class="w-4 h-4"></i>
          </button>
        </div>

      </div>

      <!-- Mobile Dropdown -->
      <div id="mobile-menu" class="hidden md:hidden pointer-events-auto fixed top-20 left-6 right-6 p-4 rounded-2xl bg-zinc-950/95 border border-zinc-800 shadow-2xl space-y-2">
        ${mobileNavItemsHtml}
        <div class="pt-3 border-t border-zinc-800">
          <a href="contact.html" class="block w-full text-center py-3 rounded-full btn-primary-pill font-bold text-xs uppercase tracking-wider">
            Start a Project
          </a>
        </div>
      </div>
    `;
  }

  function renderFooter() {
    const footerContainer = document.getElementById('site-footer');
    if (!footerContainer) return;

    const data = window.BYTEWEEV_DATA || {};
    const company = data.company || { name: 'ByteWeev' };

    footerContainer.className = 'border-t border-zinc-800/80 py-16 mt-28 bg-[#040406] text-white';
    footerContainer.innerHTML = `
      <div class="max-w-6xl mx-auto px-6">
        <div class="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 pb-12 border-b border-zinc-900">
          
          <div class="flex items-center gap-3.5">
            <div class="w-10 h-10 rounded-xl bg-black border border-zinc-800 flex items-center justify-center p-2 shadow-sm">
              <img src="assets/logo.png" alt="${company.name}" class="w-full h-full object-contain filter contrast-125">
            </div>
            <div>
              <span class="text-lg font-bold tracking-tight text-white">${company.name}</span>
              <span class="text-xs text-zinc-500 block mono">${company.tagline}</span>
            </div>
          </div>

          <!-- Navigation Links in Footer -->
          <div class="flex flex-wrap items-center gap-6 text-sm text-zinc-400">
            <a href="index.html" class="hover:text-white transition-colors">Home</a>
            <a href="showcase.html" class="hover:text-white transition-colors">Showcase</a>
            <a href="about.html" class="hover:text-white transition-colors">About</a>
            <a href="contact.html" class="hover:text-white transition-colors">Contact</a>
            <a href="mailto:${company.email}" class="text-cyan-400 hover:underline transition-colors mono text-xs">${company.email}</a>
          </div>

          <!-- Social Links -->
          <div class="flex items-center gap-3">
            <a href="https://github.com/byteweev" target="_blank" rel="noopener" class="w-9 h-9 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-400 hover:text-white hover:border-cyan-400 transition-colors">
              <i data-lucide="github" class="w-4 h-4"></i>
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener" class="w-9 h-9 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-400 hover:text-white hover:border-cyan-400 transition-colors">
              <i data-lucide="linkedin" class="w-4 h-4"></i>
            </a>
            <a href="https://x.com" target="_blank" rel="noopener" class="w-9 h-9 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-400 hover:text-white hover:border-cyan-400 transition-colors">
              <i data-lucide="twitter" class="w-4 h-4"></i>
            </a>
          </div>

        </div>

        <div class="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 text-xs text-zinc-500">
          <p>&copy; 2026 ${company.legalName || company.name}. All rights reserved.</p>
          <div class="flex items-center gap-6">
            <a href="#" class="hover:text-zinc-300 transition-colors">Privacy Policy</a>
            <a href="#" class="hover:text-zinc-300 transition-colors">Terms of Service</a>
            <span class="flex items-center gap-1 text-emerald-400 mono">
              <span class="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              All Systems Operational
            </span>
          </div>
        </div>
      </div>
    `;
  }

  window.ByteWeevUI = {
    renderNavbar,
    renderFooter
  };
})();
