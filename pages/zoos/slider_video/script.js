`use strict`;

//Video-Slider 
/* конфигурация */
let itemNumber = 1; // листаемое количество изображений
let itemIndex = 0; // положение ленты прокрутки

let gallery = document.querySelector('.video-carousel__gallery');
let itemsBox = document.querySelector('.video-carousel__items');
let listItems = document.querySelectorAll('.video-carousel__item');
let prev = document.querySelector('.video-carousel__prev');
let next = document.querySelector('.video-carousel__next');

function getConfig() {
   let widthGallery = gallery.getBoundingClientRect().width; //ширина видимой части слайдера
   let widthItemWithMargin = listItems[0].getBoundingClientRect().width;//ширина слайда + марджин
   let count = Math.ceil(widthGallery / widthItemWithMargin);//количество видимых слайдов 
   let widthMargin = widthItemWithMargin * count - widthGallery;//расстояние между слайдами
   //let widthItem = widthItemWithMargin - widthMargin;//ширина слайда (картинки)
   return {count: count, widthItemWithMargin: widthItemWithMargin};
}
function show() {
   let config = getConfig();
   let position = itemIndex * config.widthItemWithMargin;
   itemsBox.style.marginLeft = -position + 'px';
}
function colorArrow() {
   let config = getConfig();
   if(itemIndex === 0) {
      prev.classList.add('inactive');
   }else if(itemIndex === listItems.length - config.count) {
      next.classList.add('inactive');
   }else if (itemIndex !== 0 && itemIndex !== listItems.length - config.count) {
      prev.classList.remove('inactive');
      next.classList.remove('inactive');
   }
}
function smartIncrement() {
   let config = getConfig();
   if(itemIndex !== listItems.length - config.count) {
      itemIndex = itemIndex + itemNumber;
   }
   //Бесконечный слайдер
   //itemIndex = (itemIndex + itemNumber) % (listItems.length - (config.count - 1));
}
function smartDecrement() {
   if(itemIndex !== 0) {
      itemIndex = itemIndex - itemNumber;
   }
}

colorArrow();
window.addEventListener('resize', show);

prev.addEventListener('click', () => {
   smartDecrement();
   show();
   colorArrow();
});

next.addEventListener('click', () => {
   smartIncrement();
   show();
   colorArrow();
});
prev.addEventListener('touchstart', () => {
   smartDecrement();
   show();
   colorArrow();
});

next.addEventListener('touchstart', () => {
   smartIncrement();
   show();
   colorArrow();
});

const swipeDetect = (surface) => {
   let startX = 0;
   let startY = 0;
   let distX = 0;
   let distY = 0;

   let startTime = 0;
   let elapsedTime = 0;

   let threshold = 80; //минимальная дистанция, чтобы считаться свайпом - по X
   //let restraint = 100; //максимальное отклонение от линии начала свайпа по высоте - по Y
   let allowedTime = 1000; //время за которое делаем свайп (не слишком медленно) - время через которое отпускаем курсор

   surface.addEventListener('mousedown', function(e) {
      startX = e.pageX;
      startY = e.pageY;
      startTime = new Date().getTime();
      e.preventDefault();      
   });

   surface.addEventListener('mouseup', function(e) {
      distX = e.pageX - startX;
      distY = e.pageY - startY;
      
      elapsedTime = new Date().getTime() - startTime;
      if(elapsedTime <= allowedTime) {   
         let angleDeg = Math.atan(Math.abs(distY) / Math.abs(distX))*180/Math.PI;    
         
         if(angleDeg < 30 && Math.abs(distX) > threshold ) {
            if(distX > 0) {
               smartDecrement()   
               show();
               colorArrow();
            }else {
               smartIncrement()
               show();
               colorArrow();
            }
         }
      }
      e.preventDefault();
   });


   /*Touch event*/
   surface.addEventListener('touchstart', function(e) {
      let touchObj = e.changedTouches[0];
      startX = touchObj.pageX;
      startY = touchObj.pageY;
      startTime = new Date().getTime();
      e.preventDefault();      
   });

   surface.addEventListener('touchend', function(e) {
      let touchObj = e.changedTouches[0];
      distX = touchObj.pageX - startX;
      distY = touchObj.pageY - startY;
      
      elapsedTime = new Date().getTime() - startTime;
      if(elapsedTime <= allowedTime) {   
         let angleDeg = Math.atan(Math.abs(distY) / Math.abs(distX))*180/Math.PI;    
         
         if(angleDeg < 30 && Math.abs(distX) > threshold ) {
            if(distX > 0) {
               smartDecrement()   
               show();
               colorArrow();
            }else {
               smartIncrement()
               show();
               colorArrow();
            }
         }
      }
      e.preventDefault();
   });
   
   surface.addEventListener('touchmove', function(e) {
      e.preventDefault();      
   });

};
let videoCarousel = document.querySelector('#video-carousel');
swipeDetect(videoCarousel);
