import { CHARACTER_LIMIT, MESSAGE, ProtocolEnum } from '../constants';
import { RestaurantInfo } from '../types';

class Restaurant {
  #info!: RestaurantInfo;

  constructor(info: RestaurantInfo) {
    this.#validateInfo(info);
    this.#info = info;
  }

  get info() {
    return JSON.parse(JSON.stringify(this.#info)) as RestaurantInfo;
  }

  #validateInfo(info: RestaurantInfo) {
    this.#validateNameCharacterLimit(info.name);

    if (info.description) {
      this.#validateDescriptionCharacterLimit(info.description);
    }

    if (info.link) {
      this.#validateLinkCharacterLimit(info.link);
      this.#validateLinkEnglishChars(info.link);
      this.#validateLinkProtocol(info.link);
    }
  }

  #validateNameCharacterLimit(name: string) {
    if (name.trim().length === 0 || name.length > CHARACTER_LIMIT.name) {
      throw new Error(MESSAGE.nameHasInvalidCharacterLimit);
    }
  }

  #validateDescriptionCharacterLimit(description: string) {
    if (
      description.trim().length === 0 ||
      description.length > CHARACTER_LIMIT.description
    ) {
      throw new Error(MESSAGE.descriptionHasInvalidCharacterLimit);
    }
  }

  #validateLinkCharacterLimit(link: string) {
    if (link.length > CHARACTER_LIMIT.link) {
      throw new Error(MESSAGE.linkHasInvalidCharacterLimit);
    }
  }

  #validateLinkEnglishChars(link: string) {
    if (/[가-힣]/.test(link)) {
      throw new Error(MESSAGE.linkHasInvalidChars);
    }
  }

  #validateLinkProtocol(link: string) {
    const pass =
      link.startsWith(`${ProtocolEnum.http}://`) ||
      link.startsWith(`${ProtocolEnum.https}://`);

    if (!pass) {
      throw new Error(MESSAGE.linkHasInvalidProtocol);
    }
  }
}

export default Restaurant;
