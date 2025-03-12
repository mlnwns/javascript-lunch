import buttonContainer from "./components/buttonContainer";
import categoryFilter from "./components/categoryFilter";
import categorySelect from "./components/categorySelect";
import description from "./components/description";
import distanceSelect from "./components/distanceSelect";
import linkInput from "./components/linkInput";
import nameInput from "./components/nameInput";
import restaurantList from "./components/restaurantList";
import sortingFilter from "./components/sortingFilter";

const renderMainPage = () => {
  restaurantList();
  categoryFilter();
  sortingFilter();
  buttonContainer();
  nameInput();
  linkInput();
  distanceSelect();
  categorySelect();
  description();
};

export default renderMainPage;
