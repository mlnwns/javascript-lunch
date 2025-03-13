import { $ } from "../utils/domHelpers.js";
import { getStorage } from "../utils/storage.js";
import restaurantAddModal from "../views/mainPage/components/restaurantAddModal.js";
import restaurantDetailModal from "../views/mainPage/components/restaurantDetailModal.js";

const modalHandler = () => {
  const $restaurantAddButton = $(".gnb__button");
  const $modal = $("#restaurant-modal");
  const $modalContainer = $(".modal-container");
  const $modalBackdrop = $(".modal-backdrop");

  const $listContainer = $(".restaurant-list");

  const toggleModal = () => {
    $modal.classList.toggle("modal--open");
  };

  const manageModalEvents = (e) => {
    const target = e.target;
    if (target.closest(".restaurant")) {
      let currentTarget = target;

      while (currentTarget.className !== "restaurant") {
        currentTarget = currentTarget.parentNode;
      }
      const targetId = currentTarget.dataset.id;
      const restaurantData = getStorage("restaurants").find(
        ({ id }) => id === targetId
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
      target.closest(".button--secondary")
    ) {
      toggleModal();
    }
  };

  document.body.addEventListener("click", manageModalEvents);
};

export default modalHandler;
