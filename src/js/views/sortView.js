import View from "./View.js";
import previewView from "./previewView.js";
import icons from "url:../../img/icons.svg";
import clickSortView from "./clickSortView.js";

class sortView extends View {
  _parentElement = document.querySelector(".sort-cont");
  _errorMessage = "No recipes found for your query! Please try again ;)";
  _success = "";
  _inputsort1 = document.querySelector(".sort1");

  renderSort() {
    const markup = this._generateMarkup();
    this._clear();
    this._parentElement.insertAdjacentHTML("afterbegin", markup);
    const sortBtn = document.querySelector(".Txt-icon");
    const dropmenu = document.querySelector(".dropmenu");
    const icon = document.querySelector(".rem-icon");
    const ings = document.querySelectorAll(".ings");
    const ing1 = document.querySelector(".ing1");
    const ing2 = document.querySelector(".ing2");
    const ingtxt1 = document.querySelector(".ing-txt1");
    const ingtxt2 = document.querySelector(".ing-txt2");
    const input = document.querySelector(".input");
    const input1 = document.querySelector(".input1");
    const input2 = document.querySelector(".input2");
    const inputsort1 = document.querySelector(".sort1");
    const inputsort2 = document.querySelector(".sort2");
    const box1 = input1.querySelector(".box1");
    const box2 = input2.querySelector(".box2");
    const shop = document.querySelector(".shoplist");
    const book = document.querySelector(".bookmarks");
    const copy = document.querySelector(".copyright");
    const media = window.matchMedia("(min-width: 1100px)");

    sortBtn.addEventListener("click", () => {
      icon.classList.toggle("rotate");
      dropmenu.classList.toggle("hide");
      copy.classList.toggle("display");
      if (media.matches) {
        if (!sortBtn.classList.contains("trans-left")) {
          sortBtn.classList.add("trans-left");
        } else {
          sortBtn.classList.remove("trans-left");
        }
      }
      if (!dropmenu.classList.contains("hide")) {
        const options = {
          threshold: 0.5,
        };
        const observer = new IntersectionObserver((entries, observer) => {
          entries.forEach((entry) => {
            entry.target.classList.toggle("show", entry.isIntersecting);
          });
        }, options);
        ings.forEach((ing) => observer.observe(ing));
        // console.log("seen");
      }
      // shop.classList.toggle("toggleHeight");
      // book.classList.toggle("toggleHeight2");
    });
    //  ..................

    // this._parentElement.addEventListener("submit", () => {
    //   let currno = "";
    //   const boxval = box1.value;
    //   const boxval2 = box2.value;
    //   if (boxval > 0 && boxval !== "") {
    //     currno = boxval;
    //     box1.value = "";
    //   } else console.log("not yet1");

    //   if (boxval2 > 0 && boxval2 !== "") {
    //     currno = boxval2;
    //     box2.value = "";
    //   } else console.log("not yet2");

    //   console.log(currno);
    // });

    this._openIng(ingtxt1, ing1, input1, input2, box2);
    this._openIng(ingtxt2, ing2, input2, input1, box1);
    this._closeIng(inputsort1, input1);
    this._closeIng(inputsort2, input2, false);
    // this._bothcloses(inputsort1, input1, inputsort2, input2);
    // if (shop.classList.contains("toggleHeight")) {
    //   shop.classList.remove("toggleHeight");
    // }
    // else shop.classList.add("toggleHeight");
  }
  _openIng(El1, El2, El3, opp, box) {
    El1.addEventListener("click", () => {
      El1.style.padding = "0";
      El2.style.padding = "1rem 0 1rem 0 ";
      box.value = "";
      El3.classList.remove("hide");
      opp.classList.add("hide");
      // console.log("txt");
    });
  }
  _closeIng(El1, El2, boxz, El3 = true) {
    return El1.addEventListener("click", () => {
      const box = El3 ? El2.querySelector(".box1") : El2.querySelector(".box2");
      const left = document.querySelector(".search-results");
      const newres = document.querySelector(".newresult");
      newres.style.flexDirection = "row";
      newres.style.justifyContent = "center";
      newres.style.paddingBottom = "7rem";
      newres.style.gap = "0.5rem";
      left.style.left = "-100rem";

      // document.location.reload();

      // boxz.value = "";
      // El2.classList.add("hide");
      return box;
    });
  }
  //  close was here
  addhandlergetnoIngTime(handler) {
    this._parentElement.addEventListener("submit", (e) => {
      e.preventDefault();

      handler();
    });
  }
  _generateMarkup() {
    return `
  <div class="sort">
    <button class="Txt-icon">
      <div class="nav-inner">
    <i class="ri-filter-3-fill remicon1"></i>
      <span class="span-txt"> filter </span>
      <i class="ri-arrow-drop-up-fill rem-icon"></i>
      </div>
    </button>
    <span class="dropmenu hide">
      <div class="ings ing1 close">
        <p class="ing-txt1 ing-ell">By no of Ingredients</p>
        <div class="input input1 hide">
          <input class="box1" type="number" min="1"/>
          <button class="sort-btn sort1">Sort</button>
        </div>
      </div>
      <div class="ings ing2 close">
        <p class="ing-txt2 ing-ell">By cook-time/duration</p>
        <div class="input input2 hide">
          <input class="box2" type="number" min="1"/>
          <button class="sort-btn sort2">Sort</button>
        </div>
      </div>
    </span>
  </div>`;
  }
  //   _addhandlerShowInputs(){

  //   }
}
export default new sortView();
