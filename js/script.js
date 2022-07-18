//функция определения поддержки WebP
function testWebP(callback) { 

  var webP = new Image();
  webP.onload = webP.onerror = function () {
    callback(webP.height == 2);
  };
  webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
}

testWebP(function (support) {

  if (support == true) {
    document.querySelector('body').classList.add('webp');
  } else {
    document.querySelector('body').classList.add('no-webp');
  }
});

//полифил для IE 10-11
if (window.NodeList && !NodeList.prototype.forEach) {
  NodeList.prototype.forEach = function (callback, thisArg) {
    thisArg = thisArg || window;
    for (var i = 0; i < this.length; i++) {
      callback.call(thisArg, this[i], i, this);
    }
  };
}

// scroll
let lastScroll = 0;
const defaultOffset = 100;
const header = document.querySelector('.header');

function scrollPosition() {
  return window.pageYOffset || document.documentElement.scrollTop;
};

function containHidden() {
  return header.classList.contains('header--hidden');
};

window.addEventListener('scroll', function () {
  if (scrollPosition() > lastScroll && !containHidden() && scrollPosition() > defaultOffset) {
    header.classList.add('header--hidden');
  } else if (scrollPosition() < lastScroll && containHidden()) {
    header.classList.remove('header--hidden');
  };
  lastScroll = scrollPosition();
});


//burger menu
const menuBtn = document.querySelector('.top-header__menu-btn');
const menu = document.querySelector('.mini-menu__list');

if (menuBtn) {
  menuBtn.addEventListener('click', function () {
    if (menu.classList.contains('mini-menu__list--active')) {
      menu.classList.remove('mini-menu__list--active');
    } else {
      menu.classList.add('mini-menu__list--active');
    }
  });
};

document.addEventListener('click', function (e) {
  if (!e.target.classList.contains('menu-btn__span')) {
    if (!e.target.classList.contains('burger')) {
      menu.classList.remove('mini-menu__list--active');
    }
  };
});

const expandBtns = document.querySelectorAll('.expand-item');

if (expandBtns) {
  expandBtns.forEach(function (expandBtn) {
    expandBtn.addEventListener('click', function () {
      expandBtn.children[1].classList.toggle('arrow--reversed');
      expandBtn.nextElementSibling.classList.toggle('expand-list--expanded');
    });
  });
};

const moreAboutBtn = document.querySelector('.about__more');
const moreAboutText = document.querySelector('.show-less');

if (moreAboutBtn) {
  moreAboutBtn.addEventListener('click', function () {
    this.classList.toggle('about__more-hidden');
    moreAboutText.classList.toggle('show-less--active');
  });
}

//sliders

$(document).ready(function () {
  $('.top__slider-inner').slick({
    slidesToShow: 1,
    infinite: true,
    autoplay: true,
    speed: 900,
    autoplaySpeed: 3300,
    easing: 'easeInSine',
    prevArrow: '<button type="button" class="slick-btn slick-prev"> <img src="img/arrow-left.svg" alt=""></button>',
    nextArrow: '<button type="button" class="slick-btn slick-next"> <img src="img/arrow-right.svg" alt=""></button>',
  });
});

