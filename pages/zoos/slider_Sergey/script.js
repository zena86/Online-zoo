`use strict`;

//Video-Slider 
/* этот код помечает картинки, для удобства разработки */
let i = 1;
for(let li of document.querySelectorAll('video-carousel__item')) {
   li.style.position = 'relative';
   li.insertAdjacentHTML('beforeend', `<span style="position:absolute;left:0;top:0;z-index:50">${i}</span>`);
   i++;
}
/* конфигурация */
let width = 320; // ширина картинки
let count = 3; // видимое количество изображений
let position = 0; // положение ленты прокрутки

let list = document.querySelector('.video-carousel__items');
let listElems = document.querySelectorAll('.video-carousel__item');
let prev = document.querySelector('.video-carousel__prev');
let next = document.querySelector('.video-carousel__next');


prev.addEventListener('click', () => {
   //position += width * count;
   position += (width + 40)*count;
   position = Math.min(position, 0)
   list.style.marginLeft = position + 'px';
});

next.addEventListener('click', () => {
   position -= (width + 40)*count;
   position = Math.max(position, -(width + 40) * (listElems.length - count));
   list.style.marginLeft = position + 'px';
});
