import { async } from "regenerator-runtime";
import { API_URL, PER_PAGE, KEY } from "./config.js";
import { AJAX } from "./helper.js";
import uniqid from "uniqid";

export const state = {
  recipe: {},
  recipe2: {},
  search: {
    query: "",
    results: [],
    // results: [],
    // results3: [],
    page: 1,
    resultsPerPage: PER_PAGE,
  },
  bookmarks: [],
  shoplist: [],
  checked: false,
};
export const statesort = {
  recipe2: {},
  keeprec: [],
  search: {
    query: "",
    results: [],
    page: 1,
    resultsPerPage: PER_PAGE,
  },
  bookmarks: [],
  shoplist: [],
};

const createRecipeObject = function (data) {
  const { recipe } = data.data;
  return {
    id: recipe.id,
    title: recipe.title,
    publisher: recipe.publisher,
    sourceUrl: recipe.source_url,
    image: recipe.image_url,
    servings: recipe.servings,
    cookingTime: recipe.cooking_time,
    ingredients: recipe.ingredients,
    ...(recipe.key && { key: recipe.key }),
  };
};
const createId = function (data) {
  const { recipe } = data.data;
  return {
    id: recipe.id,
    ingredients: recipe.ingredients,
  };
};
export const loadRecipe = async function (id) {
  try {
    const data = await AJAX(`${API_URL}${id}?key=${KEY}`);
    state.recipe = createRecipeObject(data);

    if (state.bookmarks.some((bookmark) => bookmark.id === id))
      state.recipe.bookmarked = true;
    else state.recipe.bookmarked = false;

    console.log(state.recipe);
  } catch (err) {
    // Temp error handling
    err = "TypeError: Failed to Fetch"
      ? (err = `Connection failed! Please check your connection and Try again :)`)
      : (err = err);
    // console.error(`${err} 💥💥💥💥`);
    throw err;
  }
};
// export const loadRecipe2 = async function (id, value) {
//   try {
// const loaddata = await AJAX(`${API_URL}${id}?key=${KEY}`);
// state.recipe2 = createId(loaddata);
// if (value === state.recipe2.ingredients.length) {
//   console.log("Equal");
//   console.log(state.recipe2.ingredients.length);
//   console.log(value === state.recipe2.ingredients.length);
//   console.log(state.recipe2.id);
//   return state.recipe2.id;
// }

// if (state.bookmarks.some((bookmark) => bookmark.id === id))
//   state.recipe2.bookmarked = true;
// else state.recipe2.bookmarked = false;
// // console.log(state.recipe2);
//   } catch (err) {
//     // Temp error handling
//     err = "TypeError: Failed to Fetch"
//       ? (err = `Connection failed! Please check your connection and Try again :)`)
//       : (err = err);
//     console.error(`${err} 💥💥💥💥`);
//     throw err;
//   }
// };

// loadseaerch main1111111.........................
export const loadSearchResults = async function (query) {
  try {
    state.search.query = query;

    const data = await AJAX(`${API_URL}?search=${query}&key=${KEY}`);
    console.log(data);
    console.log(state.search.results);
    state.search.results = data.data.recipes.map((rec) => {
      return {
        id: rec.id,
        title: rec.title,
        publisher: rec.publisher,
        image: rec.image_url,
        ...(rec.key && { key: rec.key }),
      };
    });

    state.search.page = 1;
    const searchname = document.querySelector(".searchname");
    const searchnameham = document.querySelector(".searchnameham");
    const modquery = query.charAt(0).toUpperCase() + query.slice(1);
    console.log(query[0]);
    searchname.innerHTML = `Searches for ${modquery}`;
    searchnameham.innerHTML = `Searches for ${modquery}`;
    const newres = document.querySelector(".newresult");
  } catch (err) {
    err = "TypeError: Failed to Fetch"
      ? (err =
          "Connection failed! Please check your connection and Try again :)")
      : (err = err);
    console.error(`${err} 💥💥💥💥`);
    throw err;
  }
};
// end load searchmain111111111111.................

