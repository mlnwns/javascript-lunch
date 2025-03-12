import dropDown from "../../../components/@common/dropDown";
import { CATEGORY_OPTIONS } from "../../../constants/options";
import { $ } from "../../../utils/domHelpers";

const categorySelect = () => {
  const $categorySelectContainer = $(".category-select");

  $categorySelectContainer.innerHTML = `
    ${dropDown({
      id: "category",
      labelText: "카테고리",
      options: CATEGORY_OPTIONS,
      isRequired: true,
    })}
  `;
};

export default categorySelect;
