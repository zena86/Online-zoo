`use strict`;
//Burger
document.addEventListener('DOMContentLoaded', function (event) {
   let burger = document.querySelector('.burger');
   let headerRight = document.querySelector('.header__right');
   let body = document.querySelector('body');
   burger.onclick = function () {
      burger.classList.toggle('active');
      headerRight.classList.toggle('active');
      body.classList.toggle('lock');
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
            otherBtn.removeAttribute('checked');
            sumBtnListForm1[i].closest('div').querySelector('input').setAttribute("checked", "checked");
            otherInput.value = undefined;
            validateFormStep1();
            return;
         }else {
            otherBtn.closest('div').querySelector('input').setAttribute("checked", "checked");
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


//Sidebar
const sidebarBody = document.querySelector('.sidebar__body');
const sidebarArrows = document.querySelector('.sidebar__arrows');
const sidebarDown = document.querySelector('.sidebar__down');
const sidebarOthers = document.querySelectorAll('.sidebar__item_others');

sidebarArrows.addEventListener('click', () => {
   sidebarBody.classList.toggle('sidebar-active');
});
window.addEventListener('scroll', (e) => {
   const sidebarBody = document.querySelector('.sidebar__body');
   if (window.matchMedia("(max-width: 768px)").matches) {
      sidebarBody.style.paddingTop = Math.max(0, Math.min(110, window.pageYOffset)) + 'px';
   } else {
      sidebarBody.style.paddingTop = 0;
   }
});

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
   let firstVisibleItem = document.querySelector(".video-carousel__item:not(.video-hidden)");
   let widthItemWithMargin = firstVisibleItem.getBoundingClientRect().width;//ширина слайда + марджин
   let count = Math.ceil(widthGallery / widthItemWithMargin);//количество видимых слайдов 
   let widthMargin = widthItemWithMargin * count - widthGallery;//расстояние между слайдами
   return { count: count, widthItemWithMargin: widthItemWithMargin };
}
function show() {
   let config = getConfig();
   let position = itemIndex * config.widthItemWithMargin;
   itemsBox.style.marginLeft = -position + 'px';
}
function getLastSlideIndex() {
   let config = getConfig();
   let result = listItems.length - config.count - 1;
   return result;
}
function colorArrow() {
   if (itemIndex <= 0) {
      prev.classList.add('inactive');
      next.classList.remove('inactive');
   } else if (itemIndex >= getLastSlideIndex()) {
      prev.classList.remove('inactive');
      next.classList.add('inactive');
   } else {
      prev.classList.remove('inactive');
      next.classList.remove('inactive');
   }
}

function smartIncrement() {
   if (itemIndex < getLastSlideIndex()) {
      itemIndex = itemIndex + itemNumber;
   }
}
function smartDecrement() {
   if (itemIndex !== 0) {
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

   let threshold = 50; //минимальная дистанция, чтобы считаться свайпом - по X
   //let restraint = 100; //максимальное отклонение от линии начала свайпа по высоте - по Y
   let allowedTime = 1000; //время за которое делаем свайп (не слишком медленно) - время через которое отпускаем курсор

   surface.addEventListener('mousedown', function (e) {
      startX = e.pageX;
      startY = e.pageY;
      startTime = new Date().getTime();
      e.preventDefault();
   });

   surface.addEventListener('mouseup', function (e) {
      distX = e.pageX - startX;
      distY = e.pageY - startY;

      elapsedTime = new Date().getTime() - startTime;
      if (elapsedTime <= allowedTime) {
         let angleDeg = Math.atan(Math.abs(distY) / Math.abs(distX)) * 180 / Math.PI;

         if (angleDeg < 30 && Math.abs(distX) > threshold) {
            if (distX > 0) {
               smartDecrement()
               show();
               colorArrow();
            } else {
               smartIncrement()
               show();
               colorArrow();
            }
         }
      }
      e.preventDefault();
   });


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
               smartDecrement()
               show();
               colorArrow();
            } else {
               smartIncrement()
               show();
               colorArrow();
            }
         }
      }
      e.preventDefault();
   });

   surface.addEventListener('touchmove', function (e) {
      e.preventDefault();
   });

};
let videoCarousel = document.querySelector('#video-carousel');
swipeDetect(videoCarousel);

//Video
function changeVideo() {
   let mainVideo = document.querySelector('.video__iframe');
   let camNum = document.querySelector('.cam-num');


   let newUrl;
   let currentItem;

   itemsBox.addEventListener('click', (event) => {
      for (i = 0; i < listItems.length; i++) {
         if (listItems[i].classList.contains('video-hidden')) {
            listItems[i].classList.remove('video-hidden');
         }
      }
      currentItem = event.target.closest('.video-carousel__item');
      if(currentItem === null) {
         return;
      }
      
      newUrl = currentItem.dataset.src;
      currentItem.classList.add('video-hidden');
      mainVideo.src = newUrl;

      newCam = currentItem.dataset.cam;
      camNum.innerHTML = newCam;
   });

}
changeVideo();

class AsideCarousel {
   constructor() {
      this.gallery = document.querySelector('.sidebar__gallery');
      this.itemsBox = document.querySelector('.sidebar__items');
      this.listItems = document.querySelectorAll('.sidebar__item');
      this.nextBtn = document.querySelector('.sidebar__bottom');
      this.itemNumber = 1; // листаемое количество изображений
      this.itemIndex = 0; // положение ленты прокрутки
      this.isBtnActive = true;
   }
   getConfig() {
      let itemHeight = this.itemsBox.firstElementChild.getBoundingClientRect().height;//высота слайда
      let count = 4//количество видимых слайдов 
      return { count: count, itemHeight: itemHeight };
   }
   getLastSlideIndex() {
      let config = this.getConfig();
      let result = this.listItems.length - config.count;
      return result;
   }
   next() {
      if (!this.isBtnActive) 
         return;
      let that = this;
      let config = this.getConfig();
      let animationTime = 500;
      this.itemsBox.style.cssText = `transition: margin ${animationTime}ms ease;`;
      this.itemsBox.style.marginTop = '-' + config.itemHeight + 'px';
      this.isBtnActive = false;
      setTimeout(() => {
         that.itemsBox.style.cssText = 'transition: none';
         that.itemsBox.style.marginTop = 0;
         let firstItem = that.itemsBox.firstElementChild;
         let firstItemClone = firstItem.cloneNode(true);
         that.itemsBox.appendChild(firstItemClone);
         that.itemsBox.removeChild(firstItem);
         that.isBtnActive = true;
      }, animationTime);
   }
   init() {
      let that = this;

      this.nextBtn.addEventListener('click', () => {
         that.next();
      });
   }
}
let sidebarCarousel = new AsideCarousel();
sidebarCarousel.init();