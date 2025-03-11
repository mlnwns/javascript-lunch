import { $ } from "./utils/domHelpers.js";
import { restaurants } from "./mock-data/restaurantData.js";
import modalHandler from "./eventHandler/modal.js";
import renderMainPage from "./views/mainPage/mainPage.js";

const eventHandler = () => {
  modalHandler();
};

const render = () => {
  renderMainPage();
};

render();
eventHandler();
