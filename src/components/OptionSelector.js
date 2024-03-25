import BaseComponent from "./common/BaseComponent.js";

class OptionSelector extends BaseComponent {
  render() {
    const optionsArray = this.getAttribute("options").split(",");
    const type = this.getAttribute("type");

    this.innerHTML = `
      <select name="${type}" id="${type}-filter" class="restaurant-filter">
        ${optionsArray.map((option) => {
          return `<option value=${option}>${option}</option>`;
        })}
      </select> 
    `;
  }

  setEvent() {
    const selectType = this.getAttribute("type");

    this.addEventListener("change", (e) => {
      const selectedValue = e.target.value;

      this.emitEvent("select-change", {
        type: selectType,
        option: selectedValue,
      });
    });
  }
}

customElements.define("option-selector", OptionSelector);
