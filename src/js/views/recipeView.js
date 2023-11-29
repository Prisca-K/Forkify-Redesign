import View from "./View.js";

import icons from "url:../../img/icons.svg";
import fracty from "fracty";
class RecipeView extends View {
  _parentElement = document.querySelector(".recipe");
  _errorMessage = "We could not find that recipe. Please try another one!";
  _success = "";

  _window = document.querySelector(".recipe-window");
  _overlay2 = document.querySelector(".overlay1");
  _btnCloser = document.querySelector(".modee");
  _btnCloser = document.querySelector(".modee");
  _prevRecipe = document.querySelector(".prev-recipe");
  _prevRecipeSm = document.querySelector(".prev-recipe-sm");
  addHandlerRender(handler) {
    ["hashchange", "load"].forEach((ev) =>
      window.addEventListener(ev, handler)
    );
  }

  addHandlerUpdateServings(handler) {
    this._parentElement.addEventListener("click", function (e) {
      const btn = e.target.closest(".btn--update-servings");
      if (!btn) return;
      const { updateTo } = btn.dataset;
      if (+updateTo > 0) handler(+updateTo);
    });
  }

  addHandlerAddBookmark(handler) {
    this._parentElement.addEventListener("click", function (e) {
      const btn = e.target.closest(".btn--bookmark");
      if (!btn) return;
      handler();
    });
  }
  addHandlerAddShoplist(handler) {
    this._parentElement.addEventListener("click", function (e) {
      const btn = e.target.closest(".btn-shop-list");
      if (!btn) return;
      const addmodal = document.querySelector(".addShop");
      addmodal.style.right = "0";
      setTimeout(() => {
        addmodal.style.right = "-100rem";
      }, 1500);

      handler();
    });
  }

  _generateMarkup() {
    return `
      <figure class="recipe__fig">
        <img src="${this._data.image}" alt="${
      this._data.title
    }" class="recipe__img" />
        <h1 class="recipe__title">
          <span>${this._data.title}</span>
        </h1>
      </figure>
      <div class="detail-cont">
      <div class="recipe__details">
      <div class="infos">
        <div class="recipe__info">
          <svg class="recipe__info-icon">
            <use href="${icons}#icon-clock"></use>
          </svg>
          <span class="recipe__info-data recipe__info-data--minutes">${
            this._data.cookingTime
          }</span>
          <span class="recipe__info-text">minutes</span>
        </div>
        <div class="recipe__info">
          <svg class="recipe__info-icon">
            <use href="${icons}#icon-users"></use>
          </svg>
          <span class="recipe__info-data recipe__info-data--people">${
            this._data.servings
          }</span>
          <span class="recipe__info-text">servings</span>

          <div class="recipe__info-buttons">
            <button class="btn--tiny btn--update-servings" data-update-to="${
              this._data.servings - 1
            }">
              <svg>
                <use href="${icons}#icon-minus-circle"></use>
              </svg>
            </button>
            <button class="btn--tiny btn--update-servings" data-update-to="${
              this._data.servings + 1
            }">
              <svg>
                <use href="${icons}#icon-plus-circle"></use>
              </svg>
            </button>
          </div>
        </div>
        </div>

        <div class="recipe__user-generated ${this._data.key ? "" : "hidden"}">
          <svg>
            <use href="${icons}#icon-user"></use>
          </svg>
        </div>
        <button class="btn--round btn-shop-list">
        <i class="ri-shopping-cart-2-line"></i>
        </button>
        <button class="btn--round btn--bookmark">
          <svg class="">
            <use href="${icons}#icon-bookmark${
      this._data.bookmarked ? "-fill" : ""
    }"></use>
          </svg>
        </button>
        
      </div>
      
      <div class="recipe__ingredients">
        <h2 class="heading--2"> ${
          this._data.ingredients.length
        } Ingredients</h2>
        <ul class="recipe__ingredient-list">
          ${this._data.ingredients.map(this._generateMarkupIngredient).join("")}
      </div>
     

      
      <div class="recipe__directions">
        <h2 class="heading--2">How to cook it</h2>
        <p class="recipe__directions-text">
          This recipe was carefully designed and tested by
          <span class="recipe__publisher">${
            this._data.publisher
          }</span>. Please check out
          directions at their website.
        </p>
        <a
          class="btn--small recipe__btn"
          href="${this._data.sourceUrl}"
          target="_blank"
        >
          <span>Directions</span>
          <svg class="search__icon">
            <use href="${icons}#icon-arrow-right"></use>
          </svg>
        </a>
      </div>
      </div>
      `;
  }

  _generateMarkupIngredient(ing) {
    return `
    <li class="recipe__ingredient">
      <svg class="recipe__icon">
        <use href="${icons}#icon-check"></use>
      </svg>
      <div class="recipe__quantity">${
        ing.quantity ? fracty(ing.quantity).toString() : ""
      }</div>
      <div class="recipe__description">
        <span class="recipe__unit">${ing.unit}</span>
        ${ing.description}
      </div>
    </li>
  `;
  }

  constructor() {
    super();
    this._addHandlerHideWindow2();
  }

  toggleWindow2() {
    this._overlay2.classList.toggle("hidden");
    this._window.classList.toggle("hidden");
    this._prevRecipe.classList.remove("trans-left");
  }
  toggleWindow21() {
    this._overlay2.classList.remove("hidden");
    this._window.classList.remove("hidden");
    if (!this._prevRecipe.classList.contains("trans-left")) {
      this._prevRecipe.classList.add("trans-left");
    } else {
      this._prevRecipe.classList.remove("trans-left");
    }
  }

  _addHandlerHideWindow2() {
    console.log(this._btnCloser);
    this._btnCloser.addEventListener("click", this.toggleWindow2.bind(this));
    this._overlay2.addEventListener("click", this.toggleWindow2.bind(this));
    this._prevRecipe.addEventListener("click", this.toggleWindow21.bind(this));
    this._prevRecipeSm.addEventListener(
      "click",
      this.toggleWindow21.bind(this)
    );
    const headbtn = document.querySelector(".header__logorec1");
    const headbtn2 = document.querySelector(".header__logorec2");
    const logoimgs = document.querySelector(".logo-imgsrec");
    headbtn.classList.add("animate");
    if (headbtn.classList.contains("animate")) {
      console.log("time");
      setTimeout(() => {
        headbtn2.style.left = "0";
        logoimgs.style.width = "18rem";
      }, 1000);
    }
  }
}

export default new RecipeView();
