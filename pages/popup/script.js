`use strict`;
//Select
const selected = document.querySelector('.selected');
const optionsContainer = document.querySelector('.options-container');
const optionsList = document.querySelectorAll('.option');
const selectMarginTop = document.querySelector('.select-margin_top');
const selectMarginBottom = document.querySelector('.select-margin_bottom');

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
