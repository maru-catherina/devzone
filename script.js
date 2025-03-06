const menuToggle = document.querySelector('.menu-toggle');
const menuList = document.querySelector('.menu-list');

menuToggle.addEventListener('click', () => {
  menuToggle.classList.toggle('open');
  menuList.classList.toggle('open');
});

document.addEventListener('click', (e) => {
  if (!menuList.contains(e.target) && !menuToggle.contains(e.target)) {
    menuList.classList.remove('open');
    menuToggle.classList.remove('open');
  }
});