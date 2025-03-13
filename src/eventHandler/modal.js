import { $ } from "../utils/domHelpers.js";
import restaurantAddModal from "../views/mainPage/components/restaurantAddModal.js";

const modalHandler = () => {
  const $restaurantAddButton = $(".gnb__button");
  const $modal = $("#restaurant-modal");
  const $modalContainer = $(".modal-container");
  const $modalBackdrop = $(".modal-backdrop");

  const toggleModal = () => {
    $modal.classList.toggle("modal--open");
  };

  $restaurantAddButton.addEventListener("click", () => {
    toggleModal();
    restaurantAddModal();
  });
  $modalBackdrop.addEventListener("click", toggleModal);

  $modalContainer.addEventListener("click", (event) => {
    if (event.target.classList.contains("button--secondary")) {
      toggleModal();
    }
  });
};

export default modalHandler;
