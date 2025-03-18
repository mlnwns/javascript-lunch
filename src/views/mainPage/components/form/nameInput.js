import input from "../../../../components/@common/input";
import { ERROR } from "../../../../constants/messages";
import { $ } from "../../../../utils/domHelpers";

const nameInput = () => {
  const $inputContainer = $(".name-input");

  const existingInput = $("#name");
  if (existingInput) {
    existingInput.remove();
  }

  $inputContainer.innerHTML = `
    ${input({
      id: "name",
      labelText: "이름",
      isRequired: true,
      placeholder: "20자 이내로 입력해 주세요.",
    })}
`;

  const $nameInput = $("#name");

  $nameInput.addEventListener("input", (event) => {
    if (event.target.value.length > 20) {
      alert(ERROR.INVALID_INPUT_LENGTH(20));
    }
  });

  $nameInput.addEventListener("change", (event) => {
    if (event.target.value.trim() === "") {
      alert(ERROR.INVALID_EMPTY_INPUT);
      event.target.value = "";
    }
  });
};

export default nameInput;
