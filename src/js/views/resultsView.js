import View from "./View.js";
import previewView from "./previewView.js";
import icons from "url:../../img/icons.svg";

class ResultsView extends View {
  _parentElement = document.querySelector(".newresult");
  _errorMessage = "No recipes found for your query! Please try again ;)";
  _success = "";

  _generateMarkup() {
    return this._data.map(this._generateMarkupPrev).join("");
    // return this._data.map(preview => previewView.render(preview, false, false)).join('');
  }
  // _addhandlerLazyLoad(handler) {
  //   this._parentElement.addEventListener("load", (e) => {
  //     const btn = e.target.closest(".lazy-img");
  //     if (!btn) return;
  //     handler();
  //   });
  // }
  _generateMarkupPrev(result) {
    const id = window.location.hash.slice(1);
    return `
    <li class="preview inter-preview">
        <a class="preview__link ${
          result.id === id ? "preview__link--active" : ""
        }" href="#${result.id}">
          <figure class="preview__fig lazy">
            <img src="${result.image}" alt="${result.title}" class="lazyImg "/>
          </figure>
          <div class="preview__data">
            <h4 class="preview__title">${result.title}</h4>
            <p class="preview__publisher">${result.publisher}</p>
            <div class="preview__user-generated ${result.key ? "" : "hidden"}">
              <svg>
              <use href="${icons}#icon-user"></use>
              </svg>
            </div>
          </div>
        </a>
      </li>`;
  }
  addHandlerAddBookmark(handler, butn) {
    this._parentElement.addEventListener("click", function (e) {
      const btn = e.target.closest(butn);
      if (!btn) return;
      handler();
    });
  }
}

export default new ResultsView();
