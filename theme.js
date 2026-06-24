// theme.js - 테마 관리 및 토글 버튼 주입 스크립트
(function() {
  const savedTheme = localStorage.getItem('theme');
  const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const currentTheme = savedTheme || (systemDark ? 'dark' : 'light');
  document.documentElement.setAttribute('data-theme', currentTheme);
})();

document.addEventListener('DOMContentLoaded', () => {
  const container = document.querySelector('.header-nav .container');
  if (!container) return;

  // 이미 버튼이 존재하는지 확인 (중복 삽입 방지)
  if (document.getElementById('theme-toggle')) return;

  const toggleBtn = document.createElement('button');
  toggleBtn.id = 'theme-toggle';
  toggleBtn.className = 'theme-toggle-btn';
  toggleBtn.setAttribute('aria-label', '테마 변경');
  toggleBtn.setAttribute('title', '테마 변경');

  toggleBtn.innerHTML = `
    <!-- Sun Icon (visible in dark theme) -->
    <svg class="sun-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="12" cy="12" r="5"></circle>
      <line x1="12" y1="1" x2="12" y2="3"></line>
      <line x1="12" y1="21" x2="12" y2="23"></line>
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
      <line x1="1" y1="12" x2="3" y2="12"></line>
      <line x1="21" y1="12" x2="23" y2="12"></line>
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
    </svg>
    <!-- Moon Icon (visible in light theme) -->
    <svg class="moon-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
    </svg>
  `;

  // Insert before hamburger if it exists, otherwise before navLinks
  const hamburger = container.querySelector('.hamburger');
  const navLinks = container.querySelector('.nav-links');
  
  if (hamburger) {
    container.insertBefore(toggleBtn, hamburger);
  } else if (navLinks) {
    container.insertBefore(toggleBtn, navLinks);
  } else {
    container.appendChild(toggleBtn);
  }

  // Handle click event
  toggleBtn.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
  });
});