$(document).ready(function () {
  $('.popular-slider__inner').slick({
    slidesToShow: 4,
    infinite: true,
    prevArrow: '<button type="button" class="popular-btn popular-prev"> <img src="img/arrow-left.svg" alt=""></button>',
    nextArrow: '<button type="button" class="popular-btn popular-next"> <img src="img/arrow-right.svg" alt=""></button>',
    responsive: [{
        breakpoint: 1101,
        settings: {
          slidesToShow: 3
        }
      },
      {
        breakpoint: 870,
        settings: {
          slidesToShow: 2
        }
      },
    ]
  });
});
$(document).ready(function () {
  $('.sale-slider__inner').slick({
    slidesToShow: 4,
    infinite: true,
    prevArrow: '<button type="button" class="sale-btn sale-prev"> <img src="img/arrow-left.svg" alt=""></button>',
    nextArrow: '<button type="button" class="sale-btn sale-next"> <img src="img/arrow-right.svg" alt=""></button>',
    responsive: [{
        breakpoint: 1101,
        settings: {
          slidesToShow: 3
        }
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 2
        }
      },
    ]
  });
});
$(document).ready(function () {
  $('.recommends-slider__inner').slick({
    slidesToShow: 4,
    infinite: true,
    prevArrow: '<button type="button" class="rec-btn rec-prev"> <img src="img/arrow-left.svg" alt=""></button>',
    nextArrow: '<button type="button" class="rec-btn rec-next"> <img src="img/arrow-right.svg" alt=""></button>',
    responsive: [{
        breakpoint: 1101,
        settings: {
          slidesToShow: 3
        }
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 2
        }
      },
    ]
  });
});
$(document).ready(function () {
  $('.book-slider__inner').slick({
    slidesToShow: 4,
    infinite: true,
    prevArrow: '<button type="button" class="rec-btn rec-prev"> <img src="img/arrow-left.svg" alt=""></button>',
    nextArrow: '<button type="button" class="rec-btn rec-next"> <img src="img/arrow-right.svg" alt=""></button>',
    responsive: [{
        breakpoint: 1101,
        settings: {
          slidesToShow: 3
        }
      },
      {
        breakpoint: 830,
        settings: {
          slidesToShow: 2
        }
      },
    ]
  });
});


//dropdowns

document.querySelectorAll('.dropdown').forEach(function (dropDownWrapper) {
  const dropDownBtn = dropDownWrapper.querySelector('.dropdown__button');
  const dropDownList = dropDownWrapper.querySelector('.dropdown__list');
  const dropDownListItems = dropDownList.querySelectorAll('.dropdown__list-item');
  const dropDownInput = dropDownWrapper.querySelector('.dropdown__input-hidden');
  dropDownBtn.addEventListener('click', function (e) {
    e.preventDefault();
    dropDownList.classList.toggle('dropdown__list--visible');
    this.classList.add('dropdown__button--active');
  });
  dropDownListItems.forEach(function (listItem) {
    listItem.addEventListener('click', function (e) {
      e.stopPropagation();
      dropDownBtn.innerText = this.innerText;
      dropDownInput.value = this.dataset.value;
      dropDownBtn.classList.remove('dropdown__button--active');
      // mobile dropdown sort
      if (dropDownInput.name === "sort-parameter-mobile") {
        if (dropDownInput.value == "popular") {
          let booksFilter = document.querySelector('.book-selection__row');
          for (let i = 0; i < booksFilter.children.length; i++) {
            for (let j = i; j < booksFilter.children.length; j++) {
              if (+booksFilter.children[i].getAttribute('data-popular') > +booksFilter.children[j].getAttribute('data-popular')) {
                replacedNode = booksFilter.replaceChild(booksFilter.children[j], booksFilter.children[i]);
                insertAfter(replacedNode, booksFilter.children[i]);
              };
            };
          };
        } else if (dropDownInput.value == "publish") {
          let booksFilter = document.querySelector('.book-selection__row');
          for (let i = 0; i < booksFilter.children.length; i++) {
            for (let j = i; j < booksFilter.children.length; j++) {
              if (booksFilter.children[i].getAttribute('data-publisher') > booksFilter.children[j].getAttribute('data-publisher')) {
                replacedNode = booksFilter.replaceChild(booksFilter.children[j], booksFilter.children[i]);
                insertAfter(replacedNode, booksFilter.children[i]);
              };
            };
          };
        } else {
          let booksFilter = document.querySelector('.book-selection__row');
          for (let i = 0; i < booksFilter.children.length; i++) {
            for (let j = i; j < booksFilter.children.length; j++) {
              if (+booksFilter.children[i].getAttribute('data-price') > +booksFilter.children[j].getAttribute('data-price')) {
                replacedNode = booksFilter.replaceChild(booksFilter.children[j], booksFilter.children[i]);
                insertAfter(replacedNode, booksFilter.children[i]);
              };
            };
          };
        }
      };
      dropDownList.classList.remove('dropdown__list--visible');
    });
  });

  document.addEventListener('click', function (e) {
    if (e.target !== dropDownBtn) {
      dropDownList.classList.remove('dropdown__list--visible');
      dropDownBtn.classList.remove('dropdown__button--active');
    };
  });


  document.addEventListener('keydown', function (e) {
    if (e.key === 'Tab' || e.key === 'Escape') {
      dropDownList.classList.remove('dropdown__list--visible');
      dropDownBtn.classList.remove('dropdown__button--active');
    };
  });
});


