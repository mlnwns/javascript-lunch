import { $ } from "../utils/domHelpers";
import restaurantList from "../views/mainPage/components/restaurantList";
import { ERROR } from "../constants/messages";
import { escapeHtml } from "../utils/escapeHtml";
import { setStorage, getStorage } from "../utils/storage";

const buttonHandler = (event) => {
  event.preventDefault();

  const $form = event.target.closest("form");
  const $category = $("#category");
  const $name = $("#name");
  const $distance = $("#distance");
  const $description = $("#description");
  const $link = $("#link");

  const newRestaurant = {
    category: escapeHtml($category.value),
    title: escapeHtml($name.value),
    distance: escapeHtml($distance.value),
    description: escapeHtml($description.value),
    link: escapeHtml($link.value),
    isFavorite: false,
  };

  if (
    !newRestaurant.category ||
    !newRestaurant.title ||
    !newRestaurant.distance
  ) {
    alert(ERROR.INVALID_INPUT_REQUIRED);
    return;
  }

  const restaurantList = getStorage("restaurants");
  setStorage("restaurants", [...restaurantList, newRestaurant]);

  const $restaurantModal = $("#restaurant-modal");
  $restaurantModal.classList.remove("modal--open");

  $form.reset();

  restaurantList();
};

export default buttonHandler;
