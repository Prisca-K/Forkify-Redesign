import * as model from "./model.js";
import { MODAL_CLOSE_SEC } from "./config.js";
import recipeView from "./views/recipeView.js";
import searchView from "./views/searchView.js";
import paginationView from "./views/paginationView.js";
import bookmarksView from "./views/bookmarksView.js";
import addRecipeView from "./views/addRecipeView.js";
import resultsView from "./views/resultsView.js";
import shoplistView from "./views/shoplistView.js";
import homeView from "./views/homeView.js";
// import 'core-js/stable';
// import 'regenerator-runtime/runtime';
import { async } from "regenerator-runtime";
import sortView from "./views/sortView.js";
import clickSortView from "./views/clickSortView.js";

// if (module.hot) {
//   module.hot.accept();
// }

window.onload = function () {
  const loadererr = document.querySelector(".loader-errortxt");
  const mainBody = document.querySelector(".forkify");
  const loader = document.querySelector(".page-loader");
  const headbtn = document.querySelector(".header__logo1");
  const headbtn2 = document.querySelector(".header__logo2");
  const logoimgs = document.querySelector(".logo-imgs ");
  const recipewind = document.querySelector(".logo-imgs ");
  var that = new XMLHttpRequest();
  that.open("GET", "https://forkify-api.herokuapp.com", false);
  try {
    that.send();
    console.log(that.status);
  } catch (exception) {
    if (exception.name === "NetworkError") {
      console.log(that.status);

      loadererr.innerHTML =
        "Please check your network connection and try again !";
      loadererr.style.textAlign = "center";
      console.log("There was a network error.");

      throw {
        name: "NetworkError",
        message: "A network error occurred.",
      };
    } else {
      loadererr.style.display = "none";
    }
  }
  console.log("loaded");
  setTimeout(() => {
    document.body.classList.remove("page-loader");
    model.sliders();
    mainBody.style.display = "block";
    loader.style.display = "none";
    headbtn.classList.add("animate");
    if (headbtn.classList.contains("animate")) {
      setTimeout(() => {
        headbtn2.classList.add("forkleft");
        logoimgs.classList.add("forkwidth");
      }, 1000);
    }
  }, 1000);
};
model.darkMode();
model.offcanvas();
const controlRecipes = async function () {
  try {
    const id = window.location.hash.slice(1);
    if (!id) return;
    const recipemodal = document.querySelector(".recipe-window");
    const overlay1 = document.querySelector(".overlay1");
    recipemodal.classList.remove("hidden");
    overlay1.classList.remove("hidden");
    recipeView.renderSpinner();
    // 0) Update results view to mark selected search result
    // model.intersectApi(); /* for bookmark */
    // lazyLoad();
    // resultsView.update(model.getSearchResultsPage());
    resultsView.update(model.getSearchResultsPage(null, true, lazyLoad()));

    // 1) Updating bookmarks view
    bookmarksView.update(model.state.bookmarks);

    // 2) Loading recipe
    await model.loadRecipe(id);

    // 3) Rendering recipe
    recipeView.render(model.state.recipe);
    // model.sorter();
  } catch (err) {
    recipeView.renderError(err);
    // console.error(err);
  }
};
const controlRecipes2 = async function () {
  try {
    const id = window.location.hash.slice(1);

    if (!id) return;
    const recipemodal = document.querySelector(".recipe-window");
    const overlay1 = document.querySelector(".overlay1");
    recipemodal.classList.remove("hidden");
    overlay1.classList.remove("hidden");
    recipeView.renderSpinner();
    // 0) Update results view to mark selected search result
    // model.intersectApi(); /* for bookmark */
    // resultsView.update(model.getSearchResultsPagesort());

    // 1) Updating bookmarks view
    bookmarksView.update(model.statesort.bookmarks);

    // 2) Loading recipe
    await model.loadRecipe(id);

    // 3) Rendering recipe
    recipeView.render(model.state.recipe);
    // model.sorter();
  } catch (err) {
    recipeView.renderError(err);
    // console.error(err);
  }
};
const lazyLoad = function () {
  const targ = document.querySelectorAll(".preview__fig");
  targ.forEach((t) => {
    const de = t.querySelector(".lazyImg");
    // console.log(de);
    if (de) {
      de.addEventListener("load", () => {
        console.log("loaded");
        t.classList.remove("lazy");
      });
    }
  });
};