const booksPriceFilters = document.querySelectorAll('.books-filter__item');
const rangeSlider = document.getElementById('range-slider');

if (rangeSlider) {
  noUiSlider.create(rangeSlider, {
    start: [50, 9999],
    margin: 15,
    connect: true,
    step: 1,
    range: {
      'min': 50,
      'max': 9999
    }
  });


  const input0 = document.getElementById('input-min');
  const input1 = document.getElementById('input-max');
  const inputs = [input0, input1];

  rangeSlider.noUiSlider.on('update', function (values, handle) {
    inputs[handle].value = Math.round(values[handle]);
    min = Number(inputs[0].value);
    max = Number(inputs[1].value);
    console.log(min, max)
    booksPriceFilters.forEach(function (filteredBook) {
      let bookPrice = Number(filteredBook.getAttribute('data-price'));
      if (bookPrice < min) {
        filteredBook.classList.add('book-item--hidden-price');
      } else if (bookPrice > max) {
        filteredBook.classList.add('book-item--hidden-price');
      } else if (bookPrice > min && filteredBook.classList.contains('book-item--hidden-price')) {
        filteredBook.classList.remove('book-item--hidden-price');
      } else if (bookPrice < max && filteredBook.classList.contains('book-item--hidden-price')) {
        filteredBook.classList.remove('book-item--hidden-price');
      }
    });
    const bookList = document.querySelectorAll('.book-item--hidden-price');
    if (bookList) {
      const bookListLength = bookList.length;
      if (bookListLength == 0) {
        document.querySelector('.pages').classList.remove('pages--hidden');
        document.querySelector('.books-filter__not-found').classList.remove('books-filter__not-found--visible');
      } else if (bookListLength == 9) {
        document.querySelector('.pages').classList.add('pages--hidden');
        document.querySelector('.books-filter__not-found').classList.add('books-filter__not-found--visible');
      } else {
        document.querySelector('.pages').classList.add('pages--hidden');
        document.querySelector('.books-filter__not-found').classList.remove('books-filter__not-found--visible');
      };
    };
  });

  function setRangeSlider(i, value) {
    let arr = [null, null];
    arr[i] = value;
    rangeSlider.noUiSlider.set(arr);
  };

  inputs.forEach(function (el, index) {
    el.addEventListener('change', function (e) {
      setRangeSlider(index, e.currentTarget.value);
    });
  });
};


let langBtn = document.querySelector('.change-lang');
let langList = document.querySelector('.lang-list');
let langCurrent = document.querySelector('.change-lang__current-lang');
let langArrow = document.querySelector('.change-lang__arrow-img');

langBtn.addEventListener('click', function () {
  langList.classList.toggle('lang-list--active');
});

document.addEventListener('click', function (e) {
  if (e.target !== langList && e.target !== langBtn && e.target !== langCurrent && e.target !== langArrow) {
    langList.classList.remove('lang-list--active');
  };
});

let favBtns = document.querySelectorAll(".favour-btn");
let favCounter = document.querySelector('.wishlist-count');

favBtns.forEach(function (addToFavBtn) {
  addToFavBtn.addEventListener('click', function (e) {
    e.preventDefault();
    if (addToFavBtn.classList.contains("book-fav__ico--active")) {
      let favValue = +favCounter.getAttribute('data-wishlistcount') - 1;
      favCounter.setAttribute('data-wishlistcount', favValue);
      favCounter.innerHTML = favValue;
      addToFavBtn.classList.remove('book-fav__ico--active');
    } else {
      let favValue = +favCounter.getAttribute('data-wishlistcount') + 1;
      favCounter.setAttribute('data-wishlistcount', favValue);
      favCounter.innerHTML = favValue;
      addToFavBtn.classList.add('book-fav__ico--active');
    };
  });
});


let cartBtns = document.querySelectorAll('.cart-btn');
let cartCounter = document.querySelector('.cart-count');

