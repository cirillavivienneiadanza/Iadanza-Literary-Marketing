// script.js for Iadanza Literary Marketing
// Basic interactivity: smooth scroll, image fallback, footer year

document.addEventListener('DOMContentLoaded', function () {
  // set explicit footer year to 2025 as requested
  try {
    const footerYear = document.querySelector('.footer .container p');
    if (footerYear) footerYear.textContent = '© 2025 Iadanza Literary Marketing';
  } catch (e) {
    // fail silently
  }

  // smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (!href || href === '#') return;
      const targetId = href.slice(1);
      const target = document.getElementById(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // image fallback for your placeholder image
  const heroImg = document.querySelector('.hero-image img');
  if (heroImg) {
    heroImg.addEventListener('error', function () {
      // simple SVG data URI placeholder (white silhouette on black background)
      const svg = `data:image/svg+xml;utf8,` +
        encodeURIComponent(`
          <svg xmlns='http://www.w3.org/2000/svg' width='600' height='600' viewBox='0 0 600 600'>
            <rect width='100%' height='100%' fill='%23000' />
            <g fill='%23fff' font-family='Arial, Helvetica, sans-serif'>
              <text x='50%' y='48%' dominant-baseline='middle' text-anchor='middle' font-size='28'>Your Photo</text>
              <text x='50%' y='58%' dominant-baseline='middle' text-anchor='middle' font-size='18'>Add /images/cirilla.jpg</text>
            </g>
          </svg>
        `);
      heroImg.src = svg;
      heroImg.alt = 'Placeholder - upload /images/cirilla.jpg';
    });

    // trigger load error if image not found (some servers suppress errors)
    if (!heroImg.complete || heroImg.naturalWidth === 0) {
      heroImg.dispatchEvent(new Event('error'));
    }
  }

  // small accessibility enhancement: add focus outlines for keyboard users only
  function handleFirstTab(e) {
    if (e.key === 'Tab') {
      document.body.classList.add('user-is-tabbing');
      window.removeEventListener('keydown', handleFirstTab);
    }
  }
  window.addEventListener('keydown', handleFirstTab);

});
