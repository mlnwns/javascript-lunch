import { $ } from "../../../utils/domHelpers";
import textArea from "../../../components/@common/textArea";
import { ERROR } from "../../../constants/messages";

const description = () => {
  const $descriptionContainer = $(".description-area");

  $descriptionContainer.addEventListener("input", (event) => {
    if (event.target.value.length > 1000) {
      alert(ERROR.INVALID_INPUT_LENGTH(1000));
    }
  });

  $descriptionContainer.innerHTML = textArea({
    labelText: "설명",
    id: "description",
    spanText: "메뉴 등 추가 정보를 입력해 주세요.",
    placeholder: "1000자 이내로 입력해 주세요.",
  });

  return $descriptionContainer;
};

export default description;