cartBtns.forEach(function (addToCartBtn) {
  addToCartBtn.addEventListener('click', function (e) {
    e.preventDefault();
    if (addToCartBtn.classList.contains('cart-btn--active')) {

    } else {
      let cartValue = +cartCounter.getAttribute('data-cartcount') + 1;
      cartCounter.setAttribute('data-cartcount', cartValue);
      cartCounter.innerHTML = cartValue;
      addToCartBtn.classList.add('cart-btn--active');

    };
  });
});


let infavBtns = document.querySelectorAll(".infavour-btn");

infavBtns.forEach(function (infavBtn) {
  infavBtn.addEventListener('click', function (e) {
    e.preventDefault();
    let infavValue = +favCounter.getAttribute('data-wishlistcount');
    if (infavValue > 1) {
      let favId = '.' + infavBtn.getAttribute('data-rm');
      let favRm = document.querySelector(favId);
      favRm.remove();
      let favValue = +favCounter.getAttribute('data-wishlistcount') - 1;
      favCounter.setAttribute('data-wishlistcount', favValue);
      favCounter.innerHTML = favValue;
    } else if (infavValue = 1) {
      let favId = '.' + infavBtn.getAttribute('data-rm');
      let favRm = document.querySelector(favId);
      favRm.remove();
      document.querySelector('.wishlist__not-found').classList.add('wishlist__not-found--visible');
      let favValue = +favCounter.getAttribute('data-wishlistcount') - 1;
      favCounter.setAttribute('data-wishlistcount', favValue);
      favCounter.innerHTML = favValue;
      document.querySelector('.wishlist-count').classList.add('wishlist-count--hidden');
    }
  });
});

let bookCartBtn = document.querySelector('.book-page__btn');
if (bookCartBtn) {
  bookCartBtn.addEventListener('click', function () {
    if (bookCartBtn.classList.contains('book-added')) {

    } else {
      let cartValue = +cartCounter.getAttribute('data-cartcount') + 1;
      cartCounter.setAttribute('data-cartcount', cartValue);
      cartCounter.innerHTML = cartValue;
      bookCartBtn.classList.add('book-added');
    }
  });
};



//SORT BY POPULARITY, PUBLISHER, PRICE
let selectedSorting = "notselected";

let popularSortBtn = document.querySelector('.popular-sort');
if (popularSortBtn) {
  popularSortBtn.onclick = popularSort;
};
let publisherSortBtn = document.querySelector('.publisher-sort');
if (publisherSortBtn) {
  publisherSortBtn.onclick = publisherSort;
};
let priceSortBtn = document.querySelector('.price-sort');
if (priceSortBtn) {
  priceSortBtn.onclick = priceSort;
};
let reverseSortBtn = document.querySelector('.reverse-sort');
if (reverseSortBtn) {
  reverseSortBtn.onclick = reverseSort;
};


function popularSort() {
  selectedSorting = "popular";
  let booksFilter = document.querySelector('.book-selection__row');
  for (let i = 0; i < booksFilter.children.length; i++) {
    for (let j = i; j < booksFilter.children.length; j++) {
      if (+booksFilter.children[i].getAttribute('data-popular') > +booksFilter.children[j].getAttribute('data-popular')) {
        replacedNode = booksFilter.replaceChild(booksFilter.children[j], booksFilter.children[i]);
        insertAfter(replacedNode, booksFilter.children[i]);
      };
    };
  };
};

function popularSortDesc() {
  selectedSorting = "popularDesc";
  let booksFilter = document.querySelector('.book-selection__row');
  for (let i = 0; i < booksFilter.children.length; i++) {
    for (let j = i; j < booksFilter.children.length; j++) {
      if (+booksFilter.children[i].getAttribute('data-popular') < +booksFilter.children[j].getAttribute('data-popular')) {
        replacedNode = booksFilter.replaceChild(booksFilter.children[j], booksFilter.children[i]);
        insertAfter(replacedNode, booksFilter.children[i]);
      };
    };
  };
};

function publisherSort() {
  selectedSorting = "publish";
  let booksFilter = document.querySelector('.book-selection__row');
  for (let i = 0; i < booksFilter.children.length; i++) {
    for (let j = i; j < booksFilter.children.length; j++) {
      if (booksFilter.children[i].getAttribute('data-publisher') > booksFilter.children[j].getAttribute('data-publisher')) {
        replacedNode = booksFilter.replaceChild(booksFilter.children[j], booksFilter.children[i]);
        insertAfter(replacedNode, booksFilter.children[i]);
      };
    };
  };
};

