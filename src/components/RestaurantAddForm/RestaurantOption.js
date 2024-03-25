import { SORT_OPTIONS } from "../../constants/MenuApp";
import { $ } from "../../utils/dom";
import restaurantValidator from "../../validators/restaurantValidator";
import BaseComponent from "../common/BaseComponent";

class RestaurantOptions extends BaseComponent {
  render() {
    const optionsArray = this.getAttribute("options").split(",");
    const valuesArray = this.getAttribute("values").split(",");
    const id = this.getAttribute("id");
    const text = this.#getOptionText(id);

    this.innerHTML = `        
    <div class="form-item form-item--required">
        <label for="${id}-select">${text}</label>
        <select name="${id}" id=${id}-select>
          ${optionsArray.map((option, index) => {
            return `<option value=${valuesArray[index]}>${option}</option>;`;
          })}
        </select>
        <p class="hidden text-caption error-message" id=${id}-select-error-message>옵션을 선택해주세요</p>
    </div>`;
  }

  #getOptionText(id) {
    return SORT_OPTIONS[id];
  }

  #isSelected() {
    const id = this.getAttribute("id");
    return restaurantValidator.isSelected($(`#${id}-select`).value);
  }

  setEvent() {
    const id = this.getAttribute("id");
    document.addEventListener("add-form-submit", (e) => {
      this.#isSelected()
        ? $(`#${id}-select-error-message`).classList.add("hidden")
        : $(`#${id}-select-error-message`).classList.remove("hidden");
    });
  }
}

customElements.define("restaurant-option", RestaurantOptions);
