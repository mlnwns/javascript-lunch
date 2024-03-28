import createRestaurantIcon from '/src/assets/image/add-button.png';
import restaurantKoreanIcon from '/src/assets/image/category-korean.png';
import restaurantChineseIcon from '/src/assets/image/category-chinese.png';
import restaurantJapaneseIcon from '/src/assets/image/category-japanese.png';
import restaurantWesternIcon from '/src/assets/image/category-western.png';
import restaurantAsianIcon from '/src/assets/image/category-asian.png';
import restaurantEtcIcon from '/src/assets/image/category-etc.png';
import favoriteIconFilled from '/src/assets/image/favorite-icon-filled.png';
import favoriteIconLined from '/src/assets/image/favorite-icon-lined.png';

const IMAGE = {
  url: {
    버튼_음식점추가: createRestaurantIcon,
    버튼_즐겨찾기등록됨: favoriteIconFilled,
    버튼_즐겨찾기해제됨: favoriteIconLined,
    한식: restaurantKoreanIcon,
    중식: restaurantChineseIcon,
    일식: restaurantJapaneseIcon,
    양식: restaurantWesternIcon,
    아시안: restaurantAsianIcon,
    기타: restaurantEtcIcon,
  },
};

export { IMAGE };