function publisherSortDesc() {
  selectedSorting = "publishDesc";
  let booksFilter = document.querySelector('.book-selection__row');
  for (let i = 0; i < booksFilter.children.length; i++) {
    for (let j = i; j < booksFilter.children.length; j++) {
      if (booksFilter.children[i].getAttribute('data-publisher') < booksFilter.children[j].getAttribute('data-publisher')) {
        replacedNode = booksFilter.replaceChild(booksFilter.children[j], booksFilter.children[i]);
        insertAfter(replacedNode, booksFilter.children[i]);
      };
    };
  };
};

function priceSort() {
  selectedSorting = "price";
  let booksFilter = document.querySelector('.book-selection__row');
  for (let i = 0; i < booksFilter.children.length; i++) {
    for (let j = i; j < booksFilter.children.length; j++) {
      if (+booksFilter.children[i].getAttribute('data-price') > +booksFilter.children[j].getAttribute('data-price')) {
        replacedNode = booksFilter.replaceChild(booksFilter.children[j], booksFilter.children[i]);
        insertAfter(replacedNode, booksFilter.children[i]);
      };
    };
  };
};

function priceSortDesc() {
  selectedSorting = "priceDesc";
  let booksFilter = document.querySelector('.book-selection__row');
  for (let i = 0; i < booksFilter.children.length; i++) {
    for (let j = i; j < booksFilter.children.length; j++) {
      if (+booksFilter.children[i].getAttribute('data-price') < +booksFilter.children[j].getAttribute('data-price')) {
        replacedNode = booksFilter.replaceChild(booksFilter.children[j], booksFilter.children[i]);
        insertAfter(replacedNode, booksFilter.children[i]);
      };
    };
  };
};

function insertAfter(elem, refElem) {
  return refElem.parentNode.insertBefore(elem, refElem.nextSibleing);
};

function reverseSort() {
  if (selectedSorting === "popular") {
    popularSortDesc();
  } else if (selectedSorting === "popularDesc") {
    popularSort();
  } else if (selectedSorting === "publish") {
    publisherSortDesc();
  } else if (selectedSorting === "publishDesc") {
    publisherSort();
  } else if (selectedSorting === "price") {
    priceSortDesc();
  } else if (selectedSorting === "priceDesc") {
    priceSort();
  };
};

function listLengthCheck() {
  const bookList = document.querySelectorAll('.book-item--hidden');
  if (bookList) {
    const bookListLength = bookList.length;
    if (bookListLength == 0) {
      document.querySelector('.pages').classList.remove('pages--hidden');
      document.querySelector('.books-filter__not-found').classList.remove('books-filter__not-found--visible');
    } else if (bookListLength == 9) {
      document.querySelector('.pages').classList.add('pages--hidden');
      document.querySelector('.books-filter__not-found').classList.add('books-filter__not-found--visible');
    } else {
      document.querySelector('.pages').classList.add('pages--hidden');
      document.querySelector('.books-filter__not-found').classList.remove('books-filter__not-found--visible');
    };
  };
};


const checkDK = document.querySelector('.checkbox-detskayakniga');
const checkPol = document.querySelector('.checkbox-polandriya');
const books = document.querySelectorAll('.books-filter__item');

if (checkDK) {
  checkDK.addEventListener('change', function () {
    if (this.checked && checkPol.checked) {
      books.forEach(function (book) {
        book.classList.remove('book-item--hidden');
      });
    } else if (this.checked && !checkPol.checked) {
      books.forEach(function (book) {
        if (book.getAttribute('data-publisher') == "Detskayakniga" && book.classList.contains('book-item--hidden')) {
          book.classList.remove('book-item--hidden');
        } else if (book.getAttribute('data-publisher') == "Polandriya") {
          book.classList.add('book-item--hidden');
        }
      });
    } else if (!this.checked && !checkPol.checked) {
      books.forEach(function (book) {
        book.classList.remove('book-item--hidden');
      });
    } else if (!this.checked) {
      books.forEach(function (book) {
        if (book.getAttribute('data-publisher') == "Detskayakniga") {
          book.classList.add('book-item--hidden');
        }
      });
    };
    const bookList = document.querySelectorAll('.book-item--hidden');
    const bookListLength = bookList.length;
    if (bookListLength == 0) {
      document.querySelector('.pages').classList.remove('pages--hidden');
      document.querySelector('books-filter__not-found').classList.remove('books-filter__not-found--visible');
    } else if (bookListLength == 9) {
      document.querySelector('.pages').classList.add('pages--hidden');
      document.querySelector('books-filter__not-found').classList.add('books-filter__not-found--visible');
    } else {
      document.querySelector('.pages').classList.add('pages--hidden');
      document.querySelector('books-filter__not-found').classList.remove('books-filter__not-found--visible');
    };
  });
};

