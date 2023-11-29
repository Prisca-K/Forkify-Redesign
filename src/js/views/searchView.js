import View from "./View";

class SearchView extends View {
  _parentElement = document.querySelector(".search");
  _errorMessage = "No recipe found for your query! Please try again :)";

  getQuery() {
    const query = this._parentElement.querySelector(".search__field").value;
    this._clearInput();
    if (!query) {
      throw new Error("No recipe found for your query! Please try again :)");
    }
    return query;
  }

  _clearInput() {
    this._parentElement.querySelector(".search__field").value = "";
  }

  addHandlerSearch(handler) {
    this._parentElement.addEventListener("submit", function (e) {
      e.preventDefault();
      const left = document.querySelector(".search-results");
      const overlaycont = document.querySelector(".resultcont");
      overlaycont.classList.remove("overresult");
      const newres = document.querySelector(".newresult");
      newres.style.gap = "0.5rem";
      left.style.left = "-100rem";
      newres.style.flexDirection = "row";
      newres.style.justifyContent = "center";
      newres.style.paddingBottom = "7rem";
      // gap: 0.5rem;
      // justify-content: center;
      // padding-bottom: 8rem;
      // flex-direction: column;
      handler();
    });
  }
  // addloadHandler(handler) {
  //   this._parentElement.addEventListener("load", function (e) {
  //     e.preventDefault();
  //     handler();
  //   });
  // }
}

export default new SearchView();
