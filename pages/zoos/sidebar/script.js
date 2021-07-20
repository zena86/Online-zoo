`use strict`;
//Sidebar
const sidebarBody = document.querySelector('.sidebar__body');
const sidebarArrows = document.querySelector('.sidebar__arrows');
const sidebarDown = document.querySelector('.sidebar__down');
const sidebarOthers = document.querySelectorAll('.sidebar__item_others');

sidebarArrows.addEventListener('click', () => {
   sidebarBody.classList.toggle('sidebar-active');
});
sidebarDown.addEventListener('click', () => {
   sidebarDown.classList.toggle('others-active');
   sidebarOthers.forEach(el => {
      el.classList.toggle('others-active');
   });
});
