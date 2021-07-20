`use strict`;

//Burger
document.addEventListener('DOMContentLoaded', function (event) {
   let burger = document.querySelector(".burger");
   let headerRight = document.querySelector(".header__right");
   let body = document.querySelector("body");
   burger.onclick = function () {
      burger.classList.toggle("active");
      headerRight.classList.toggle("active");
      body.classList.toggle("lock");
   };
});

//Popup form input

let donateBtn = document.querySelector('.donate-form__btn');
let usd10Btn = document.querySelector('#usd10');
let otherBtn = document.querySelector('#other');
let chooseSum = document.querySelector('.popup-0__btn-box');
let donateSum = '';
let sumBtnListForm1 = document.querySelectorAll('#popup-form1 .sum-btn1');
let donateVal = document.querySelector('#donateVal');
let petBtn = document.querySelector('#pet');
let selected = document.querySelector('.popup-step__main').querySelector('.selected');
let otherInput = document.querySelector('#donateVal');

donateBtn.addEventListener('click', () => {
   let donateInput = document.querySelector('.donate-form__input');
   
   if (donateInput.value == '') {
      usd10Btn.checked = true;
   } else {
      usd10Btn.removeAttribute('checked');
      otherBtn.checked = true;
      otherInput.value = donateInput.value;
   }
   
   doDisableSum();
   doDisableSelectPets();
   validateFormStep1();
});


document.querySelector('.popup-step__main').querySelectorAll('input[type=radio]').forEach((el) => {
   el.addEventListener('change', doDisableSum);
});

petBtn.addEventListener('change', () => {
   doDisableSelectPets();
});
function doDisableSum() {
   if (!otherBtn.checked) {
      donateVal.setAttribute('disabled', 'disabled');
      donateVal.value = '';
   } else {
      donateVal.removeAttribute('disabled', 'disabled');
      donateVal.focus();
   }
};
function doDisableSelectPets() {
   if (!pet.checked) {
      selected.classList.add('selected-disabled');
      selected.innerHTML = '<span>Choose your favourite</span>';
   } else {
      selected.classList.remove('selected-disabled');
   }
};

chooseSum.addEventListener('click', (event) => {
   if (event.target.classList.contains('btn-text')) {
      donateSum = event.target.innerHTML;
      for (let i = 0; i < sumBtnListForm1.length; i++) {
         if (sumBtnListForm1[i].innerHTML === donateSum) {
            //console.log(`${donateSum} = ${sumBtnListForm1[i].innerHTML}`);
            otherBtn.removeAttribute('checked');
            sumBtnListForm1[i].closest('div').querySelector('input').checked = true;
            doDisableSum();
            otherInput.value = undefined;
            validateFormStep1();
            return;
         }else {
            otherBtn.closest('div').querySelector('input').checked = true;
            doDisableSum();
         }
      }
   }
   validateFormStep1();
});

//For validation form
let completeBtn = document.querySelector('#complete-btn');
let nameField = document.querySelector('#popup-name');
let emailField = document.querySelector('#popup-email');
let creditField = document.querySelector('#popup-credit');
let cvvField = document.querySelector('#popup-cvv');
let numBtnListForm1 = document.querySelectorAll('#popup-form1 .num-btn1');
let next1Btn = document.querySelector('#btn-next1');
let next2Btn = document.querySelector('#popup2-next');
let otherField = document.querySelector('#other');
let monthList = document.querySelectorAll('.option-month');
let yearList = document.querySelectorAll('.option-year');
let month3Val;
let year3Val;

//Валидация формы - поля не пустые => кнопку можно нажать

//Step1
for (let i = 0; i < numBtnListForm1.length; i++) {
   numBtnListForm1[i].addEventListener('input', () => {
      validateFormStep1();
   });
}

otherField.addEventListener('input', () => {
   validateFormStep1();
});

const isValidateFormStep1 = () => {
   for (let i = 0; i < numBtnListForm1.length; i++) {
      if (numBtnListForm1[i].checked)
         return true;
   }
   return (+donateVal.value > 0);
};
const validateFormStep1 = () => {
   if (isValidateFormStep1()) {
      next1Btn.classList.remove('inactive');
   } else {
      next1Btn.classList.add('inactive');
   }
};

donateVal.addEventListener('input', () => {
   validateFormStep1();
});

