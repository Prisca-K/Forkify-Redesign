import View from "./View.js";
import previewView from "./previewView.js";
import icons from "url:../../img/icons.svg";
class BookmarksView extends View {
  _parentElement = document.querySelector(".bookmarks__list");
  _errorMessage = "No bookmarks yet. Find a nice recipe and bookmark it ;)";
  _success = "";
  _bookOpener = document.querySelector(".nav__btn--bookmarks");
  _book = document.querySelector(".bookmarks");
  addHandlerRender(handler) {
    window.addEventListener("load", handler);
  }

  _generateMarkup() {
    return this._data
      .map((bookmark) => previewView.render(bookmark, false))
      .join("");
  }
  constructor() {
    super();
    this._addHandlerShowWindow3();
    // this._addHandlerHideWindow();
  }

  toggleWindow3() {
    this._book.classList.toggle("show");
    const shop = document.querySelector(".shop");
    if (!this._bookOpener.classList.contains("trans-left")) {
      this._bookOpener.classList.add("trans-left");
    } else {
      this._bookOpener.classList.remove("trans-left");
    }
  }

  _addHandlerShowWindow3() {
    this._bookOpener.addEventListener("click", this.toggleWindow3.bind(this));
    // this._book.style.top = "-23.5rem";
  }

  _addHandlerHideWindow() {
    this._btnClose.addEventListener("click", this.toggleWindow3.bind(this));
    this._overlay.addEventListener("click", this.toggleWindow3.bind(this));
  }
}

export default new BookmarksView();
