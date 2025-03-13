import { $ } from "../../../utils/domHelpers";
import buttonContainer from "./buttonContainer";
import categorySelect from "./categorySelect";
import description from "./description";
import distanceSelect from "./distanceSelect";
import linkInput from "./linkInput";
import nameInput from "./nameInput";

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

export default restaurantAddModal;
