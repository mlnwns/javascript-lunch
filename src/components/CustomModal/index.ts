import './style.css';

class CustomModal extends HTMLElement {
  constructor() {
    super();

    const shadow = this.attachShadow({ mode: 'open' });

    shadow.innerHTML = /* html */ `
    <style>
      .modal {
        display: none;
      }
      
      .modal.open {
        display:block;
        z-index: 3;
        width: inherit;
        height: inherit
      }

      .modal-backdrop {
        position:absolute;
        top:0;
        left:0;
        height: inherit;
        width: inherit;
        background:rgba(0, 0, 0, 0.35);
      }

      .modal-container {
        width: inherit;
        max-height: 85%;
        position: absolute;
        bottom: 0;
        border-radius: 8px 8px 0px 0px;
        background: var(--lunch-grey-scale-1-color);
        padding: 32px 16px;
        box-sizing: border-box;
        -ms-overflow-style: none; /* IE와 Edge */
        scrollbar-width: none; /* 파이어폭스 */
        overflow-y:scroll
      }
    
    </style>
      <div class="modal">
        <div class="modal-backdrop"></div>
        <div class="modal-container">
          <slot name="child"></slot>
        </div>
      </div>
    `;
  }
}

customElements.define('custom-modal', CustomModal);
