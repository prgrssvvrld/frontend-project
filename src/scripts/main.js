document.addEventListener('DOMContentLoaded', function () {
  const themeToggle = document.createElement('button');
  themeToggle.id = 'theme-toggle';
  themeToggle.innerHTML = '🌙';
  themeToggle.setAttribute('aria-label', 'Toggle dark mode');
  themeToggle.style.cssText = `
    position: fixed;
    top: 100px;
    right: 20px;
    z-index: 1000;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background: #181818;
    color: #FFFFFF;
    border: 2px solid #FFCC4A;
    cursor: pointer;
    font-size: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    transition: all 0.3s ease;
  `;

  themeToggle.addEventListener('mouseenter', function () {
    this.style.transform = 'scale(1.1)';
  });

  themeToggle.addEventListener('mouseleave', function () {
    this.style.transform = 'scale(1)';
  });

  document.body.appendChild(themeToggle);

  const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
  const savedTheme = localStorage.getItem('theme');

  let isDark = savedTheme === 'dark' || (!savedTheme && prefersDarkScheme.matches);

  function applyTheme() {
    const lightTheme = document.getElementById('theme-light');
    const darkTheme = document.getElementById('theme-dark');

    if (isDark) {
      lightTheme.disabled = true;
      darkTheme.disabled = false;
      themeToggle.innerHTML = '☀️';
      themeToggle.style.background = '#FFFFFF';
      themeToggle.style.color = '#181818';
      document.documentElement.setAttribute('data-theme', 'dark');
    } else {
      lightTheme.disabled = false;
      darkTheme.disabled = true;
      themeToggle.innerHTML = '🌙';
      themeToggle.style.background = '#181818';
      themeToggle.style.color = '#181818';
      document.documentElement.removeAttribute('data-theme');
    }
  }

  applyTheme();

  themeToggle.addEventListener('click', function () {
    isDark = !isDark;
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    applyTheme();
  });

  const headerNavbar = document.querySelector('.header__navbar');
  const mobileMenuButton = document.createElement('button');
  mobileMenuButton.id = 'mobile-menu-button';
  mobileMenuButton.innerHTML = '☰';
  mobileMenuButton.setAttribute('aria-label', 'Toggle menu');
  mobileMenuButton.style.cssText = `
    display: none;
    background: none;
    border: none;
    font-size: 24px;
    color: #FFFFFF;
    cursor: pointer;
    padding: 10px;
    z-index: 1001;
  `;

  document.querySelector('.header').appendChild(mobileMenuButton);

  mobileMenuButton.addEventListener('click', function () {
    headerNavbar.classList.toggle('mobile-menu-open');
    document.body.classList.toggle('menu-open');
  });

  document.addEventListener('click', function (event) {
    if (
      window.innerWidth <= 768 &&
      !event.target.closest('.header__navbar') &&
      !event.target.closest('#mobile-menu-button') &&
      headerNavbar.classList.contains('mobile-menu-open')
    ) {
      headerNavbar.classList.remove('mobile-menu-open');
      document.body.classList.remove('menu-open');
    }
  });

  document.querySelectorAll('.header__navbar a').forEach((link) => {
    link.addEventListener('click', function () {
      if (window.innerWidth <= 768) {
        headerNavbar.classList.remove('mobile-menu-open');
        document.body.classList.remove('menu-open');
      }
    });
  });

  function checkResponsive() {
    if (window.innerWidth <= 768) {
      mobileMenuButton.style.display = 'block';
      if (!headerNavbar.classList.contains('mobile-menu-open')) {
        headerNavbar.style.display = 'none';
      }
    } else {
      mobileMenuButton.style.display = 'none';
      headerNavbar.style.display = 'flex';
      headerNavbar.classList.remove('mobile-menu-open');
      document.body.classList.remove('menu-open');
    }
  }

  checkResponsive();
  window.addEventListener('resize', checkResponsive);
});
