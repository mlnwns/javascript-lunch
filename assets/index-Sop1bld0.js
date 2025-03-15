(function polyfill() {
  const relList = document.createElement("link").relList;
  if (relList && relList.supports && relList.supports("modulepreload")) {
    return;
  }
  for (const link of document.querySelectorAll('link[rel="modulepreload"]')) {
    processPreload(link);
  }
  new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      if (mutation.type !== "childList") {
        continue;
      }
      for (const node of mutation.addedNodes) {
        if (node.tagName === "LINK" && node.rel === "modulepreload")
          processPreload(node);
      }
    }
  }).observe(document, { childList: true, subtree: true });
  function getFetchOpts(link) {
    const fetchOpts = {};
    if (link.integrity) fetchOpts.integrity = link.integrity;
    if (link.referrerPolicy) fetchOpts.referrerPolicy = link.referrerPolicy;
    if (link.crossOrigin === "use-credentials")
      fetchOpts.credentials = "include";
    else if (link.crossOrigin === "anonymous") fetchOpts.credentials = "omit";
    else fetchOpts.credentials = "same-origin";
    return fetchOpts;
  }
  function processPreload(link) {
    if (link.ep)
      return;
    link.ep = true;
    const fetchOpts = getFetchOpts(link);
    fetch(link.href, fetchOpts);
  }
})();
function $(selector, scope = document) {
  if (!selector) throw "no selector";
  return scope.querySelector(selector);
}
const storageController = (storage) => {
  const getStorage2 = (key) => {
    const item = storage.getItem(key);
    if (item) {
      return JSON.parse(item);
    }
    return null;
  };
  const setStorage2 = (key, value) => {
    storage.setItem(key, JSON.stringify(value));
  };
  const removeStorage2 = (key) => {
    storage.removeItem(key);
  };
  const clearStorage = () => {
    storage.clear();
  };
  return {
    getStorage: getStorage2,
    setStorage: setStorage2,
    removeStorage: removeStorage2,
    clearStorage
  };
};
const { getStorage, setStorage } = storageController(localStorage);
const DISTANCE_OPTIONS = [
  { value: "", text: "선택해 주세요" },
  { value: "5", text: "5분 내" },
  { value: "10", text: "10분 내" },
  { value: "15", text: "15분 내" },
  { value: "20", text: "20분 내" },
  { value: "30", text: "30분 내" }
];
const CATEGORY_OPTIONS = [
  { value: "", text: "선택해 주세요" },
  { value: "korean", text: "한식" },
  { value: "chinese", text: "중식" },
  { value: "japanese", text: "일식" },
  { value: "western", text: "양식" },
  { value: "asian", text: "아시안" },
  { value: "etc", text: "기타" }
];
const CATEGORY_FILTER_OPTIONS = [
  { value: "all", label: "전체" },
  { value: "korean", label: "한식" },
  { value: "chinese", label: "중식" },
  { value: "japanese", label: "일식" },
  { value: "western", label: "양식" },
  { value: "asian", label: "아시안" },
  { value: "etc", label: "기타" }
];
const SORTING_FILTER_OPTIONS = [
  { value: "name", label: "이름순" },
  { value: "distance", label: "거리순" }
];
const SORTING_DEFAULT = "name";
const CATEGORY_DEFAULT = "all";
const sortRestaurants = (restaurants, sortingCriteria = SORTING_DEFAULT) => {
  return [...restaurants].sort((a, b) => {
    if (sortingCriteria === "name") return a.title.localeCompare(b.title);
    if (sortingCriteria === "distance") return a.distance - b.distance;
    return 0;
  });
};
const text = (props = {}) => {
  const {
    tag = "span",
    size = "medium",
    color = "black",
    children = "",
    className
  } = props;
  const sizeStyle = {
    large: "text-subtitle",
    medium: "text-body"
  };
  const colorStyle = {
    orange: "primary-color",
    red: ""
    //TODO: 에러메세지 추가 시 새로 추가
  };
  return `
    <${tag} class="${colorStyle[color] || ""} ${sizeStyle[size] || ""}">
      ${children}
    </${tag}>
    `;
};
const koreanIcon = "/javascript-lunch/category-korean.png";
const chineseIcon = "/javascript-lunch/category-chinese.png";
const japaneseIcon = "/javascript-lunch/category-japanese.png";
const westernIcon = "/javascript-lunch/category-western.png";
const asianIcon = "/javascript-lunch/category-asian.png";
const etcIcon = "/javascript-lunch/category-etc.png";
const categoryIcons$1 = {
  korean: koreanIcon,
  chinese: chineseIcon,
  japanese: japaneseIcon,
  western: westernIcon,
  asian: asianIcon,
  etc: etcIcon
};
const categoryAlt$1 = {
  korean: "한식",
  chinese: "중식",
  japanese: "일식",
  western: "양식",
  asian: "아시아식",
  etc: "기타"
};
const restaurantItem = (props) => {
  const { category, title, distance, description: description2, id, isFavorite } = props;
  return `
    <li class="restaurant" data-id="${id}">
      <div class="restaurant__category">
        <img
          src="${categoryIcons$1[category]}"
          alt="${categoryAlt$1[category]}"
          class="category-icon"
        />
      </div>
      <div class="restaurant__info">
        ${text({ tag: "h3", size: "large", children: title })}
        ${text({
    tag: "span",
    size: "medium",
    color: "orange",
    children: `캠퍼스부터 ${distance}분 내`
  })}
        <p class="restaurant__description text-body">
          ${description2}
        </p>
      </div>
      <img data-id="${id}" src="${isFavorite ? "/favorite-icon-filled.png" : "/favorite-icon-lined.png"}" alt="favorite icon" class="favorite-icon">
    </li>
  `;
};
const toggleFavorite = (event) => {
  event.stopPropagation();
  const $icon = event.target;
  const restaurantId = $icon.dataset.id;
  let restaurants = getStorage("restaurants") ?? [];
  restaurants = restaurants.map((restaurant) => {
    if (restaurant.id === restaurantId) {
      return { ...restaurant, isFavorite: !restaurant.isFavorite };
    }
    return restaurant;
  });
  setStorage("restaurants", restaurants);
  if ($icon.classList.contains("favorite-icon")) {
    if ($icon.src.includes("/favorite-icon-filled.png")) {
      $icon.src = "/favorite-icon-lined.png";
    } else {
      $icon.src = "/favorite-icon-filled.png";
    }
  }
};
const updateRestaurantList = (isFavoriteTab = false) => {
  var _a, _b;
  const restaurants = getStorage("restaurants") ?? [];
  const selectedCategory = ((_a = $("#category-filter")) == null ? void 0 : _a.value) || CATEGORY_DEFAULT;
  const selectedSorting = ((_b = $("#sorting-filter")) == null ? void 0 : _b.value) || SORTING_DEFAULT;
  let filteredList = restaurants;
  if (isFavoriteTab) {
    filteredList = filteredList.filter((restaurant) => restaurant.isFavorite);
  }
  if (selectedCategory !== CATEGORY_DEFAULT) {
    filteredList = filteredList.filter(
      (restaurant) => restaurant.category === selectedCategory
    );
  }
  const sortedList = sortRestaurants(filteredList, selectedSorting);
  renderRestaurantList(sortedList);
};
const renderRestaurantList = (restaurants) => {
  const $container = $(".restaurant-list");
  if (restaurants.length === 0) {
    $container.innerHTML = `
      <div class="empty-restaurant-list">
        <span>등록된 음식점이 없습니다.</span>
      </div>
    `;
    return;
  }
  $container.innerHTML = restaurants.map((restaurant) => restaurantItem(restaurant)).join("");
  document.querySelectorAll(".favorite-icon").forEach(($icon) => {
    $icon.addEventListener("click", toggleFavorite);
  });
};
const button = (props) => {
  const { type, onClick, id, className, children } = props;
  const style = {
    primary: "button--primary",
    secondary: "button--secondary"
  };
  return `<button
    type=${type}
    id=${id}
    class="button ${style[className]} text-caption"
  >
    ${children}
  </button>
  `;
};
const byteToHex = [];
for (let i = 0; i < 256; ++i) {
  byteToHex.push((i + 256).toString(16).slice(1));
}
function unsafeStringify(arr, offset = 0) {
  return (byteToHex[arr[offset + 0]] + byteToHex[arr[offset + 1]] + byteToHex[arr[offset + 2]] + byteToHex[arr[offset + 3]] + "-" + byteToHex[arr[offset + 4]] + byteToHex[arr[offset + 5]] + "-" + byteToHex[arr[offset + 6]] + byteToHex[arr[offset + 7]] + "-" + byteToHex[arr[offset + 8]] + byteToHex[arr[offset + 9]] + "-" + byteToHex[arr[offset + 10]] + byteToHex[arr[offset + 11]] + byteToHex[arr[offset + 12]] + byteToHex[arr[offset + 13]] + byteToHex[arr[offset + 14]] + byteToHex[arr[offset + 15]]).toLowerCase();
}
let getRandomValues;
const rnds8 = new Uint8Array(16);
function rng() {
  if (!getRandomValues) {
    if (typeof crypto === "undefined" || !crypto.getRandomValues) {
      throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");
    }
    getRandomValues = crypto.getRandomValues.bind(crypto);
  }
  return getRandomValues(rnds8);
}
const randomUUID = typeof crypto !== "undefined" && crypto.randomUUID && crypto.randomUUID.bind(crypto);
const native = { randomUUID };
function v4(options, buf, offset) {
  var _a;
  if (native.randomUUID && true && !options) {
    return native.randomUUID();
  }
  options = options || {};
  const rnds = options.random ?? ((_a = options.rng) == null ? void 0 : _a.call(options)) ?? rng();
  if (rnds.length < 16) {
    throw new Error("Random bytes length must be >= 16");
  }
  rnds[6] = rnds[6] & 15 | 64;
  rnds[8] = rnds[8] & 63 | 128;
  return unsafeStringify(rnds);
}
const ERROR = Object.freeze({
  INVALID_INPUT_REQUIRED: "필수 입력값을 입력해주세요.",
  INVALID_EMPTY_INPUT: "공백은 입력할 수 없습니다.",
  INVALID_INPUT_LENGTH: (length) => `${length}자 이하로 입력해주세요.`
});
const escapeHtml = (unsafeString) => {
  const tempDiv = document.createElement("div");
  tempDiv.textContent = unsafeString;
  return tempDiv.innerHTML;
};
const buttonHandler = (event) => {
  event.preventDefault();
  const $form = event.target.closest(
    "form"
  );
  const $category = $("#category");
  const $name = $("#name");
  const $distance = $("#distance");
  const $description = $("#description");
  const $link = $("#link");
  const newRestaurant = {
    id: v4(),
    category: escapeHtml($category.value),
    title: escapeHtml($name.value),
    distance: Number(escapeHtml($distance.value)),
    description: escapeHtml($description.value),
    link: escapeHtml($link.value),
    isFavorite: false
  };
  if (!newRestaurant.category || !newRestaurant.title || !newRestaurant.distance) {
    alert(ERROR.INVALID_INPUT_REQUIRED);
    return;
  }
  const restaurants = getStorage("restaurants") ?? [];
  setStorage("restaurants", [...restaurants, newRestaurant]);
  const $restaurantModal = $("#restaurant-modal");
  $restaurantModal.classList.remove("modal--open");
  document.body.style.overflow = "auto";
  $form.reset();
  renderRestaurantList([...restaurants, newRestaurant]);
  const $allRestaurantTab = $(".all-restaurant-tab");
  const $favoriteRestaurantTab = $(".favorite-restaurant-tab");
  if ($favoriteRestaurantTab.classList.contains("select-tab-button")) {
    $favoriteRestaurantTab.classList.remove("select-tab-button");
    $allRestaurantTab.classList.add("select-tab-button");
  }
};
const buttonContainer = () => {
  const $buttonContainer = $(".button-container");
  $buttonContainer.innerHTML = `
      ${button({
    type: "button",
    id: "cancel-button",
    className: "secondary",
    children: "취소하기"
  })}
      ${button({
    type: "button",
    id: "add-button",
    className: "primary",
    children: "추가하기"
  })}
    
  `;
  const $addButton = $("#add-button");
  $("#cancel-button");
  $addButton.addEventListener("click", buttonHandler);
};
const dropDown = (props) => {
  const { id, isRequired, labelText, options } = props;
  const required = isRequired ? "required" : "";
  return `
    <label for=${id} text-caption">${labelText}</label>
    <select name=${id} id=${id} ${required}>
     ${options.map(
    (option) => `<option value=${option.value}>${option.text}</option>`
  )}
    </select>
    `;
};
const categorySelect = () => {
  const $categorySelectContainer = $(".category-select");
  $categorySelectContainer.innerHTML = `
    ${dropDown({
    id: "category",
    labelText: "카테고리",
    options: CATEGORY_OPTIONS,
    isRequired: true
  })}
  `;
};
const textArea = (props) => {
  const {
    labelText,
    id,
    cols = "30",
    rows = "5",
    spanText,
    isRequired = false,
    placeholder = ""
  } = props;
  const required = isRequired ? "required" : "";
  return `
    <label for=${id} text-caption">${labelText}</label>
    <textarea
    name=${id}
    id=${id}
    cols=${cols}
    rows=${rows}
    ${required}
    placeholder="${placeholder}"
    ></textarea>
    <span class="help-text text-caption">${spanText}</span>
    `;
};
const description = () => {
  const $descriptionContainer = $(".description-area");
  $descriptionContainer.addEventListener("input", (event) => {
    if (event.target.value.length > 1e3) {
      alert(ERROR.INVALID_INPUT_LENGTH(1e3));
    }
  });
  $descriptionContainer.innerHTML = textArea({
    labelText: "설명",
    id: "description",
    spanText: "메뉴 등 추가 정보를 입력해 주세요.",
    placeholder: "1000자 이내로 입력해 주세요."
  });
};
const distanceSelect = () => {
  const $distanceSelectContainer = $(".distance-select");
  $distanceSelectContainer.innerHTML = `
    ${dropDown({
    id: "distance",
    labelText: "거리(도보 이동 시간)",
    options: DISTANCE_OPTIONS,
    isRequired: true
  })}
  `;
};
const input = (props) => {
  const {
    labelText,
    id,
    isRequired = false,
    spanText = "",
    placeholder = ""
  } = props;
  const required = isRequired ? "required" : "";
  return `
        <label for="${id} text-caption">${labelText}</label>
        <input type="text" name=${id} id=${id} ${required} placeholder="${placeholder}"/>
        <span class="help-text text-caption">${spanText}</span>
    `;
};
const linkInput = () => {
  const $linkInputContainer = $(".link-input");
  $linkInputContainer.addEventListener("input", (event) => {
    const inputValue = event.target.value;
    if (inputValue.length > 300) {
      alert(ERROR.INVALID_INPUT_LENGTH(300));
    }
  });
  $linkInputContainer.innerHTML = `
    ${input({
    id: "link",
    labelText: "참고 링크",
    spanText: "매장 정보를 확인할 수 있는 링크를 입력해 주세요.",
    placeholder: "300자 이내로 입력해 주세요."
  })}
  `;
};
const nameInput = () => {
  const $inputContainer = $(".name-input");
  $inputContainer.innerHTML = `
    ${input({
    id: "name",
    labelText: "이름",
    isRequired: true,
    placeholder: "20자 이내로 입력해 주세요."
  })}
`;
  $inputContainer.addEventListener("input", (event) => {
    if (event.target.value.length > 20) {
      alert(ERROR.INVALID_INPUT_LENGTH(20));
    }
  });
  $inputContainer.addEventListener("change", (event) => {
    if (event.target.value.trim() === "") {
      alert(ERROR.INVALID_EMPTY_INPUT);
      event.target.value = "";
    }
  });
};
const restaurantAddModal = () => {
  const $modalContainer = $(".modal-container");
  $modalContainer.innerHTML = `
    <h2 class="modal-title text-title">새로운 음식점</h2>
    <form>
      <div class="form-item form-item--required category-select"></div>
      <div class="form-item form-item--required name-input"></div>
      <div class="form-item form-item--required distance-select">
      </div>
      <div class="form-item description-area"></div>
      <div class="form-item link-input"></div>
      <div class="button-container">
        <button type="button" class="button button--secondary">취소</button>
      </div>
    </form>
  `;
  buttonContainer();
  nameInput();
  linkInput();
  distanceSelect();
  categorySelect();
  description();
};
const categoryIcons = {
  korean: koreanIcon,
  chinese: chineseIcon,
  japanese: japaneseIcon,
  western: westernIcon,
  asian: asianIcon,
  etc: etcIcon
};
const categoryAlt = {
  korean: "한식",
  chinese: "중식",
  japanese: "일식",
  western: "양식",
  asian: "아시아식",
  etc: "기타"
};
const restaurantDetailModal = (restaurantData) => {
  const $modalContainer = $(".modal-container");
  $modalContainer.innerHTML = `
    <form>
      <div class="detail-header">
        <div class="restaurant__category">
            <img
              src="${categoryIcons[restaurantData.category]}"
              alt="${categoryAlt[restaurantData.category]}"
              class="category-icon"
            />
        </div>
        <div class="detail-favorite-icon">
          <img
            src="${restaurantData.isFavorite ? "/favorite-icon-filled.png" : "/favorite-icon-lined.png"}"
            alt="favorite icon"
          />
        </div>
      </div>
      <h2 class="detail-text text-title">${restaurantData.title}</h2>
      <div class="restaurant__info">
        ${text({
    tag: "span",
    size: "medium",
    color: "orange",
    children: `캠퍼스부터 ${restaurantData.distance}분 내`
  })}
        <p class="detail-text text-body">
          ${restaurantData.description}
        </p>
        <a class="text-body" href=${restaurantData.link}>
          ${restaurantData.link}
        </a>
      </div>
      <div class="detail-footer">
        <button type="button" class="button button--delete" data-delete-target="${restaurantData.id}">삭제하기</button>
        <button type="button" class="button button--close">닫기</button>
      </div>
    </form>
  `;
  const $detailFavoriteIcon = $(".detail-favorite-icon");
  $detailFavoriteIcon.addEventListener("click", () => {
    const $icon = document.createElement("img");
    restaurantData.isFavorite = !restaurantData.isFavorite;
    const imageSrc = restaurantData.isFavorite ? "/favorite-icon-filled.png" : "/favorite-icon-lined.png";
    $icon.src = imageSrc;
    $detailFavoriteIcon.replaceChildren($icon);
    const restaurants = getStorage("restaurants");
    const updatedRestaurants = restaurants.map(
      (restaurant) => restaurant.id === restaurantData.id ? restaurantData : restaurant
    );
    setStorage("restaurants", updatedRestaurants);
    const li = document.querySelector(`[data-id="${restaurantData.id}"]`);
    const $iconInList = li.querySelector(".favorite-icon");
    $iconInList.src = imageSrc;
  });
};
const modalHandler = () => {
  const $modal = $("#restaurant-modal");
  const toggleModal = () => {
    $modal.classList.toggle("modal--open");
    if ($modal.classList.contains("modal--open")) {
      document.body.style.overflow = "hidden";
      return;
    }
    document.body.style.overflow = "auto";
  };
  const manageModalEvents = (e) => {
    const target = e.target;
    if (target.closest(".restaurant")) {
      let currentTarget = target;
      while (currentTarget && !currentTarget.classList.contains("restaurant")) {
        currentTarget = currentTarget.parentNode;
      }
      if (!currentTarget) return;
      const currentRestaurantId = currentTarget.dataset.id;
      const restaurants = getStorage("restaurants") ?? [];
      const restaurantData = restaurants.find(
        ({ id }) => id === currentRestaurantId
      );
      toggleModal();
      restaurantDetailModal(restaurantData);
    }
    if (target.closest(".gnb__button")) {
      toggleModal();
      restaurantAddModal();
    }
    if (target.closest(".modal-backdrop") || target.closest(".button--secondary") || target.closest(".button--close")) {
      toggleModal();
    }
    if (target.closest(".button--delete")) {
      const deleteButton = target.closest(".button--delete");
      const currentRestaurantId = deleteButton.dataset.deleteTarget;
      if (!currentRestaurantId) return;
      const restaurants = getStorage("restaurants") ?? [];
      const updatedRestaurants = restaurants.filter(
        (restaurant) => restaurant.id !== currentRestaurantId
      );
      setStorage("restaurants", updatedRestaurants);
      updateRestaurantList();
      toggleModal();
    }
  };
  document.body.addEventListener("click", manageModalEvents);
};
const select = ({ id, name, options, className }) => {
  const select2 = document.createElement("select");
  select2.id = id;
  select2.name = name;
  select2.className = className;
  options.forEach(({ value, label }) => {
    const option = document.createElement("option");
    option.value = value;
    option.textContent = label;
    select2.appendChild(option);
  });
  return select2;
};
const categoryFilter = () => {
  const $categorySelect = select({
    id: "category-filter",
    options: CATEGORY_FILTER_OPTIONS
  });
  $(".restaurant-filter-container").appendChild($categorySelect);
  $categorySelect.addEventListener("change", (event) => {
    const isFavoriteTab = $(".favorite-restaurant-tab").classList.contains(
      "select-tab-button"
    );
    updateRestaurantList(isFavoriteTab);
  });
};
const sortingFilter = () => {
  const $sortingSelect = select({
    options: SORTING_FILTER_OPTIONS,
    id: "sorting-filter"
  });
  $(".restaurant-filter-container").appendChild($sortingSelect);
  $sortingSelect.addEventListener("change", (event) => {
    const isFavoriteTab = $(".favorite-restaurant-tab").classList.contains(
      "select-tab-button"
    );
    updateRestaurantList(isFavoriteTab);
  });
};
const tabHandler = (selectedTab) => {
  const $allTab = $(".all-restaurant-tab");
  const $favoriteTab = $(".favorite-restaurant-tab");
  [$allTab, $favoriteTab].forEach((tab) => {
    if (tab === selectedTab) {
      tab.classList.add("select-tab-button");
    } else {
      tab.classList.remove("select-tab-button");
    }
  });
  const isFavoriteTab = selectedTab === $favoriteTab;
  updateRestaurantList(isFavoriteTab);
};
const tabContainer = () => {
  const $restaurantTabContainer = $(".restaurant-tab-container");
  $restaurantTabContainer.innerHTML = `
    <button class="tab-button select-tab-button all-restaurant-tab">모든 음식점</button>
    <button class="tab-button favorite-restaurant-tab">자주 가는 음식점</button>
    <div class="select-effect"></div>
  `;
  const $allTab = $(".all-restaurant-tab");
  const $favoriteTab = $(".favorite-restaurant-tab");
  $allTab.addEventListener("click", () => tabHandler($allTab));
  $favoriteTab.addEventListener("click", () => tabHandler($favoriteTab));
};
const renderMainPage = () => {
  const restaurants = getStorage("restaurants") ?? [];
  tabContainer();
  renderRestaurantList(sortRestaurants(restaurants));
  categoryFilter();
  sortingFilter();
};
const eventHandler = () => {
  modalHandler();
};
const render = () => {
  renderMainPage();
};
render();
eventHandler();
