const textArea = (props) => {
  const {
    labelText,
    id,
    cols = "30",
    rows = "5",
    spanText,
    isRequired = false,
    placeholder = "",
  } = props;

  const required = isRequired ? "required" : "";

  return `
    <label for=${id} text-caption">${labelText}</label>
    <textarea
    name=${id}
    id=${id}
    cols=${cols}
    rows=${rows}
    ${required}
    maxLength= "1000"
    placeholder="${placeholder}"
    ></textarea>
    <span class="help-text text-caption">${spanText}</span>
    `;
};

export default textArea;
