import * as xssFilters from 'xss-filters';

import './style.css';

import { Attributes } from '../../types';
import { setObjectAttribute } from '../../utils';

class CustomTextarea extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    const attributes: Attributes = {
      id: this.getAttribute('id'),
      name: this.getAttribute('name'),
      cols: this.getAttribute('clos'),
      rows: this.getAttribute('rows'),
      placeholder: this.getAttribute('placeholder'),
      maxLength: this.getAttribute('max-length'),
    };

    const $textarea = setObjectAttribute(
      attributes,
      document.createElement('textarea'),
    );

    this.appendChild($textarea);

    $textarea.addEventListener('change', (event) => this.#handleChange(event));
  }

  #handleChange(event: Event) {
    const eventTarget = event.target;

    if (eventTarget instanceof HTMLTextAreaElement) {
      const { value } = eventTarget;

      eventTarget.value = xssFilters.inHTMLData(value);
    }
  }
}

customElements.define('custom-textarea', CustomTextarea);
