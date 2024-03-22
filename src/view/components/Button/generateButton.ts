import createElementByTag from "../../utils/createElementByTag";

export interface ButtonProps {
  value: string;
  classes?: string[];
  onClickHandler?: (e: Event) => void;
}

const generateButton = ({
  value,
  classes = [],
  onClickHandler = () => {},
}: ButtonProps): HTMLButtonElement => {
  const button = createElementByTag({
    tag: "button",
    classes,
    contents: value,
  });

  if (!(button instanceof HTMLButtonElement)) {
    throw new Error(
      "[ERROR_IN_generateButton()] Button이 HTMLButtonElement가 아닙니다."
    );
  }

  button.addEventListener("click", onClickHandler);
  return button;
};

export default generateButton;
