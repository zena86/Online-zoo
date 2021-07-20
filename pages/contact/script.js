`use strict`;
//Burger
document.addEventListener('DOMContentLoaded', function(event) {
   let burger = document.querySelector('.burger');
   let headerRight = document.querySelector('.header__right');
   let body = document.querySelector('body');
   burger.onclick = function(){
      burger.classList.toggle('active');
      headerRight.classList.toggle('active');
      body.classList.toggle('lock');
   };
});