if (checkPol) {
  checkPol.addEventListener('change', function () {
    if (this.checked && checkDK.checked) {
      books.forEach(function (book) {
        book.classList.remove('book-item--hidden');
      });
    } else if (this.checked && !checkDK.checked) {
      books.forEach(function (book) {
        if (book.getAttribute('data-publisher') == "Polandriya" && book.classList.contains('book-item--hidden')) {
          book.classList.remove('book-item--hidden');
        } else if (book.getAttribute('data-publisher') == "Detskayakniga") {
          book.classList.add('book-item--hidden');
        }
      });
    } else if (!this.checked && !checkDK.checked) {
      books.forEach(function (book) {
        book.classList.remove('book-item--hidden');
      });
    } else if (!this.checked) {
      books.forEach(function (book) {
        if (book.getAttribute('data-publisher') == "Polandriya") {
          book.classList.add('book-item--hidden');
        }
      });
    };
    listLengthCheck;
  });

};


const addBtns = document.querySelectorAll('.add-btn');
const rmBtns = document.querySelectorAll('.rm-btn');
const booksAmountList = document.querySelectorAll('.item-amount');
const booksPriceList = document.querySelectorAll('.item-price');
const totalPrice = document.querySelector('.total-price__price');
let ItemsInCart;

if (addBtns) {
  addBtns.forEach(function (addBtn) {
    addBtn.addEventListener('click', function (e) {
      e.preventDefault();
      let newAmount;
      let btnId = addBtn.getAttribute('data-id');
      booksAmountList.forEach(function (booksAmount) {
        let itemId = booksAmount.getAttribute('data-id');
        if (itemId == btnId) {
          newAmount = +booksAmount.getAttribute('data-amount') + 1;
          booksAmount.setAttribute('data-amount', newAmount);
          booksAmount.innerHTML = newAmount;
        };
      });
      booksPriceList.forEach(function (booksPrice) {
        let itemId = booksPrice.getAttribute('data-id');
        if (itemId == btnId) {
          newCost = +booksPrice.getAttribute('data-price') * newAmount;
          booksPrice.setAttribute('data-cost', newCost)
          booksPrice.innerHTML = newCost + " ₽";
          let newTotalPrice = Number(totalPrice.getAttribute('data-total')) + Number(booksPrice.getAttribute('data-price'));
          totalPrice.setAttribute('data-total', newTotalPrice)
          totalPrice.innerHTML = newTotalPrice + " ₽";
        };
      });
    });
  });
};


