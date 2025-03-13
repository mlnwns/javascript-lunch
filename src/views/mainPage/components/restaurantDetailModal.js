import { $ } from "../../../utils/domHelpers";
import koreanIcon from "/category-korean.png";
import chineseIcon from "/category-chinese.png";
import japaneseIcon from "/category-japanese.png";
import westernIcon from "/category-western.png";
import asianIcon from "/category-asian.png";
import etcIcon from "/category-etc.png";
import text from "../../../components/@common/text";
import { getStorage, setStorage } from "../../../utils/storage";

const categoryIcons = {
  korean: koreanIcon,
  chinese: chineseIcon,
  japanese: japaneseIcon,
  western: westernIcon,
  asian: asianIcon,
  etc: etcIcon,
};

const categoryAlt = {
  korean: "한식",
  chinese: "중식",
  japanese: "일식",
  western: "양식",
  asian: "아시아식",
  etc: "기타",
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
            src="${
              restaurantData.isFavorite
                ? "/favorite-icon-filled.png"
                : "/favorite-icon-lined.png"
            }"
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
          children: `캠퍼스부터 ${restaurantData.distance}분 내`,
        })}
        <p class="detail-text text-body">
          ${restaurantData.description}
        </p>
        <a class="text-body" href=${restaurantData.link}>
          ${restaurantData.link}
        </a>
      </div>
      <div class="detail-footer">
        <button type="button" class="button button--delete">삭제하기</button>
        <button type="button" class="button button--close">닫기</button>
      </div>
    </form>
  `;

  const $detailFavoriteIcon = $(".detail-favorite-icon");
  $detailFavoriteIcon.addEventListener("click", () => {
    const $icon = document.createElement("img");
    restaurantData.isFavorite = !restaurantData.isFavorite;
    const imageSrc = restaurantData.isFavorite
      ? "/favorite-icon-filled.png"
      : "/favorite-icon-lined.png";
    $icon.src = imageSrc;
    $detailFavoriteIcon.replaceChildren($icon);

    const restaurants = getStorage("restaurants");
    const updatedRestaurants = restaurants.map((restaurant) =>
      restaurant.id === restaurantData.id ? restaurantData : restaurant
    );
    setStorage("restaurants", updatedRestaurants);

    const li = document.querySelector(`[data-id="${restaurantData.id}"]`);
    const $iconInList = li.querySelector(".favorite-icon");

    $iconInList.src = imageSrc;
  });
};

export default restaurantDetailModal;
