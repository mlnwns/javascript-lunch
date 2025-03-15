import { $ } from "../utils/domHelpers.js";
import { getStorage, setStorage } from "../utils/storage.js";
import restaurantAddModal from "../views/mainPage/components/restaurantAddModal.js";
import restaurantDetailModal from "../views/mainPage/components/restaurantDetailModal.js";
import updateRestaurantList from "../views/mainPage/components/restaurantList.js";

const modalHandler = () => {
  const $restaurantAddButton = $(".gnb__button");
  const $modal = $("#restaurant-modal");
  const $modalBackdrop = $(".modal-backdrop");

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
      while (!currentTarget.classList.contains("restaurant")) {
        currentTarget = currentTarget.parentNode;
      }

      const currentRestaurantId = currentTarget.dataset.id;
      const restaurantData = getStorage("restaurants").find(
        ({ id }) => id === currentRestaurantId
      );

      toggleModal();
      restaurantDetailModal(restaurantData);
    }

    if (target.closest(".gnb__button")) {
      toggleModal();
      restaurantAddModal();
    }

    if (
      target.closest(".modal-backdrop") ||
      target.closest(".button--secondary") ||
      target.closest(".button--close")
    ) {
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

export default modalHandler;
