// $(function () {
//   $(".carousel__inner").slick({
//     speed: 1200,
// adaptiveHeight: true,
//     prevArrow:
//       '<button type="button" class="slick-prev"><img src="icon/icon_left.png"/></button>',
//     nextArrow:
//       '<button type="button" class="slick-next"><img src="icon/icon_right.png"/></button>',
//     responsive: [
//       {
//         breakpoint: 992,
//         settings: {
//           dots: true,
//           arrows: false,
//         },
//       },
//     ],
//   });
// });

const slider = tns({
  container: ".carousel__inner",
  items: 1,
  slideBy: "page",
  nav: true,
  controls: false,
  responsive: {
    768: {
      nav: false,
    },
  },
});

document.querySelector(".prev").addEventListener("click", function () {
  slider.goTo("prev");
});

document.querySelector(".next").addEventListener("click", function () {
  slider.goTo("next");
});

// Tabs
document.addEventListener("DOMContentLoaded", function () {
  var tabs = document.querySelectorAll(".catalog__tab");
  var tabContents = document.querySelectorAll(".catalog__contents");

  function openTab(event) {
    var tabId = event.target.closest(".catalog__tab").getAttribute("data-tab");

    // Скрыть все содержимое табов и удалить класс 'active'
    for (var i = 0; i < tabContents.length; i++) {
      // tabContents[i].style.display = 'none';
      tabContents[i].classList.remove("catalog__contents_active");
      tabs[i].classList.remove("catalog__tab_active");
    }

    // Показать выбранное содержимое таба и добавить класс 'active'
    var selectedContent = document.querySelector(
      '[data-content="' + tabId + '"]'
    );
    // selectedContent.style.display = 'flex';
    selectedContent.classList.add("catalog__contents_active");
    event.target.closest(".catalog__tab").classList.add("catalog__tab_active");
  }

  // Назначить обработчик события click для каждого таба
  for (var i = 0; i < tabs.length; i++) {
    tabs[i].addEventListener("click", openTab);
  }

  // По умолчанию показать первый таб и его содержимое
  tabs[0].classList.add("catalog__tab_active");
  // tabContents[0].style.display = 'flex';
  tabContents[0].classList.add("catalog__contents_active");
});

// Toggle

var links = document.querySelectorAll(".catalog-item__link");

function toggleClasses(event) {
  event.preventDefault(); // Предотвращаем переход по ссылке

  var link = event.target;
  var listWrapper = link
    .closest(".catalog-item__wrapper")
    .querySelector(".catalog-item__list__wrapper");
  var contentWrapper = link
    .closest(".catalog-item__wrapper")
    .querySelector(".catalog-item__content__wrapper");

  listWrapper.classList.toggle("catalog-item__list__wrapper_active");
  contentWrapper.classList.toggle("catalog-item__content__wrapper_active");
}

for (var i = 0; i < links.length; i++) {
  links[i].addEventListener("click", toggleClasses);
}
