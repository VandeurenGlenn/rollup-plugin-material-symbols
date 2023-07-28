// @material-symbols

class Icon extends HTMLElement {
  get iconTemplateContent() {
    return document.querySelector(`template[name="${this.innerHTML || this.getAttribute('icon')}"]`).content
  }

  get iconTemplateTextContent() {
    return this.iconTemplateContent.cloneNode(true).textContent
  }

  constructor() {
    super()
    this.attachShadow({mode: 'open'})
  }

  connectedCallback() {
    super.connectedCallback && super.connectedCallback();
    this.shadowRoot.innerHTML = this.render()
  }

  render() {
    const html = (...strings) => {
      return strings.reduce((set, value) => set += value.join ? value.join('') : value , '')
    }
    return html`
      <style>
        :host {
          --custom-icon-size: 24px;
          display: flex;
          font-variation-settings:
          'FILL' 0,
          'wght' 400,
          'GRAD' 0,
          'opsz' 48;
          font-family: 'Material Symbols Outlined';
          font-size: var(--custom-icon-size);
          line-height: var(--custom-icon-size);
          height: var(--custom-icon-size);
          width: var(--custom-icon-size);
        }
      </style>

      ${this.iconTemplateTextContent}
    `
  }
}

customElements.define('test-icon', Icon)

export {Icon}