const controlSearchResults = async function () {
  try {
    const searchnameham = document.querySelector(".searchnameham");
    const searchname = document.querySelector(".searchname");
    const book = document.querySelector(".bookmarks");
    book.classList.remove("show");
    paginationView._clear();
    resultsView.renderSpinner();
    searchnameham.innerHTML = "";
    searchname.innerHTML = "";
    // 1) Get search query
    const query = searchView.getQuery();
    if (!query) return;
    // 2) Load search results
    await model.loadSearchResults(query);
    // 3) Render results
    resultsView.render(model.getSearchResultsPage());
    // sortView.renderSort(); /* render sort */
    lazyLoad();

    // 4) Render initial pagination buttons
    paginationView.render(model.state.search);
    model.intersectApi(); /* for result */
  } catch (err) {
    resultsView.renderError(err);
    console.log(err);
  }
};
const controlQuickSearch = async function () {
  try {
    const book = document.querySelector(".bookmarks");
    const searchBoxes = document.querySelectorAll(".boxImgTxt");
    searchBoxes.forEach((box) => {
      const boxTxt = box.querySelector(".box-text");
      // console.log(boxTxt.innerHTML);
      box.addEventListener("click", async () => {
        try {
          const newres = document.querySelector(".newresult");
          newres.style.flexDirection = "row";
          newres.style.justifyContent = "center";
          newres.style.paddingBottom = "4rem";
          newres.style.gap = "0.5rem";
          book.classList.remove("show");
          paginationView._clear();
          resultsView.renderSpinner();

          // 1) Get search query
          const query = boxTxt.innerHTML;
          console.log(query);
          if (!query) return;

          // 2) Load search results
          await model.loadSearchResults(query);
          // 3) Render results
          resultsView.render(model.getSearchResultsPage());
          // sortView.renderSort(); /* render sort */
          lazyLoad();

          // 4) Render initial pagination buttons
          paginationView.render(model.state.search);
          model.intersectApi(); /* for result */
        } catch (err) {
          resultsView.renderError(err);
          console.log(err);
        }
      });
    });
  } catch (err) {
    resultsView.renderError(err);
    console.log(err);
  }
};

const controlPagination = function (goToPage) {
  // 1) Render NEW results
  resultsView.render(model.getSearchResultsPage(goToPage));

  // 2) Render NEW pagination buttons
  paginationView.render(model.state.search);
  model.intersectApi(); /* for result */
  lazyLoad();
};

const controlServings = function (newServings) {
  // Update the recipe servings (in state)
  model.updateServings(newServings);

  // Update the recipe view
  recipeView.update(model.state.recipe);
};

const controlAddBookmark = function () {
  // 1) Add/remove bookmark
  if (!model.state.recipe.bookmarked) {
    model.addBookmark(model.state.recipe);
    const addmodal = document.querySelector(".addBook");
    addmodal.style.right = "0";
    setTimeout(() => {
      addmodal.style.right = "-100rem";
    }, 1500);
  } else {
    model.deleteBookmark(model.state.recipe.id);
    const addmodal = document.querySelector(".remBook");
    addmodal.style.right = "0";
    setTimeout(() => {
      addmodal.style.right = "-100rem";
    }, 1500);
  }

  // 2) Update recipe view
  recipeView.update(model.state.recipe);

  // 3) Render bookmarks
  bookmarksView.render(model.state.bookmarks);
};

const controlBookmarks = function () {
  const bookList = document.querySelector(".bookmarks__list");
  if (model.state.bookmarks.length > 8) {
    bookList.style.overflowY = "scroll";
    console.log("greater");
  } else bookList.style.overflowY = "hidden";
  bookmarksView.render(model.state.bookmarks);
};
const controlAddShoplist = function () {
  /*  if (!model.state.recipe.shoplisted) */
  // console.log(title);
  model.state.recipe.ingredients.forEach((ing) => {
    model.addShoplist(ing);
  });
  // console.log(model.state.shoplist);

  // recipeView.update(model.state.recipe);
  overflow();
  shoplistView.render(model.state.shoplist);
};