export const loadSearchResultsSort = async function (query, value, ing = true) {
  try {
    state.search.query = query;
    const data = await AJAX(`${API_URL}?search=${query}&key=${KEY}`);
    console.log(data.data.recipes);
    const val = value;
    data.data.recipes.map(async (rec, i) => {
      console.log("not confirmed");
      // loadRecipe..........
      const loaddata = await AJAX(`${API_URL}${rec.id}?key=${KEY}`);
      state.recipe2 = createRecipeObject(loaddata);

      const checkIng = function () {
        if (ing) {
          if (state.recipe2.ingredients.length === val) {
            console.log("Equal");
            // console.log(state.recipe2.ingredients.length);
            // console.log(value === state.recipe2.ingredients.length);

            return state.recipe2;
          } else return;
        }
        if (!ing) {
          if (state.recipe2.cookingTime === val) {
            // console.log("Equal");
            console.log(state.recipe2.cookingTime);
            console.log(value === state.recipe2.cookingTime);
            return state.recipe2;
          } else return;
        }
      };

      // if (state.bookmarks.some((bookmark) => bookmark.id === rec.id))
      //   state.recipe2.bookmarked = true;
      // else state.recipe2.bookmarked = false;
      // console.log(state.recipe2);
      // loadrecipeEnd...............

      if (checkIng()) {
        const cheeec = checkIng();
        console.log(cheeec);

        statesort.keeprec.push(cheeec);
      } else if (!checkIng()) {
        return;
      }
      console.log("figure it");
      console.log(statesort.keeprec);
      statesort.search.results = statesort.keeprec.map((rece) => {
        console.log(rece);
        return rece;
        // return {
        //   id: rece.id,
        //   title: rece.title,
        //   publisher: rece.publisher,
        //   image: rece.image,
        //   ...(rece.key && { key: rece.key }),
        // };
      });
      console.log(statesort.search.results);
      state.search.page = 1;
    });
  } catch (err) {
    err = "TypeError: Failed to Fetch"
      ? (err =
          "Connection failed! Please check your connection and Try again :)")
      : (err = err);
    console.error(`${err} 💥💥💥💥`);
    throw err;
  }
};
export const getSearchResultsPage = function (
  page = state.search.page,
  load = false,
  loader
) {
  state.search.page = page;

  const start = (page - 1) * state.search.resultsPerPage; // 0
  const end = page * state.search.resultsPerPage; // 9
  console.log(state.search.results);
  if (load) loader;
  return state.search.results.slice(start, end);
};
export const getSearchResultsPagesort = function (
  page = statesort.search.page
) {
  statesort.search.page = page;

  const start = (page - 1) * statesort.search.resultsPerPage; // 0
  const end = page * statesort.search.resultsPerPage; // 9
  console.log(statesort.search.results);
  // setTimeout(() => {
  for (let i = 0; i < 2; i++) {
    console.log(i);
    if ((i = 1)) {
      if (
        statesort.keeprec.length === 0 &&
        statesort.search.results.length !== 0
      ) {
        // throw new Error("No recipes found for your query! Please try again ;)");
        return;
      } else statesort.keeprec = statesort.keeprec;
    }
    // }, 500);
  }

  console.log(statesort.keeprec);
  return statesort.search.results.slice(start, end);
};

export const updateServings = function (newServings) {
  state.recipe.ingredients.forEach((ing) => {
    ing.quantity = (ing.quantity * newServings) / state.recipe.servings;
    // newQt = oldQt * newServings / oldServings // 2 * 8 / 4 = 4
  });

  state.recipe.servings = newServings;
};

const persistBookmarks = function () {
  localStorage.setItem("bookmarks", JSON.stringify(state.bookmarks));
};

export const addBookmark = function (recipe) {
  // Add bookmark
  state.bookmarks.push(recipe);

  // Mark current recipe as bookmarked
  if (recipe.id === state.recipe.id) state.recipe.bookmarked = true;

  persistBookmarks();
};

export const deleteBookmark = function (id) {
  // Delete bookmark
  const index = state.bookmarks.findIndex((el) => el.id === id);
  state.bookmarks.splice(index, 1);

  // Mark current recipe as NOT bookmarked
  if (id === state.recipe.id) state.recipe.bookmarked = false;

  persistBookmarks();
};

