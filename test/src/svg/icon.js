class Icon extends HTMLElement {
  get iconTemplateContent() {
    return document.querySelector(`template[name="${this.innerHTML || this.getAttribute('icon')}"]`).content
  }

  get iconTemplateTextContent() {
    return this.iconTemplateContent.cloneNode(true).children[0].outerHTML
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
      return strings.reduce((set, value) => set += value.join ? value.join('') : value , '')
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

      ${this.iconTemplateTextContent}
    `
  }
}

customElements.define('test-icon', Icon);

export { Icon };
