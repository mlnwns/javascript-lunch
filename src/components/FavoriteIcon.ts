import "../../templates/blank-favorite-icon.png";
import "../../templates/filled-favorite-icon.png";

import EventComponent, {
  EventListenerRegistration,
} from "../abstract/EventComponent";

import { TOGGLE_FAVORITE_EVENT } from "../constants/event";
import favoriteStore from "../store/favoriteStore";

const blankIconPath = "./blank-favorite-icon.png";
const filledIconPath = "./filled-favorite-icon.png";

export default class FavoriteIcon extends EventComponent {
  protected eventHandlerRegistrations: EventListenerRegistration[] = [
    {
      target: this,
      eventName: "click",
      handler: this.handleIconClick.bind(this),
    },
    {
      target: document,
      eventName: TOGGLE_FAVORITE_EVENT,
      handler: (e) => this.handleToggleFavoriteEvent(e as CustomEvent),
    },
  ];

  protected getTemplate(): string {
    const isActive = this.getAttribute("isActive") === "true";

    return `
      <div class="favorite-icon">
        <img class="favorite-icon-img" src=${
          isActive ? filledIconPath : blankIconPath
        } alt="좋아하는 식당 아이콘" />
      </div>
    `;
  }

  private handleIconClick() {
    const itemName = this.getAttribute("itemName") ?? "";
    const changesToActive = !(this.getAttribute("isActive") === "true");

    favoriteStore.toggle(itemName, changesToActive);

    this.dispatchCustomEvent(TOGGLE_FAVORITE_EVENT, {
      itemName,
      changesToActive,
    });
  }

  private handleToggleFavoriteEvent(
    e: CustomEvent<{ itemName: string; changesToActive: boolean }>
  ) {
    const { itemName, changesToActive } = e.detail;

    if (itemName === this.getAttribute("itemName")) {
      this.toggleFavorite(changesToActive);
      this.init();
    }
  }

  private toggleFavorite(changesToActive: boolean) {
    this.setAttribute("isActive", String(changesToActive));
  }
}
