import View from "./View.js";
import previewView from "./previewView.js";
import icons from "url:../../img/icons.svg";
import fracty from "fracty";

class shoplistView extends View {
  _parentElement = document.querySelector(".shoplist__list");
  _errorMessage = `No items yet. Find a nice recipe and add it's ingredients
  to your list :)`;
  _success = "";
  _shopOpener = document.querySelector(".shopperBtn");
  _shop = document.querySelector(".shoplist");
  _closeShop = document.querySelector(".closeShop");
  _closeShop2 = document.querySelector(".shopcloser2");
  _overlay2 = document.querySelector(".resultcont");
  _closeList = document.querySelector(".delList");

  addHandlerRender(handler) {
    window.addEventListener("load", handler);
  }
  addHandlerDeleteShoplist(handler) {
    this._parentElement.addEventListener("click", function (e) {
      const id = e.target.closest(".shopperItem").dataset.itemid;
      if (e.target.matches(".delList, .delList *")) {
        // Delete from state
        const yesmodal = document.querySelector(".yesmodal");
        const yesbtn = document.querySelector(".yesbtn");
        const shopListList = document.querySelector(".shoplist");
        shopListList.classList.add("overshop2");
        yesmodal.style.opacity = "1";
        yesbtn.addEventListener("click", function () {
          handler(id);
          yesmodal.style.opacity = "0";
          shopListList.classList.remove("overshop2");
        });
      }
    });
  }
  addchecker(handler) {
    let ima = true;
    this._parentElement.addEventListener("click", function (e) {
      const id = e.target.closest(".shopperItem").dataset.itemid;
      if (e.target.matches(".checkbox, .checkbox *")) {
        // Delete from state
        // if (ima) {
        //   console.log("seen");
        // }

        handler(id);
      }
    });
  }
  // _addhandlercheck(){
  //   const check = document.querySelector(".shoplist__list");
  //   console.log(check);
  //   check.addEventListener("click", (e) => {
  //     const btn = e.target.closest("deList");
  //  if(!btn)return;
  //     state.checked = true;
  //     localStorage.setItem("checkmark", JSON.stringify(state.checked));

  //   });
  // }
  _generateMarkup() {
    return this._data.map(this._generateMarkupPrev).join("");
  }
  _generateMarkupPrev(ing) {
    return `
    <li class="shopperItem" data-itemid=${ing.id}>
      <div class="listPack">
        <label class="checkbox">
          <input class="checker" type="checkbox" ${
            ing.checked ? "checked" : ""
          }/>
          <span class="checkmark"></span>
        </label>
        <div class="list-item">
          <div class="list-item-inner">
            <div class="quant-unit">
              <!-- <input type="number" value="5" /> -->
              <span>${
                ing.quantity ? fracty(ing.quantity).toString() : ""
              }</span>
              <span>${ing.unit}</span>
            </div>
            <p>
            ${ing.description}
            </p>
          </div>
          <button class="delList">&times;</button>
        </div>
      </div>
    </li>
  `;
  }
  constructor() {
    super();
    this._addHandlerShowWindow4();
    // this._addHandlerHideWindow4();
  }

  toggleWindow4() {
    this._shop.classList.add("show");
    this._overlay2.classList.add("overshop");
    if (!this._shopOpener.classList.contains("trans-left")) {
      this._shopOpener.classList.add("trans-left");
    } else {
      this._shopOpener.classList.remove("trans-left");
    }
  }

  _addHandlerShowWindow4() {
    this._shopOpener.addEventListener("click", this.toggleWindow4.bind(this));
    // this._shop.style.left = "28rem";
    this._closeShop.addEventListener("click", () => {
      this._shop.classList.remove("show");
      this._overlay2.classList.remove("overshop");
      this._shopOpener.classList.remove("trans-left");
    });
    this._closeShop2.addEventListener("click", () => {
      this._shop.classList.remove("show");
      this._overlay2.classList.remove("overshop");
      this._shopOpener.classList.remove("trans-left");
      S;
    });
  }

  _addHandlerHideWindow4() {
    // this._btnClose.addEventListener("click", this.toggleWindow3.bind(this));
    // this._overlay.addEventListener("click", this.toggleWindow3.bind(this));
  }
}

export default new shoplistView();
