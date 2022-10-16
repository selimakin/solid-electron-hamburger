"use strict";

const form = document.querySelector(".form");
const pismeContainer = document.querySelector(".pisme-container");
const pisme = document.querySelector(".pisme");
const type = document.querySelector(".type");
const btn = document.querySelector(".btn");
const burgerTypes = document.querySelectorAll("option[name='tur']");
const radioButtons = document.querySelectorAll("input[name='pismeDerecesi']");
const checkBoxes = document.querySelectorAll("input[name='malzeme']");
const message1 = document.querySelector(".message1");
const message2 = document.querySelector(".message2");
const message3 = document.querySelector(".message3");
const ingredientsContainer = document.querySelector(".ingredients");

const ingredients = {
  marul: 5,
  tursu: 5,
  sogan: 5,
  kofte: 5,
  tavuk: 5,
  domates: 5,
  ekmek: 5,
  patates: 5,
  cola: 5,
  paketSos: 5,
};

let order = ["cola", "patates", "paketSos", "ekmek"];
let ingArr = [];
let burgerType,
  pismeDerecesi,
  markup = "";

const clear = (container) => {
  container.innerHTML = "";
};

const renderMessage = (container, msg) => {
  container.insertAdjacentHTML("afterbegin", msg);
};

const renderIngredients = () => {
  ingArr = [];
  for (const ing in ingredients) {
    ingArr.push([ing, ingredients[ing]]);
  }

  markup = `<p>${ingArr.map((ing) => " " + ing[0] + ":" + ing[1])}</p>`;
  clear(ingredientsContainer);
  renderMessage(ingredientsContainer, markup);
};

renderIngredients();

const degrees = {
  azPismis: { degree: "az", duration: 2 },
  ortaPismis: { degree: "orta", duration: 3 },
  cokPismis: { degree: "fazla", duration: 4 },
};

type.addEventListener("change", () => {
  for (const type of burgerTypes) {
    if (type.value === "kofte" && type.selected) {
      pisme.classList.remove("hidden");
      break;
    } else {
      pisme.classList.add("hidden");
    }
  }
  for (const type of burgerTypes) {
    if (!!type.value && type.selected) {
      btn.disabled = false;
      break;
    } else {
      btn.disabled = true;
    }
  }
});

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const prepareOrder = () => {
  burgerTypes.forEach((type) => (type.selected ? order.push(type.value) : ""));
  checkBoxes.forEach((ing) => (ing.checked ? order.push(ing.value) : ""));
  radioButtons.forEach((button) =>
    button.checked ? (pismeDerecesi = button.id) : ""
  );
  order.some((ing) => (ing === "tavuk" ? (pismeDerecesi = "Tavuk pişir") : ""));
  pismeDerecesi === "Tavuk pişir"
    ? (burgerType = "Tavuk")
    : (burgerType = "Köfte");
};

const getOrder = () => {
  markup = `<p>1.ADIM: Siparişiniz alınıyor. (1 saniye)</p>`;
  clear(message1);
  renderMessage(message1, markup);
  prepareOrder();
  setTimeout(() => {
    ingredientCheck();
  }, 1000);
};

const ingredientCheck = () => {
  markup = `<p>2.ADIM: Malzemeler kontrol ediliyor. (3 saniye)</p>`;
  clear(message1);
  renderMessage(message1, markup);
  for (const ingredient in ingredients) {
    if (order.includes(ingredient)) {
      ingredients[ingredient] = ingredients[ingredient] - 1;
    }
  }
  setTimeout(() => {
    let empty = [];
    for (const ingredient in ingredients) {
      if (ingredients[ingredient] === -1) {
        empty.push(ingredient);
      } else {
        continue;
      }
    }
    if (empty.length) {
      btn.disabled = true;
      empty[0] = empty[0].charAt(0).toUpperCase() + empty[0].slice(1);
      markup = `<p style="color: red">2.ADIM: ${empty.join(
        ", "
      )} eksik. Bu yüzden siparişiniz iptal edildi.</p>`;
      clear(message1);
      renderMessage(message1, markup);
    } else {
      burgerCheck();
      frenchFry();
      prepareDrink();
    }
  }, 3000);
};

const burgerCheck = () => {
  markup = `<p>3.ADIM: Hamburger türü kontrol ediliyor. (1 saniye)</p>`;
  clear(message1);
  renderMessage(message1, markup);
  setTimeout(() => {
    bakeCheck();
  }, 1000);
};

const bakeCheck = () => {
  if (burgerType === "Köfte") {
    markup = `<p>3.ADIM: ${burgerType} ${degrees[pismeDerecesi].degree} derecede pişiriliyor. (${degrees[pismeDerecesi].duration} saniye)</p>`;
    clear(message1);
    renderMessage(message1, markup);
    setTimeout(() => {
      prepareBurger();
    }, degrees[pismeDerecesi].duration * 1000);
  }

  if (burgerType === "Tavuk") {
    markup = `<p>3.ADIM: ${burgerType} pişiriliyor. (3 saniye)</p>`;
    clear(message1);
    renderMessage(message1, markup);
    setTimeout(() => {
      prepareBurger();
    }, 3000);
  }
};

const prepareBurger = () => {
  markup = `<p>3.ADIM: Hamburger hazırlanıyor. (2 saniye)</p>`;
  clear(message1);
  renderMessage(message1, markup);
  setTimeout(() => {
    prepareTray();
  }, 2000);
};

const frenchFry = () => {
  markup = `<p>4.ADIM: Patates kızartılıyor. (5 saniye)</p>`;
  clear(message2);
  renderMessage(message2, markup);
  setTimeout(() => {
    clear(message2);
  }, 5000);
};

const prepareDrink = () => {
  markup = `<p>5.ADIM: İçecek hazırlanıyor. (2 saniye)</p>`;
  clear(message3);
  renderMessage(message3, markup);
  setTimeout(() => {
    clear(message3);
  }, 2000);
};

const prepareTray = () => {
  markup = `<p>6.ADIM: Soslar ve ürünler tepsiye koyuluyor. (1 saniye)</p>`;
  clear(message1);
  renderMessage(message1, markup);
  setTimeout(() => {
    serve();
  }, 1000);
};

const serve = () => {
  markup = `<p>7.ADIM: Müşteriye servis ediliyor. (1 saniye)</p>`;
  clear(message1);
  renderMessage(message1, markup);
  setTimeout(() => {
    clear(message1);
    renderMessage(
      message1,
      `<p style="color: darkgreen">SİPARİŞİNİZ TESLİM EDİLDİ.</p>`
    );
    renderIngredients();
  }, 1000);
};

btn.addEventListener("click", (e) => {
  e.preventDefault();
  getOrder();
});
