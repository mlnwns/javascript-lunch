import { Restaurant } from "../types/type.js";
import { $ } from "../utils/domHelpers.js";
import { StorageController } from "../utils/storage.js";
import restaurantAddModal from "../views/mainPage/components/restaurantAddModal.js";
import restaurantDetailModal from "../views/mainPage/components/restaurantDetailModal.js";
import updateRestaurantList from "../views/mainPage/components/restaurantList.js";

const restaurantStorage = new StorageController<Restaurant[]>("restaurants");

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

  const manageModalEvents = (e: MouseEvent) => {
    const target = e.target as HTMLElement;

    if (target.closest(".restaurant")) {
      let currentTarget: HTMLElement | null = target;
      while (currentTarget && !currentTarget.classList.contains("restaurant")) {
        currentTarget = currentTarget.parentNode as HTMLElement | null;
      }
      if (!currentTarget) return;

      const currentRestaurantId = currentTarget.dataset.id;
      const restaurants: Restaurant[] = restaurantStorage.getStorage() ?? [];
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

    if (
      target.closest(".modal-backdrop") ||
      target.closest(".button--secondary") ||
      target.closest(".button--close")
    ) {
      toggleModal();
    }

    if (target.closest(".button--delete")) {
      const deleteButton = target.closest(".button--delete") as HTMLElement;
      const currentRestaurantId = deleteButton.dataset.deleteTarget;

      if (!currentRestaurantId) return;

      const restaurants: Restaurant[] = restaurantStorage.getStorage() ?? [];
      const updatedRestaurants = restaurants.filter(
        (restaurant) => restaurant.id !== currentRestaurantId
      );

      restaurantStorage.setStorage(updatedRestaurants);
      updateRestaurantList();
      toggleModal();
    }
  };

  document.body.addEventListener("click", manageModalEvents);
};

export default modalHandler;
