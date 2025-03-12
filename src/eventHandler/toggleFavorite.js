const toggleFavorite = (event) => {
  const $icon = event.target;

  if ($icon.classList.contains("favorite-icon")) {
    if ($icon.src.includes("/favorite-icon-filled.png")) {
      $icon.src = "/favorite-icon-lined.png";
    } else {
      $icon.src = "/favorite-icon-filled.png";
    }
  }
};

export default toggleFavorite;
