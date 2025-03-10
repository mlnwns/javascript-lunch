import { $ } from "../../utils/domHelpers";

const input = (props) => {
  const {
    labelText,
    id,
    isRequired = false,
    spanText = "",
    placeholder = "",
  } = props;

  const required = isRequired ? "required" : "";

  return `
        <label for="${id} text-caption">${labelText}</label>
        <input type="text" name=${id} id=${id} ${required} placeholder="${placeholder}"/>
        <span class="help-text text-caption">${spanText}</span>
    `;
};

export default input;