//Step2
const validateFormStep2 = () => {
   if (nameField.validity.valid && emailField.validity.valid) {
      next2Btn.classList.remove('inactive');
   } else {
      next2Btn.classList.add('inactive');
   }
}
next1Btn.addEventListener('click', () => {
   validateFormStep2();
});
nameField.addEventListener('input', () => {
   validateFormStep2();
});
emailField.addEventListener('input', () => {
   validateFormStep2();
});
next2Btn.addEventListener('click', () => {
   validateFormStep3();
});

//Step3
const validateFormStep3 = () => {
   if (creditField.validity.valid && cvvField.validity.valid && month3Val && year3Val && creditField.value.length === 16 && cvvField.value.length === 3) {
      completeBtn.classList.remove('inactive');
   } else {
      completeBtn.classList.add('inactive');
   }
}
creditField.addEventListener('input', () => {
   validateFormStep3();
});
cvvField.addEventListener('input', () => {
   validateFormStep3();
});


for (let i = 0; i < monthList.length; i++) {
   monthList[i].addEventListener('click', (el) => {
      month3Val = monthList[i].querySelector('label').innerHTML;
      validateFormStep3();
   });
}
for (let i = 0; i < yearList.length; i++) {
   yearList[i].addEventListener('click', (el) => {
      year3Val = yearList[i].querySelector('label').innerHTML;
      validateFormStep3();
   });
}


//Select
const selectBoxes = document.querySelectorAll(".select-box");

selectBoxes.forEach(el => {
   const selected = el.querySelector(".selected");
   const optionsContainer = el.querySelector(".options-container");
   const optionsList = el.querySelectorAll(".option");
   const selectMarginTop = el.querySelector(".select-margin_top");
   const selectMarginBottom = el.querySelector(".select-margin_bottom");


   function close(){
      optionsContainer.classList.remove("select-active");
      selectMarginTop.classList.remove("margin-active");
      selectMarginBottom.classList.remove("margin-active");
   }
   function closeEvent(el){
      let selectedEl = el.target.closest('.selected');
      if(selectedEl === null) {
         close();
         document.querySelector('body').removeEventListener('click', closeEvent); 
      }    
   }

   selected.addEventListener('click', () => {
      optionsContainer.classList.toggle("select-active");
      selectMarginTop.classList.toggle("margin-active");
      selectMarginBottom.classList.toggle("margin-active");

      document.querySelector('body').addEventListener('click', closeEvent);
   });

   optionsList.forEach(el => {
      el.addEventListener('click', () => {
         selected.innerHTML = el.querySelector("label").innerHTML;
         close();
      });
   });
});


//POP-UP
const popupLinks = document.querySelectorAll('.popup-link');
const body = document.querySelector('body');
let unlock = true; //Чтобы не было двойных нажатий
const timeout = 800;//Для блокировки скрола со значением как в анимации

for (let i = 0; i < popupLinks.length; i++) {
   const popupLink = popupLinks[i];
   popupLink.addEventListener('click', function (e) {
      const popupName = popupLink.getAttribute("href").replace("#", "");
      const curentPopup = document.getElementById(popupName);
      popupOpen(curentPopup);
      e.preventDefault(); //блокируем работу ссылки, чтобы не было перезагрузки
   });
}
const popupCloseIcons = document.querySelectorAll(".close-popup");
if (popupCloseIcons.length > 0) {
   for (let i = 0; i < popupCloseIcons.length; i++) {
      const popupCloseIcon = popupCloseIcons[i];
      popupCloseIcon.addEventListener("click", function (e) {
         popupClose(popupCloseIcon.closest(".popup"));// объект .popup, ближайший к popupCloseIcon
         e.preventDefault();
      });
   }
}
//Чтобы работали кнопки next - ссылка на pop-up2
function popupOpen(curentPopup) {
   if (curentPopup && unlock) {
      const popupActive = document.querySelector(".popup.popup-open");
      if (popupActive) {
         popupClose(popupActive, false);
      } else {
         bodyLock();
      }
      curentPopup.classList.add("popup-open");
      //Закрытие попапа по клику на область вокруг контента
      curentPopup.addEventListener('click', function (e) {
         if (!e.target.closest(".popup__content")) { //отсекаем все кроме темной обл.т.е. если у нажатого родителя нет класса .popup-content, то...   
            popupClose(e.target.closest(".popup"));//передаем ближайший объект с классом .popup в функцию закрытия
         }
      });
   }
}
function popupClose(popupActive, doUnlock = true) {//Если popup в popup
   if (unlock) {
      popupActive.classList.remove("popup-open");
      if (doUnlock) {
         bodyUnLock();
      }
   }
}
function bodyLock() {
   const lockPaddingValue = window.innerWidth - document.querySelector(".wrapper").offsetWidth + "px"; //ширина скрола
   body.style.paddingRight = lockPaddingValue;
   body.classList.add("popup-lock");
   unlock = false;
   setTimeout(function () {
      unlock = true;
   }, timeout);
}
function bodyUnLock() {
   setTimeout(function () {
      body.style.paddingRight = "0px";
      body.classList.remove("popup-lock");
   }, timeout);
}
//Close popup Esc
document.addEventListener("keydown", function (e) {
   if (e.which === 27) {
      const popupActive = document.querySelector(".popup.popup-open");
      popupClose(popupActive);
   }
});