const init = function () {
  const storage = localStorage.getItem("bookmarks");
  if (storage) state.bookmarks = JSON.parse(storage);
};
init();
export const shopper = function (val) {
  console.log(val);
};
// shoplist view
export const persistShoplist = function () {
  localStorage.setItem("shoplist", JSON.stringify(state.shoplist));
};
export const addShoplist = function (ing) {
  // Add bookmark
  // ing.forEach(ingi => console.log(ingi))
  // ing.checked = false;

  ing.id = uniqid();
  state.shoplist.push(ing);
  // Mark current ingredients as listed
  // if (ingredients === state.recipe.ingredients) state.recipe.shoplisted = true;
  persistShoplist();
  // return ing;
};
export const checkadd = function (id) {
  // Add bookmark

  state.shoplist.forEach((el) => {
    if (el.id === id) {
      console.log("checked");
      el.checked = true;
      state.shoplist.checker = true;
    }
  });
  persistShoplist();
};
export const checkrem = function (id) {
  // Add bookmark
  state.shoplist.forEach((el) => {
    if (el.id === id) {
      console.log("unchecked");
      el.checked = false;
      state.shoplist.checker = false;
    }
  });
  persistShoplist();
};
export const deleteShoplist = function (id) {
  // Delete bookmark
  const index = state.shoplist.findIndex((el) => el.id === id);
  state.shoplist.splice(index, 1);
  // Delete from UI
  const item = document.querySelector(`[data-itemid="${id}"]`);
  if (item) item.parentElement.removeChild(item);
  // Mark current recipe as NOT bookmarked
  // if (id === state.recipe.id) state.recipe.bookmarked = false;

  persistShoplist();
};

const init2 = function () {
  const stored = localStorage.getItem("shoplist");
  if (stored) state.shoplist = JSON.parse(stored);
};
init2();

// clear bookmarks
// const clearBookmarks = function () {
//   localStorage.clear('shoplist');
// };
// clearBookmarks();

