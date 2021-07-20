`use strict`;

/*Base carousel*/
class BaseCarousel {
   getConfig() {
      let widthGallery = this.gallery.getBoundingClientRect().width; //ширина видимой части слайдера
      let widthItem = this.listItems[0].getBoundingClientRect().width;//ширина слайда + марджин
      let count = Math.round(widthGallery / widthItem);//количество видимых слайдов 
      //let widthMargin = widthItemWithMargin * count - widthGallery;//расстояние между слайдами
      //let widthItem = widthItemWithMargin - widthMargin;//ширина слайда (картинки)

      let caruselll = document.querySelector('.pets-carousel__cards');
      let gap = +window.getComputedStyle(caruselll)['column-gap'].slice(0, -2);      
      return { count: count, widthItemWithMargin: widthItem + gap, widthItem: widthItem };
      //console.log({count: count, widthItemWithMargin: widthItem + gap, widthItem: widthItem});
   }
   show() {
      let config = this.getConfig();
      let position = this.itemIndex * config.widthItemWithMargin;
      this.itemsBox.style.marginLeft = -position + 'px';  
   }
   colorArrow() {
      if(this.itemIndex <= 0) {
         this.prev.classList.add('inactive');
         this.next.classList.remove('inactive');
      }else if (this.itemIndex >= this.getLastSlideIndex()) {
         this.prev.classList.remove('inactive');
         this.next.classList.add('inactive');
      }else {
         this.prev.classList.remove('inactive');
         this.next.classList.remove('inactive');
      }
   }
   colorBullets() {
      for (let i = 0; i < this.listBullets.length; i++) {
         this.listBullets[i].classList.remove('current-bullet');
      }
      this.listBullets[this.itemIndex].classList.add('current-bullet');
   }
   getLastSlideIndex() {
      let config = this.getConfig();
      return this.listItems.length/config.count*2 - config.count;
   }
   smartIncrement() {
      if (this.itemIndex < this.getLastSlideIndex()) {
         this.itemIndex = this.itemIndex + this.itemNumber;
      } 
   }
   smartDecrement() {
      if (this.itemIndex !== 0) {
         this.itemIndex = this.itemIndex - this.itemNumber;
      }
   }
   changeIndex(newIndex) {
      this.itemIndex = newIndex;
   }
   swipeDetect(surface) {
      let that = this;

      let startX = 0;
      let startY = 0;
      let distX = 0;
      let distY = 0;

      let startTime = 0;
      let elapsedTime = 0;

      let threshold = 80; //минимальная дистанция, чтобы считаться свайпом - по X
      let allowedTime = 1000; //время за которое делаем свайп (не слишком медленно) - время через которое отпускаем курсор

      surface.addEventListener('mousedown', function (e) {
         startX = e.pageX;
         startY = e.pageY;
         startTime = new Date().getTime();
         e.preventDefault();
      });

      let onmouseupAction = function (e, context) {
         distX = e.pageX - startX;
         distY = e.pageY - startY;

         elapsedTime = new Date().getTime() - startTime;
         if (elapsedTime <= allowedTime) {
            let angleDeg = Math.atan(Math.abs(distY) / Math.abs(distX)) * 180 / Math.PI;

            if (angleDeg < 30 && Math.abs(distX) > threshold) {
               if (distX > 0) {
                  context.smartDecrement()
                  context.show();
                  context.colorArrow();
                  /*context.colorBullets()*/
               } else {
                  context.smartIncrement()
                  context.show();
                  context.colorArrow();
                  /*context.colorBullets();*/
               }
            }
         }
         e.preventDefault();
      }
      surface.addEventListener('mouseup', (e) => onmouseupAction(e, this));

      /*Touch event*/
      surface.addEventListener('touchstart', function (e) {
         let touchObj = e.changedTouches[0];
         startX = touchObj.pageX;
         startY = touchObj.pageY;
         startTime = new Date().getTime();
         e.preventDefault();
      });

      surface.addEventListener('touchend', function (e) {
         let touchObj = e.changedTouches[0];
         distX = touchObj.pageX - startX;
         distY = touchObj.pageY - startY;

         elapsedTime = new Date().getTime() - startTime;
         if (elapsedTime <= allowedTime) {
            let angleDeg = Math.atan(Math.abs(distY) / Math.abs(distX)) * 180 / Math.PI;

            if (angleDeg < 30 && Math.abs(distX) > threshold) {
               if (distX > 0) {
                  that.smartDecrement()
                  that.show();
                  that.colorArrow();
                  /*that.colorBullets();*/
               } else {
                  that.smartIncrement()
                  that.show();
                  that.colorArrow();
                  /*that.colorBullets();*/
               }
            }
         }
         e.preventDefault();
      });

      surface.addEventListener('touchmove', function (e) {
         e.preventDefault();
      });
   };
   carouselInit() {
      this.getLastSlideIndex();
      this.colorArrow();
      /*this.colorBullets();*/

      let that = this;
      window.addEventListener('resize', (e) => { 
         if(that.itemIndex > that.getLastSlideIndex()) {
            that.itemIndex = that.getLastSlideIndex();
            that.colorArrow();
            /*that.colorBullets();*/
         }
         that.show();
      });

      let onPrevAction = function (context) {
         context.smartDecrement();
         context.show();
         context.colorArrow();
         /*context.colorBullets();*/
      }
      let onNextAction = function (context) {
         context.smartIncrement();
         context.show();
         context.colorArrow();
         /*context.colorBullets();*/
      }

      this.prev.addEventListener('click', () => onPrevAction(this));
      this.next.addEventListener('click', () => onNextAction(this));

      this.prev.addEventListener('touchstart', () => onPrevAction(this));
      this.next.addEventListener('touchstart', () => onNextAction(this));

      this.swipeDetect(this.surface);

      /*for (let i = 0; i < this.listBullets.length; i++) {
         this.listBullets[i].addEventListener('click', () => {
            that.changeIndex(i);
            that.show();
            that.colorBullets();
         });
      }*/
   }
}

