class Icon extends HTMLElement {
  get iconTemplateContent() {
    return document.querySelector(
      `template[name="${this.innerHTML || this.getAttribute('icon')}"]`,
    ).content;
  }

  get iconTemplateTextContent() {
    return this.iconTemplateContent.cloneNode(true).children[0].outerHTML;
  }

  constructor() {
    super();
    this.attachShadow({mode: 'open'});
  }

  connectedCallback() {
    super.connectedCallback && super.connectedCallback();
    this.shadowRoot.innerHTML = this.render();
  }

  render() {
    const html = (...strings) => {
      return strings.reduce(
        (set, value) => (set += value.join ? value.join('') : value),
        '',
      );
    };
    return html`
      <style>
        :host {
          --custom-icon-size: 24px;
          display: block;
          height: var(--custom-icon-size);
          width: var(--custom-icon-size);
        }
      </style>
      <md-icon
        ><svg
          xmlns="http://www.w3.org/2000/svg"
          width="48"
          height="48"
          viewBox="0 -960 960 960"
        >
          <path
            d="M220-180h150v-250h220v250h150v-390L480-765 220-570v390Zm-60 60v-480l320-240 320 240v480H530v-250H430v250H160Zm320-353Z"
          /></svg
      ></md-icon>
      ${this.iconTemplateTextContent}
    `;
  }
}

customElements.define('test-icon', Icon);

export {Icon};