export const uploadRecipe = async function (newRecipe) {
  try {
    const ingredients = Object.entries(newRecipe)
      .filter((entry) => entry[0].startsWith("ingredient") && entry[1] !== "")
      .map((ing) => {
        const ingArr = ing[1].split(",").map((el) => el.trim());
        // const ingArr = ing[1].replaceAll(' ', '').split(',');
        if (ingArr.length !== 3)
          throw new Error(
            "Wrong ingredient fromat! Please use the correct format :)"
          );

        const [quantity, unit, description] = ingArr;

        return { quantity: quantity ? +quantity : null, unit, description };
      });

    const recipe = {
      title: newRecipe.title,
      source_url: newRecipe.sourceUrl,
      image_url: newRecipe.image,
      publisher: newRecipe.publisher,
      cooking_time: +newRecipe.cookingTime,
      servings: +newRecipe.servings,
      ingredients,
    };

    const data = await AJAX(`${API_URL}?key=${KEY}`, recipe);
    state.recipe = createRecipeObject(data);
    addBookmark(state.recipe);
  } catch (err) {
    // err = "TypeError: Failed to Fetch"
    //   ? (err =
    //       "Connection failed! Please check your connection and Try again :)")
    //   : (err = err);
    throw err;
  }
};
export const intersectApi = function () {
  const images = document.querySelectorAll(".inter-preview");
  const imgfig = document.querySelector(".preview__fig");
  const options = {
    threshold: 0.5,
  };
  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      // entry.target.classList.toggle('show', entry.isIntersecting)

      if (entry.isIntersecting) {
        entry.target.classList.add("show");
        console.log(entry.target);
        observer.unobserve(entry.target);
        console.log(imgfig);
      } else {
        entry.target.classList.remove("show");
        return;
      }
    });
  }, options);
  images.forEach((image) => observer.observe(image));
  // observer.observe(images)
};
export const sorter = function (inputVal, render) {
  const ingi = state.recipe.ingredients;
  if (inputVal === ingi.length) {
    render;
  }
  console.log(ingi.length);
};
export const darkMode = function () {
  const darkBtn = document.querySelector(".sun-moon-cont");
  const targMoon = document.querySelector(".moon");
  const targSun = document.querySelector(".sun");
  let darkMode = localStorage.getItem("darkMode");
  // add dark mode to body
  const enableDarkMode = () => {
    document.body.classList.add("dark-mode");
    // update local Storage
    localStorage.setItem("darkMode", "enabled");
  };
  const disableDarkMode = () => {
    document.body.classList.remove("dark-mode");
    // update local Storage
    localStorage.setItem("darkMode", null);
  };
  if (darkMode === "enabled") {
    targMoon.classList.add("translate");
    targSun.classList.remove("translate");
    enableDarkMode();
  } else {
    targSun.classList.add("translate");
    targMoon.classList.remove("translate");
    disableDarkMode();
  }
  darkBtn.addEventListener("click", () => {
    darkMode = localStorage.getItem("darkMode");
    if (darkMode !== "enabled") {
      console.log("yooooo");
      targMoon.classList.add("translate");
      targSun.classList.remove("translate");
      enableDarkMode();
    } else {
      targSun.classList.add("translate");
      targMoon.classList.remove("translate");
      disableDarkMode();
    }
  });
};
export const offcanvas = function () {
  const search = document.querySelector(".hamburg");
  const left = document.querySelector(".search-results");
  const closeoff = document.querySelector(".closeMobile");
  const closebook = document.querySelector(".closebook");
  const book = document.querySelector(".bookmarks");
  const overlaycont = document.querySelector(".resultcont");
  const nobtn = document.querySelector(".nobtn");
  const yesmodal = document.querySelector(".yesmodal");
  const overlay = document.querySelector(".overresult");
  const shoplistlist = document.querySelector(".shoplist");
  const logo = document.querySelector(".logo-imgs");
  const input = document.querySelector(".input-outlined");
  const label = input.querySelector("label");
  const searchlabel = document.querySelector(".search-label");
  const searchicon = document.querySelector(".search-icon");
  const navinner = document.querySelectorAll(".nav-inner");
  const inni = document.querySelectorAll(".nav-txt");
  const spantxt = document.querySelector(".rem-icon1");
  const sortbtn = document.querySelector(".sort-cont");
  const resize = document.querySelector(".resize");
  const boxMore = document.querySelector(".boxMore");
  const boximgtxts = document.querySelectorAll(".boxImgTxt");
  const media = window.matchMedia("(max-width: 500px)");
  const media2 = window.matchMedia("(max-width: 890px)");
  const media3 = window.matchMedia("(min-width: 1100px)");
  const direct = document.querySelector(".direct-boxes");
  const img2 = boxMore.querySelector("img");
  const slideimgs = document.querySelectorAll(".slideImg");
  const imgConts = document.querySelectorAll(".img-cont");
  const newres = document.querySelector(".newresult");
  const pagination = document.querySelector(".pagination");
  const searchfield = document.querySelector(".search__field");
  const tweeticon = document.querySelector(".twitterIcon");
  const ingell = document.querySelector(".ing-ell");
  const tweettxt = document.querySelectorAll(".twit-txt");
  const copy = document.querySelector(".copyright");
  const txticon = document.querySelector(".sort-cont");
  const navtxticon = txticon.querySelector(".nav-inner");
  const bmark = document.querySelector(".bookmarks");
  const slist = document.querySelector(".shoplist");
  input.addEventListener("click", () => {
    if (media3.matches) {
      const navtxticon = txticon.childNodes[1].childNodes[1].childNodes[1];
      const drop = txticon.childNodes[1].childNodes[3].childNodes[1];
      const drop2 = txticon.childNodes[1].childNodes[3].childNodes[3];
      const droping =
        txticon.childNodes[1].childNodes[3].childNodes[1].childNodes[1];
      const droping2 =
        txticon.childNodes[1].childNodes[3].childNodes[3].childNodes[1];
      drop.style.width = "200px";
      drop2.style.width = "200px";
      droping.classList.remove("ing-ell");
      droping2.classList.remove("ing-ell");
      pagination.style.left = "25rem";
      navtxticon.style.paddingInline = "2rem";
      bmark.style.maxWidth = "105rem";
      bmark.style.minWidth = "105rem";
      navinner.forEach((nav) => {
        nav.style.paddingInline = "2rem";
        console.log(nav);
      });
      console.log(droping);
      console.log(droping2);
      newres.style.gap = "0.5rem";
      // newres.style.paddingInline = "1rem";
      searchicon.style.display = "none";
      searchlabel.style.display = "block";
      searchicon.style.transition = "display 1s ease";
      searchlabel.style.transition = "display 1s ease";
      resize.style.display = "flex";
      input.style.borderRadius = "2rem";
      input.style.width = "100%";
      left.style.width = "25%";
      direct.style.gap = "0.5rem";
      direct.style.paddingBlock = "0.2rem";
      tweeticon.style.display = "none";
      tweettxt.forEach((txt) => {
        txt.style.display = "inline";
      });
      copy.style.bottom = "10px";
      slideimgs.forEach((slideimg) => {
        slideimg.style.minWidth = "31rem";
        slideimg.style.maxWidth = "31rem";
        slideimg.style.height = "16rem";
      });
      imgConts.forEach((imgCont) => {
        imgCont.style.maxWidth = "31rem";
        imgCont.style.minWidth = "31rem";
        imgCont.style.height = "16rem";
      });

      // min-width: 31rem;
      // max-width: 31rem;
      // height: 15rem;

      boximgtxts.forEach((boximgtxt) => {
        const boximg = boximgtxt.querySelector(".boxImg");
        const img = boximg.querySelector("img");

        boximgtxt.style.minWidth = "18.5rem";
        boximgtxt.style.maxWidth = "18.5rem";
        boximgtxt.style.minHeight = "13.5rem";
        boximgtxt.style.maxHeight = "13.5rem";
        boximg.style.minWidth = "18.5rem";
        boximg.style.maxWidth = "18.5rem";
        boximg.style.minHeight = "13.5rem";
        boximg.style.maxHeight = "13.5rem";

        img.style.minWidth = "18.5rem";
        img.style.maxWidth = "18.5rem";
        img.style.minHeight = "13.5rem";
        img.style.maxHeight = "13.5rem";
      });
      boxMore.style.maxWidth = "18.5rem";
      boxMore.style.minWidth = "18.5rem";
      boxMore.style.minHeight = "13.5rem";
      boxMore.style.maxHeight = "13.5rem";

      img2.style.minWidth = "18.5rem";
      img2.style.maxWidth = "18.5rem";
      img2.style.minHeight = "13.5rem";
      img2.style.maxHeight = "13.5rem";

      // min-width: 20rem;
      // max-width: 20rem;
      // min-height: 12rem;
      // max-height: 12rem;

      console.log("input");
      inni.forEach((inn) => {
        inn.style.display = "block";
        inn.style.transition = "display 1s ease";
      });
      // spantxt.style.display = "block";
      const rem = sortbtn.childNodes[1];
      const close = rem.childNodes[1];
      const con = close.childNodes[1];
      const span1 = con.childNodes[3];
      const span = con.childNodes[5];
      span1.style.display = "block";
      span.style.display = "block";
      span1.style.transition = "display 1s ease";
      span.style.transition = "display 1s ease";
      // resize
      resize.addEventListener("click", () => {
        searchfield.value = "";
        pagination.style.left = "35rem";
        newres.style.gap = "0.5rem";
        bmark.style.maxWidth = "124rem";
        bmark.style.minWidth = "124rem";
        // newres.style.paddingInline = "10rem";
        span1.style.display = "none";
        navtxticon.style.paddingInline = "1rem";
        drop.style.width = "90px";
        drop2.style.width = "90px";
        droping.classList.add("ing-ell");
        droping2.classList.add("ing-ell");
        navinner.forEach((nav) => {
          nav.style.paddingInline = "1.3rem";
        });
        span.style.display = "none";
        searchicon.style.display = "block";
        searchlabel.style.display = "none";
        left.style.width = "8.5%";
        resize.style.display = "none";
        input.style.width = "89%";
        input.style.borderTopRightRadius = "5rem";
        input.style.borderBottomRightRadius = "1rem";
        input.style.borderTopLeftRadius = "1rem";
        input.style.borderBottomLeftRadius = "2rem";
        tweeticon.style.display = "block";
        tweettxt.forEach((txt) => {
          txt.style.display = "none";
        });
        copy.style.bottom = "11rem";
        inni.forEach((inn) => {
          inn.style.display = "none";
          inn.style.transition = "display 1s ease";
        });
        direct.style.paddingBlock = "2rem";
        direct.style.gap = "0.5rem";
        boximgtxts.forEach((boximgtxt) => {
          const boximg = boximgtxt.querySelector(".boxImg");
          const img = boximg.querySelector("img");
          boximgtxt.style.minWidth = "22rem";
          boximgtxt.style.maxWidth = "22rem";
          boximgtxt.style.minHeight = "13.5rem";
          boximgtxt.style.maxHeight = "13.5rem";
          boximg.style.minWidth = "22rem";
          boximg.style.maxWidth = "22rem";
          boximg.style.minHeight = "13.5rem";
          boximg.style.maxHeight = "13.5rem";

          img.style.minWidth = "22rem";
          img.style.maxWidth = "22rem";
          img.style.minHeight = "13.5rem";
          img.style.maxHeight = "13.5rem";
        });
        boxMore.style.maxWidth = "22rem";
        boxMore.style.minWidth = "22rem";
        boxMore.style.minHeight = "13.5rem";
        boxMore.style.maxHeight = "13.5rem";

        img2.style.minWidth = "22rem";
        img2.style.maxWidth = "22rem";
        img2.style.minHeight = "13.5rem";
        img2.style.maxHeight = "13.5rem";

        slideimgs.forEach((slideimg) => {
          slideimg.style.minWidth = "36.5rem";
          slideimg.style.maxWidth = "36.5rem";
          slideimg.style.height = "17rem";
        });
        imgConts.forEach((imgCont) => {
          imgCont.style.maxWidth = "36.5rem";
          imgCont.style.minWidth = "36.5rem";
          imgCont.style.height = "17rem";
        });
      });
      mediasm();
    } else return;
  });

  boxMore.addEventListener("click", () => {
    if (media3.matches) {
      const navtxticon = txticon.childNodes[1].childNodes[1].childNodes[1];
      const drop = txticon.childNodes[1].childNodes[3].childNodes[1];
      const drop2 = txticon.childNodes[1].childNodes[3].childNodes[3];
      const droping =
        txticon.childNodes[1].childNodes[3].childNodes[1].childNodes[1];
      const droping2 =
        txticon.childNodes[1].childNodes[3].childNodes[3].childNodes[1];
      drop.style.width = "200px";
      drop2.style.width = "200px";
      bmark.style.maxWidth = "105rem";
      bmark.style.minWidth = "105rem";
      droping.classList.remove("ing-ell");
      droping2.classList.remove("ing-ell");
      pagination.style.left = "25rem";
      console.log(newres.childNodes);
      newres.style.gap = "0.5rem";
      navtxticon.style.paddingInline = "2rem";
      navinner.forEach((nav) => {
        nav.style.paddingInline = "2rem";
      });
      searchicon.style.display = "none";
      searchlabel.style.display = "block";
      searchicon.style.transition = "display 1s ease";
      searchlabel.style.transition = "display 1s ease";
      resize.style.display = "flex";
      input.style.borderRadius = "2rem";
      input.style.width = "100%";
      left.style.width = "25%";
      direct.style.gap = "0.5rem";
      direct.style.paddingBlock = "0.2rem";
      tweeticon.style.display = "none";
      tweettxt.forEach((txt) => {
        txt.style.display = "inline";
      });
      copy.style.bottom = "10px";
      slideimgs.forEach((slideimg) => {
        slideimg.style.minWidth = "31rem";
        slideimg.style.maxWidth = "31rem";
        slideimg.style.height = "16rem";
      });
      imgConts.forEach((imgCont) => {
        imgCont.style.maxWidth = "31rem";
        imgCont.style.minWidth = "31rem";
        imgCont.style.height = "16rem";
      });

      // min-width: 31rem;
      // max-width: 31rem;
      // height: 15rem;

      boximgtxts.forEach((boximgtxt) => {
        const boximg = boximgtxt.querySelector(".boxImg");
        const img = boximg.querySelector("img");

        boximgtxt.style.minWidth = "18.5rem";
        boximgtxt.style.maxWidth = "18.5rem";
        boximgtxt.style.minHeight = "13.5rem";
        boximgtxt.style.maxHeight = "13.5rem";
        boximg.style.minWidth = "18.5rem";
        boximg.style.maxWidth = "18.5rem";
        boximg.style.minHeight = "13.5rem";
        boximg.style.maxHeight = "13.5rem";

        img.style.minWidth = "18.5rem";
        img.style.maxWidth = "18.5rem";
        img.style.minHeight = "13.5rem";
        img.style.maxHeight = "13.5rem";
      });
      boxMore.style.maxWidth = "18.5rem";
      boxMore.style.minWidth = "18.5rem";
      boxMore.style.minHeight = "13.5rem";
      boxMore.style.maxHeight = "13.5rem";

      img2.style.minWidth = "18.5rem";
      img2.style.maxWidth = "18.5rem";
      img2.style.minHeight = "13.5rem";
      img2.style.maxHeight = "13.5rem";

      // min-width: 20rem;
      // max-width: 20rem;
      // min-height: 12rem;
      // max-height: 12rem;

      console.log("input");
      inni.forEach((inn) => {
        inn.style.display = "block";
        inn.style.transition = "display 1s ease";
      });
      // spantxt.style.display = "block";
      const rem = sortbtn.childNodes[1];
      const close = rem.childNodes[1];
      const con = close.childNodes[1];
      const span1 = con.childNodes[3];
      const span = con.childNodes[5];
      span1.style.display = "block";
      span.style.display = "block";
      span1.style.transition = "display 1s ease";
      span.style.transition = "display 1s ease";
      // resize
      resize.addEventListener("click", () => {
        pagination.style.left = "35rem";
        newres.style.gap = "1rem";
        span1.style.display = "none";
        bmark.style.maxWidth = "124rem";
        bmark.style.minWidth = "124rem";
        navtxticon.style.paddingInline = "1rem";
        span.style.display = "none";
        drop.style.width = "90px";
        drop2.style.width = "90px";
        droping.classList.add("ing-ell");
        droping2.classList.add("ing-ell");
        navinner.forEach((nav) => {
          nav.style.paddingInline = "1.3rem";
        });
        searchicon.style.display = "block";
        searchlabel.style.display = "none";
        left.style.width = "8.5%";
        resize.style.display = "none";
        input.style.width = "89%";
        input.style.borderTopRightRadius = "5rem";
        input.style.borderBottomRightRadius = "1rem";
        input.style.borderTopLeftRadius = "1rem";
        input.style.borderBottomLeftRadius = "2rem";
        tweeticon.style.display = "block";
        tweettxt.forEach((txt) => {
          txt.style.display = "none";
        });
        copy.style.bottom = "11rem";
        inni.forEach((inn) => {
          inn.style.display = "none";
          inn.style.transition = "display 1s ease";
        });
        direct.style.paddingBlock = "2rem";
        direct.style.gap = "0.5rem";
        boximgtxts.forEach((boximgtxt) => {
          const boximg = boximgtxt.querySelector(".boxImg");
          const img = boximg.querySelector("img");
          boximgtxt.style.minWidth = "22rem";
          boximgtxt.style.maxWidth = "22rem";
          boximgtxt.style.minHeight = "13.5rem";
          boximgtxt.style.maxHeight = "13.5rem";
          boximg.style.minWidth = "22rem";
          boximg.style.maxWidth = "22rem";
          boximg.style.minHeight = "13.5rem";
          boximg.style.maxHeight = "13.5rem";

          img.style.minWidth = "22rem";
          img.style.maxWidth = "22rem";
          img.style.minHeight = "13.5rem";
          img.style.maxHeight = "13.5rem";
        });
        boxMore.style.maxWidth = "22rem";
        boxMore.style.minWidth = "22rem";
        boxMore.style.minHeight = "13.5rem";
        boxMore.style.maxHeight = "13.5rem";

        img2.style.minWidth = "22rem";
        img2.style.maxWidth = "22rem";
        img2.style.minHeight = "13.5rem";
        img2.style.maxHeight = "13.5rem";

        slideimgs.forEach((slideimg) => {
          slideimg.style.minWidth = "36.5rem";
          slideimg.style.maxWidth = "36.5rem";
          slideimg.style.height = "17rem";
        });
        imgConts.forEach((imgCont) => {
          imgCont.style.maxWidth = "36.5rem";
          imgCont.style.minWidth = "36.5rem";
          imgCont.style.height = "17rem";
        });
      });
      mediasm();
    } else return;
  });

  mediasm();

  logo.addEventListener("click", () => {
    // window.location.reload();
  });
  closebook.addEventListener("click", () => {
    book.classList.remove("show");
    document
      .querySelector(".nav__btn--bookmarks")
      .classList.remove("trans-left");
  });
  closeoff.addEventListener("click", () => {
    left.style.left = "-100rem";
    overlaycont.classList.remove("overresult");
  });
  search.addEventListener("click", () => {
    // console.log("can");
    left.style.left = "0";
    overlaycont.classList.add("overresult");
  });
  nobtn.addEventListener("click", () => {
    // console.log("can");
    yesmodal.style.opacity = "0";
    shoplistlist.classList.remove("overshop2");
  });
  // media query funtion

  function mediasm() {
    if (media2.matches) {
      left.style.width = "55%";
      input.style.borderRadius = "5rem";
      resize.style.display = "none";
      searchicon.style.display = "none";
      searchlabel.style.display = "block";
      label.style.left = "18px";
      input.style.width = "100%";
      copy.style.display = "none";
      boxMore.addEventListener("click", () => {
        left.style.left = "0";
        overlaycont.classList.add("overresult");
      });
      inni.forEach((inn) => {
        inn.style.display = "block";
        inn.style.transition = "display 1s ease";
      });
      if (media.matches) {
        left.style.width = "100%";
        input.style.width = "100%";
        copy.style.display = "none";
        input.style.borderRadius = "5rem";
        resize.style.display = "none";
        searchicon.style.display = "none";
        searchlabel.style.display = "block";
        label.style.left = "18px";
        boxMore.addEventListener("click", () => {
          left.style.left = "0";
          overlaycont.classList.add("overresult");
        });
        inni.forEach((inn) => {
          inn.style.display = "block";
          inn.style.transition = "display 1s ease";
        });
      }
    } else return;
  }
};