/*Carousels*/
class BaseCarousel {
   getConfig() {
   }
   show() {
      let config = this.getConfig();
      let position = this.itemIndex * config.widthItemWithMargin;
      this.itemsBox.style.marginLeft = -position + 'px';
   }
   colorArrow() {
      if (this.itemIndex <= 0) {
         this.prev.classList.add('inactive');
         this.next.classList.remove('inactive');
      } else if (this.itemIndex >= this.getLastSlideIndex()) {
         this.prev.classList.remove('inactive');
         this.next.classList.add('inactive');
      } else {
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
   infinityIncrement() {
      if (this.itemIndex < this.getLastSlideIndex()) {
         this.itemIndex = this.itemIndex + this.itemNumber;
      } else {
         this.itemIndex = 0;
      }
   }
   getLastSlideIndex() {
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
                  context.colorBullets()
               } else {
                  context.smartIncrement()
                  context.show();
                  context.colorArrow();
                  context.colorBullets();
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
                  that.colorBullets();
               } else {
                  that.smartIncrement()
                  that.show();
                  that.colorArrow();
                  that.colorBullets();
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
      this.colorBullets();

      let that = this;
      window.addEventListener('resize', (e) => {
         if (that.itemIndex > that.getLastSlideIndex()) {
            that.itemIndex = that.getLastSlideIndex();
            that.colorArrow();
            that.colorBullets();
         }
         that.show();
      });

      let onPrevAction = function (context) {
         context.smartDecrement();
         context.show();
         context.colorArrow();
         context.colorBullets();
      }
      let onNextAction = function (context) {
         context.smartIncrement();
         context.show();
         context.colorArrow();
         context.colorBullets();
      }

      this.prev.addEventListener('click', () => onPrevAction(this));
      this.next.addEventListener('click', () => onNextAction(this));

      this.prev.addEventListener('touchstart', () => onPrevAction(this));
      this.next.addEventListener('touchstart', () => onNextAction(this));

      this.swipeDetect(this.surface);

      if (this.listBullets) {
         for (let i = 0; i < this.listBullets.length; i++) {
            this.listBullets[i].addEventListener('click', () => {
               that.changeIndex(i);
               that.show();
               that.colorBullets();
            });
         }
      }
   }
}

/*Comments carousel*/
class CommentsCarousel {
   constructor() {
      this.gallery = document.querySelector('.comments-carousel__gallery');
      this.itemsBox = document.querySelector('.comments-carousel__items');
      this.listBullets = document.querySelectorAll('.bullet');
      this.listItems = document.querySelectorAll('.comments__card');
      this.prevBtn = document.querySelector('.comments-prev');
      this.nextBtn = document.querySelector('.comments-next');
      this.surface = document.querySelector('.comments-carousel');
      this.itemNumber = 1; // листаемое количество изображений
      this.itemIndex = 0; // положение ленты прокрутки
      this.timer = {};
   }
   getConfig() {
      let galleryRect = this.gallery.getBoundingClientRect();
      let itemsRect = this.itemsBox.firstElementChild.getBoundingClientRect();
      let galleryWidth = galleryRect.width; //ширина видимой части слайдера
      let galleryHeight = galleryRect.height;
      let itemWidth = itemsRect.width;//ширина слайда + марджин
      let itemHeight = itemsRect.width;
      let countHorizontal = Math.round(galleryWidth / itemWidth);//количество видимых слайдов 
      let countVertical = Math.round(galleryHeight / itemHeight);//количество видимых слайдов 
      let carousel = document.querySelector('.comments-carousel__items');
      let gap = +window.getComputedStyle(carousel).gap.slice(0, -2);
      return {
         countHorizontal: countHorizontal,
         countVertical: countVertical,
         itemWithMarginWidth: itemWidth + gap,
         itemWidth: itemWidth
      };
   }
   startTimer() {
      let that = this;
      this.timer = setInterval(() => {
         that.next();
      }, 15000); //15000
   }
   stopTimer() {
      clearInterval(this.timer);
   }
   restartTimer() {
      let that = this;
      setTimeout(() => {
         that.stopTimer();
         that.startTimer();
      }, 45000);//60000
   }
   next() {
      let that = this;
      let config = this.getConfig();
      let animationTime = 1000;
      this.itemsBox.style.cssText = `transition: margin ${animationTime}ms ease;`;
      this.itemsBox.style.marginLeft = '-' + config.itemWithMarginWidth + 'px';
      setTimeout(() => {
         that.itemsBox.style.cssText = 'transition: none';
         that.itemsBox.style.marginLeft = 0;
         for (let i = 0; i < config.countVertical; i++) {
            let firstItem = that.itemsBox.firstElementChild;
            let firstItemClone = firstItem.cloneNode(true);
            that.itemsBox.appendChild(firstItemClone);
            that.itemsBox.removeChild(firstItem);
            firstItemClone.addEventListener('click', () => {
               that.stopTimer();
               that.restartTimer();
            });
         }
      }, animationTime);
   }
   prev() {
      let that = this;
      let config = this.getConfig();
      let animationTime = 1000;

      that.itemsBox.style.cssText = 'transition: none';

      for (let i = 0; i < config.countVertical; i++) {
         let lastItem = that.itemsBox.lastElementChild;
         let lastItemClone = lastItem.cloneNode(true);
         that.itemsBox.insertBefore(lastItemClone, that.itemsBox.firstElementChild);
         that.itemsBox.removeChild(lastItem);
         lastItemClone.addEventListener('click', () => {
            that.stopTimer();
            that.restartTimer();
         });
      }
      this.itemsBox.style.marginLeft = '-' + config.itemWithMarginWidth + 'px';

      let compStyle = window.getComputedStyle(this.itemsBox).marginLeft;
      this.itemsBox.style.cssText = `transition:margin ${animationTime}ms ease;`;

      this.itemsBox.style.marginLeft = '0px';

      setTimeout(() => {
         that.itemsBox.style.cssText = 'transition:none;'
      }, animationTime);
   }
   init() {
      let that = this;
      this.startTimer();
      //|| event.target.closest('article').classList.contains('comments__card')
      this.itemsBox.addEventListener('click', (event) => {
         let commentsCard = event.target.closest('article');
         if( commentsCard === null ) 
            return;
         if (commentsCard.classList.contains('comments__card')) {
            that.stopTimer();
            that.restartTimer();
         }
      });
      this.nextBtn.addEventListener('click', () => {
         that.next();
         that.stopTimer();
         that.restartTimer();
      });
      this.prevBtn.addEventListener('click', () => {
         that.prev();
         that.stopTimer();
         that.restartTimer();
      });
   }
}
let commentsCarousel = new CommentsCarousel();
commentsCarousel.init();


/*Pets carousel*/
class PetsCarousel extends BaseCarousel {
   constructor() {
      super();
      this.gallery = document.querySelector('.pets-carousel__gallery');
      this.itemsBox = document.querySelector('.pets-carousel__cards');
      //this.listBullets = document.querySelectorAll('.bullet');
      this.listItems = document.querySelectorAll('.pets__card');
      this.prev = document.querySelector('.pets-prev');
      this.next = document.querySelector('.pets-next');
      this.surface = document.querySelector('.pets-carousel');
      this.itemNumber = 1; // листаемое количество изображений
      this.itemIndex = 0; // положение ленты прокрутки
      //this.n = 2; //количество строк
   }
   getConfig() {
      let widthGallery = this.gallery.getBoundingClientRect().width; //ширина видимой части слайдера
      let widthItem = this.listItems[0].getBoundingClientRect().width;//ширина слайда + марджин
      let count = Math.round(widthGallery / widthItem);//количество видимых слайдов 
      let carousel = document.querySelector('.pets-carousel__cards');
      let gap = +window.getComputedStyle(carousel)['column-gap'].slice(0, -2);
      return { count: count, widthItemWithMargin: widthItem + gap, widthItem: widthItem };
   }
   colorBullets() { }
   getLastSlideIndex() {
      let config = this.getConfig();
      let result = (this.listItems.length - config.count * 2) / 2;
      return result;
   }
}
let petsCarousel = new PetsCarousel();
petsCarousel.carouselInit();
