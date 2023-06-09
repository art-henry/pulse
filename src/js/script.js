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

document.addEventListener("DOMContentLoaded", function () {
  // Slider

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

  //Modal

  $("[data-modal=consultation]").on("click", function () {
    $(".overlay, #consultation").fadeIn();
  });
  $(".modal__close, .overlay").on("click", function (event) {
    $(".overlay, #consultation, #thanks, #order").fadeOut();
  });
  $("#consultation, #thanks, #order").on("click", function (event) {
    event.stopPropagation();
  });

  $("[data-modal=order]").each(function (i) {
    $(this).on("click", function () {
      $("#order .modal__descr").text($(".catalog-item__subtitle").eq(i).text());
      $(".overlay, #order").fadeIn();
    });
  });

  function validateForm(form) {
    $(form).validate({
      rules: {
        name: "required",
        phone: "required",
        email: {
          required: true,
          email: true,
        },
      },
      messages: {
        name: "Please specify your name",
        phone: {
          required: "We need your email address to contact you",
          email: "Your phone address must be in the format of 380xx0000000",
        },
        email: {
          required: "We need your email address to contact you",
          email: "Your email address must be in the format of name@domain.com",
        },
      },
    });
  }
  validateForm("#consultation form");
  validateForm("#order form");
  validateForm("#consultation-form");

  $("input[name=phone]").mask("+38 (999) 999-99-99");

  // const buttons = document.querySelectorAll('[data-modal="consultation"]');
  // const orderButtons = document.querySelectorAll('[data-modal="order"]');
  // const modal = document.querySelector("#consultation");
  // const orderModal = document.querySelector("#order");
  // const overlay = document.querySelector(".overlay");

  // // Функция для открытия модального окна
  // function openModal() {
  //   modal.style.display = "block";
  //   overlay.style.display = "block";
  // }

  // function openOrderModal() {
  //   orderModal.style.display = "block";
  //   overlay.style.display = "block";
  // }

  // // Функция для закрытия модального окна
  // function closeModal() {
  //   modal.style.display = "none";
  //   overlay.style.display = "none";
  //   orderModal.style.display = "none";
  // }

  // // Назначаем обработчик события клика на каждую кнопку
  // buttons.forEach(function (button) {
  //   button.addEventListener("click", openModal);
  // });
  // orderButtons.forEach(function (button) {
  //   button.addEventListener("click", openOrderModal);
  // });

  // // Назначаем обработчик события клика на оверлей для закрытия модального окна
  // overlay.addEventListener("click", function (event) {
  //   if (event.target === overlay) {
  //     closeModal();
  //   }
  // });

  // // Назначаем обработчик события клика на кнопку закрытия модального окна
  // const closeButton = modal.querySelector(".modal__close");
  // const orderCloseButton = orderModal.querySelector(".modal__close");
  // closeButton.addEventListener("click", closeModal);
  // orderCloseButton.addEventListener("click", closeModal);
});
