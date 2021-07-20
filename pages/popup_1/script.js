`use strict`;
//Select
const selectBoxes = document.querySelectorAll('.select-box');

selectBoxes.forEach( el => {
   const selected = el.querySelector('.selected');
   const optionsContainer = el.querySelector('.options-container');
   const optionsList = el.querySelectorAll('.option');
   const selectMarginTop = el.querySelector('.select-margin_top');
   const selectMarginBottom = el.querySelector('.select-margin_bottom');
   
   selected.addEventListener('click', () => {
      optionsContainer.classList.toggle('select-active');
      selectMarginTop.classList.toggle('margin-active');
      selectMarginBottom.classList.toggle('margin-active');
   });

   optionsList.forEach(el => {
      el.addEventListener('click', () => {
         selected.innerHTML = el.querySelector('label').innerHTML;
         optionsContainer.classList.remove('select-active');
         selectMarginTop.classList.remove('margin-active');
         selectMarginBottom.classList.remove('margin-active');
      });
   });
});