if (rmBtns) {
  rmBtns.forEach(function (rmBtn) {
    rmBtn.addEventListener('click', function (e) {
      e.preventDefault();
      let newAmount;
      let btnId = rmBtn.getAttribute('data-id');
      booksAmountList.forEach(function (booksAmount) {
        let itemId = booksAmount.getAttribute('data-id');
        if (itemId == btnId) {
          if (Number(booksAmount.getAttribute('data-amount')) < 2) {
            const cartItems = document.querySelectorAll('.cart__item');
            ItemsInCart = cartItems.length;
            if (ItemsInCart < 2) {
              cartItems.forEach(function (cartItem) {
                cartItem.remove();
                let cartValue = +cartCounter.getAttribute('data-cartcount') - 1;
                cartCounter.setAttribute('data-cartcount', cartValue);
                cartCounter.classList.add('cart-count--hidden')
              });
              document.querySelector('.cart__wrapper').classList.add('cart__wrapper--hidden');
              document.querySelector('.empty-cart').classList.add('empty-cart--visible');
            } else {
              booksPriceList.forEach(function (booksPrice) {
                let itemId = booksPrice.getAttribute('data-id');
                if (itemId == btnId) {
                  let newTotalPrice = Number(totalPrice.getAttribute('data-total')) - Number(booksPrice.getAttribute('data-price'));
                  totalPrice.setAttribute('data-total', newTotalPrice)
                  totalPrice.innerHTML = newTotalPrice + " ₽";
                  cartItems.forEach(function (cartItem) {
                    let cartItemId = cartItem.getAttribute('data-id');
                    if (btnId == cartItemId) {
                      cartItem.remove();
                      let cartValue = +cartCounter.getAttribute('data-cartcount') - 1;
                      cartCounter.setAttribute('data-cartcount', cartValue);
                      cartCounter.innerHTML = cartValue;
                    }
                  });
                };
              });
            };
          } else {
            newAmount = +booksAmount.getAttribute('data-amount') - 1;
            booksAmount.setAttribute('data-amount', newAmount);
            booksAmount.innerHTML = newAmount;
            booksPriceList.forEach(function (booksPrice) {
              let itemId = booksPrice.getAttribute('data-id');
              if (itemId == btnId) {
                newCost = +booksPrice.getAttribute('data-price') * newAmount;
                booksPrice.setAttribute('data-cost', newCost)
                booksPrice.innerHTML = newCost + " ₽";
                let newTotalPrice = Number(totalPrice.getAttribute('data-total')) + Number(booksPrice.getAttribute('data-price'));
                totalPrice.setAttribute('data-total', newTotalPrice)
                totalPrice.innerHTML = newTotalPrice + " ₽";
              };
            });
          };
        };
      });
    });
  });
};



// IMG ZOOM
const smallImages = document.querySelectorAll('.small-image');

if (smallImages) {
  smallImages.forEach(function (smallImage) {
    smallImage.addEventListener('click', function () {
      smallImage.children[1].classList.add('modal--visible');
      document.querySelector('.modal-bg').classList.add('modal-bg--visible');
    });
  });
};

document.addEventListener('click', function (e) {
  let click = e.target.classList.value;
  if (click === 'modal-bg modal-bg--visible') {
    document.querySelector('.modal-bg').classList.remove('modal-bg--visible');
    let allImages = document.querySelectorAll('.zoom-img');
    allImages.forEach(function (image) {
      if (image.classList.contains('modal--visible')) {
        image.classList.remove('modal--visible');
      };
    });
  };
});

const searchBtn = document.querySelector('.top-header__nav-search');
const searchLine = document.querySelector('.top-header__nav-searchline');
const searchLink = document.querySelector('.search-line__search-ico');
const searchInput = document.querySelector('.search-line__input');

if (searchBtn) {
  searchBtn.addEventListener('click', function (e) {
    e.preventDefault();
    searchLine.classList.toggle('search-line--active');
  });
};

document.addEventListener('click', function (e) {
  let click = e.target.classList.value;
  if (click != 'top-header__nav-searchline' && click != 'top-header__nav-search-ico' && click != 'search-line__search-ico' && click != 'search-line__input' && click != 'search-line__label') {
    if (searchLine) {
      if (searchLine.classList.contains('search-line--active')) {
        searchLine.classList.remove('search-line--active');
      };
    };
  };
});

if (searchInput) {
  searchInput.addEventListener('keydown', function (e) {
    if (e.keyCode === 13 && searchInput.value != "") {
      window.location.href = 'search-results.html';
    };
  });
};


if (searchLine) {
  searchLink.addEventListener('click', function (e) {
    e.preventDefault();
    if (searchInput.value == "") {} else if (searchInput.value != "") {
      window.location.href = 'search-results.html';
    };
  });
};


const reSearchBtn = document.querySelector('.search-results__search-ico');
const reSearchInput = document.querySelector('.search-results__input');
const reSearchResults = document.querySelector('.search-results__searched-rs');


if (reSearchBtn) {
  reSearchBtn.addEventListener('click', function (e) {
    let reSearchResultsValue = reSearchResults.innerHTML;
    if (reSearchInput.value != "" && reSearchResultsValue != reSearchInput.value) {
      reSearchResults.innerHTML = reSearchInput.value;
    };
  });
};

