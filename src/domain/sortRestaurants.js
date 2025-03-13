import { SORTING_DEFAULT } from "../constants/options";

export const sortRestaurants = (
  restaurants,
  sortingCriteria = SORTING_DEFAULT
) => {
  return [...restaurants].sort((a, b) => {
    if (sortingCriteria === "name") return a.title.localeCompare(b.title);
    if (sortingCriteria === "distance") return a.distance - b.distance;
    return 0;
  });
};