export const sliders = function () {
  const slider = function () {
    const text = document.querySelectorAll(".slider-text");

    const images = document.querySelectorAll(".img");
    let imageindex = 0;
    function changeback() {
      images[imageindex].classList.remove("showing");
      // text[imageindex].classList.remove("left");
      text[imageindex].querySelector("p").classList.remove("top");
      text[imageindex].querySelector(".stars").classList.remove("left");
      imageindex++;

      if (imageindex >= images.length) {
        imageindex = 0;
      }
      images[imageindex].classList.add("showing");
      // text[imageindex].classList.add("left");
      text[imageindex].querySelector("p").classList.add("top");
      text[imageindex].querySelector(".stars").classList.add("left");
    }
    setInterval(changeback, 5000);
  };
  slider();
  const slider2 = function () {
    const text = document.querySelectorAll(".slider-text2");
    const images = document.querySelectorAll(".img2");
    let imageindex = 0;
    function changeback() {
      images[imageindex].classList.remove("showing");
      // text[imageindex].classList.remove("left");
      text[imageindex].querySelector("p").classList.remove("top");
      text[imageindex].querySelector(".stars").classList.remove("left");
      imageindex++;

      if (imageindex >= images.length) {
        imageindex = 0;
      }
      images[imageindex].classList.add("showing");
      // text[imageindex].classList.add("left");
      text[imageindex].querySelector("p").classList.add("top");
      text[imageindex].querySelector(".stars").classList.add("left");
    }
    setInterval(changeback, 5000);
  };
  slider2();
  const slider3 = function () {
    const text = document.querySelectorAll(".slider-text3");
    const images = document.querySelectorAll(".img3");
    let imageindex = 0;
    function changeback() {
      images[imageindex].classList.remove("showing");
      // text[imageindex].classList.remove("left");
      text[imageindex].querySelector("p").classList.remove("top");
      text[imageindex].querySelector(".stars").classList.remove("left");
      imageindex++;

      if (imageindex >= images.length) {
        imageindex = 0;
      }
      images[imageindex].classList.add("showing");
      // text[imageindex].classList.add("left");
      text[imageindex].querySelector("p").classList.add("top");
      text[imageindex].querySelector(".stars").classList.add("left");
    }
    setInterval(changeback, 5000);
  };
  slider3();
  function scrollers() {
    const scrollers = document.querySelectorAll(".scroller");
    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      addanimation();
    }
    function addanimation() {
      scrollers.forEach((scroller) => {
        scroller.setAttribute("data-animated", true);
      });
      const scrollerInner = document.querySelector(".scroller-inner");
      const scrollerContent = Array.from(scrollerInner.children);
      console.log(scrollerContent);
      scrollerContent.forEach((item) => {
        const duplicItem = item.cloneNode(true);
        console.log(duplicItem);
        duplicItem.setAttribute("aria-hidden", true);
        scrollerInner.appendChild(duplicItem);
      });
    }
  }
  scrollers();
};