if (reSearchInput) {
  reSearchInput.addEventListener('keydown', function (e) {
    let reSearchResultsValue = reSearchResults.innerHTML;
    if (e.keyCode === 13 && reSearchInput.value != "" && reSearchResultsValue != reSearchInput.value) {
      reSearchResults.innerHTML = reSearchInput.value;
    };
  });
};


//FORM VALIDATION 


function emailTest(input) {
  return /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(input.value);
}

function phoneTest(input) {
  return /^\+?[78][-\(]?\d{3}\)?-?\d{3}-?\d{2}-?\d{2}$/.test(input.value);
}

function formAddError(input) {
  input.classList.add('_error');
}

function formRemoveError(input) {
  input.classList.remove('_error');
}

const consultationForm = document.querySelector('.form__submit');

if (consultationForm) {
  consultationForm.addEventListener('click', function (e) {
    e.preventDefault();
    let error = 0;
    let formReq = document.querySelectorAll('._consult-req');
    formReq.forEach(function (input) {
      formRemoveError(input);
      if (input.classList.contains('_phone')) {
        if (phoneTest(input)) {

        } else {
          formAddError(input);
          error++;
        }
      } else if (input.classList.contains('_email')) {
        if (emailTest(input)) {

        } else {
          formAddError(input);
          error++;
        }
      } else {
        if (input.value === '') {
          formAddError(input);
          error++;

        }
      }
    });
    if (error === 0) {
      document.querySelector('.succeed-application').classList.add('modal--visible');
      document.querySelector('.modal-bg').classList.add('modal-bg--visible');
      document.querySelectorAll('._consult-req').forEach(function (input) {
        input.value = ''
      });
    };
  });
};

let elements = document.querySelectorAll('._phone');
if (elements) {
  for (let i = 0; i < elements.length; i++) {
    new IMask(elements[i], {
      mask: '+{7}(000)000-00-00',
    });
  };
};


const form = document.querySelector('.order-details__btn');

if (form) {
  form.addEventListener('click', function (e) {
    e.preventDefault();
    let error = 0;
    let formReq = document.querySelectorAll('._req');
    formReq.forEach(function (input) {
      if (input.classList.contains('dropdown__input-hidden')) {
        document.querySelector('.dropdown__button').classList.remove('_error');
        if (input.value === '') {
          document.querySelector('.dropdown__button').classList.add('_error');
          error++;
        }
      } else if (input.classList.contains('order-checkbox__inner')) {
        if (input.classList.contains('checkbox-pay')) {
          document.querySelector('.error-pay-radio').classList.remove('_error');
          let err = 0;
          document.querySelectorAll('.pay-input').forEach(function (radio) {
            if (radio.checked) {

            } else {
              err++;
            }
          })
          if (err === 7) {
            error++;
            document.querySelector('.error-pay-radio').classList.add('_error');
          }
        } else if (input.classList.contains('checkbox-delivery')) {
          document.querySelector('.error-delivery-radio').classList.remove('_error');
          let err = 0;
          document.querySelectorAll('.delivery-input').forEach(function (radio) {
            if (radio.checked) {

            } else {
              err++;
            }
          })
          if (err === 4) {
            error++;
            document.querySelector('.error-delivery-radio').classList.add('_error');
          }
        }
      } else {
        formRemoveError(input);
        if (input.classList.contains('_phone')) {
          if (phoneTest(input)) {

          } else {
            formAddError(input);
            error++;
          }
        } else if (input.classList.contains('_email')) {
          if (emailTest(input)) {

          } else {
            formAddError(input);
            error++;
          }
        } else {
          if (input.value === '') {
            formAddError(input);
            error++;

          }
        };
      };
    });
    if (error === 0) {
      window.location.href = 'succeed-order.html';
    };
  });
};

const payFormInputs = document.querySelectorAll('.pay-form__input');
if (payFormInputs) {
  payFormInputs.forEach(function (input) {
    input.addEventListener('keyup', function () {
      formRemoveError(input);
    });
  });
};


const countryInputs = document.querySelectorAll('.dropdown__list-item');

if (countryInputs) {
  countryInputs.forEach(function (countryInput) {
    countryInput.addEventListener('click', function () {
      document.querySelector('.dropdown__button').classList.remove('_error');
    });
  });
};