const controlDeleteShoplist = function (id) {
  console.log("tester");
  model.deleteShoplist(id);
  overflow();
};
const overflow = function () {
  const shoplist = document.querySelector(".shoplist__list");
  if (model.state.shoplist.length > 5) {
    shoplist.style.overflowY = "scroll";
  } else {
    shoplist.style.overflowY = "hidden";
  }
};
const controlshoplist = function () {
  overflow();
  shoplistView.render(model.state.shoplist);
};
const controlChecker = function (id) {
  // model.addShoplist(ing);

  model.checkadd(id);
  // console.log(model.state.shoplist.checker);
  // if (model.state.shoplist.checker === true) {
  //   model.checkrem(id);
  //  }
  //  if (model.state.shoplist.checker === true) {
  //   model.checkrem(id);
  //  }
  // else {
  //   model.checkrem(id);
  // }
  // model.checker(id);
};
const controlSort = function () {
  sortView.renderSort();
  const input1 = document.querySelector(".input1");
  const box1 = input1.querySelector(".box1");
  console.log(box1);
  // window.location.reload();
};
controlSort();
const controlgetIngTime = function () {
  const input1 = document.querySelector(".input1");
  const input2 = document.querySelector(".input2");
  const box1 = input1.querySelector(".box1");
  const box2 = input2.querySelector(".box2");
  let currno = "";
  const boxval = box1.value;
  const boxval2 = box2.value;
  const checkno = function () {
    if (boxval > 0 && boxval !== "") {
      console.log(boxval, "ing");
      // box1.value = "";
      return (async function () {
        const id = model.state.recipe.id;
        try {
          const book = document.querySelector(".bookmarks");
          book.classList.remove("show");
          paginationView._clear();
          resultsView.renderSpinner();

          // 1) Get search query
          const query = searchView.getQuery();
          if (!query) return;
          for (let i = 0; i < 2; i++) {
            // 2) Load search results
            await model.loadSearchResultsSort(query, Number(boxval));
            // 3) Render results

            console.log(model.statesort.search.results);
            resultsView.renderSpinner();
            resultsView.render(model.getSearchResultsPagesort());
            lazyLoad();
            model.statesort.keeprec = [];

            // repeat spinner before result
            if (i === 0) {
              resultsView.renderSpinner();
            } else return;

            console.log(i);
          }
          paginationView.render(model.statesort.search);
          model.intersectApi(); /* for result */
        } catch (err) {
          resultsView.renderError(err);
          console.log(err);
          throw err;
        }
        console.log("got it");
        // }
      })();
    }
    // Sort By duration
    else if (boxval2 > 0 && boxval2 !== "") {
      console.log(boxval2, "dur");
      // box1.value = "";
      return (async function () {
        const id = model.state.recipe.id;
        try {
          const book = document.querySelector(".bookmarks");
          book.classList.remove("show");
          paginationView._clear();
          resultsView.renderSpinner();

          // 1) Get search query
          const query = searchView.getQuery();
          if (!query) return;
          for (let i = 0; i < 2; i++) {
            // 2) Load search results
            await model.loadSearchResultsSort(query, Number(boxval2), false);
            // 3) Render results

            console.log(model.statesort.search.results);
            resultsView.renderSpinner();
            resultsView.render(model.getSearchResultsPagesort());
            model.statesort.keeprec = [];

            // repeat spinner before result
            if (i === 0) {
              resultsView.renderSpinner();
            } else return;

            console.log(i);
          }
          paginationView.render(model.statesort.search);
          model.intersectApi(); /* for result */
        } catch (err) {
          resultsView.renderError(err);
          console.log(err);
          throw err;
        }
        console.log("got it");
        // }
      })();
    } else console.log("not yet all");
  };
  checkno();
};
const controlAddRecipe = async function (newRecipe) {
  try {
    // Show loading spinner
    addRecipeView.renderSpinner();

    // Upload the new recipe data
    await model.uploadRecipe(newRecipe);
    console.log(model.state.recipe);

    // Render recipe
    recipeView.render(model.state.recipe);

    // Success message
    addRecipeView.renderMessage();

    // Render bookmark view
    bookmarksView.render(model.state.bookmarks);

    // Change ID in URL
    window.history.pushState(null, "", `#${model.state.recipe.id}`);

    // Close form window
    setTimeout(function () {
      addRecipeView.toggleWindow();
    }, MODAL_CLOSE_SEC * 1000);
  } catch (err) {
    console.error("💥", err);
    addRecipeView.renderError(err.message);
  }
};
const controlHome = function () {
  window.location.reload();
};
const init = function () {
  // resultsView._addhandlerLazyLoad(controlLazyLoad);
  controlQuickSearch();
  shoplistView.addHandlerRender(controlshoplist);
  shoplistView.addchecker(controlChecker);
  bookmarksView.addHandlerRender(controlBookmarks);
  shoplistView.addHandlerDeleteShoplist(controlDeleteShoplist);
  recipeView.addHandlerRender(controlRecipes);
  recipeView.addHandlerRender(controlRecipes2);
  recipeView.addHandlerUpdateServings(controlServings);
  recipeView.addHandlerAddShoplist(controlAddShoplist);
  recipeView.addHandlerAddBookmark(controlAddBookmark);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerClick(controlPagination);
  addRecipeView.addHandlerUpload(controlAddRecipe);
  // searchView.addHandlerSearch(controlSort);
  sortView.addhandlergetnoIngTime(controlgetIngTime);
};
init();
