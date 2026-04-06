class Icon extends HTMLElement {
  get iconTemplateContent() {
    return document.querySelector(
      `template[name="${this.innerHTML || this.getAttribute('icon')}"]`
    ).content
  }

  get iconTemplateTextContent() {
    return this.iconTemplateContent.cloneNode(true).children[0].outerHTML
  }

  constructor() {
    super()
    this.attachShadow({mode: 'open'})
  }

  connectedCallback() {
    super.connectedCallback && super.connectedCallback()
    this.shadowRoot.innerHTML = this.render()
  }

  render() {
    const html = (...strings) => {
      return strings.reduce(
        (set, value) => (set += value.join ? value.join('') : value),
        ''
      )
    }
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
            d="M160-120v-480l320-240 320 240v480H560v-280H400v280H160Z"
          /></svg
      ></md-icon>
      <md-icon
        ><svg
          xmlns="http://www.w3.org/2000/svg"
          width="48"
          height="48"
          viewBox="0 -960 960 960"
        >
          <path
            d="M453-280h60v-240h-60v240Zm50.5-323.2q9.5-9.2 9.5-22.8 0-14.45-9.48-24.22-9.48-9.78-23.5-9.78t-23.52 9.78Q447-640.45 447-626q0 13.6 9.48 22.8 9.48 9.2 23.5 9.2t23.52-9.2ZM480.27-80q-82.74 0-155.5-31.5Q252-143 197.5-197.5t-86-127.34Q80-397.68 80-480.5t31.5-155.66Q143-709 197.5-763t127.34-85.5Q397.68-880 480.5-880t155.66 31.5Q709-817 763-763t85.5 127Q880-563 880-480.27q0 82.74-31.5 155.5Q817-252 763-197.68q-54 54.31-127 86Q563-80 480.27-80Z"
          /></svg
      ></md-icon>
      ${this.iconTemplateTextContent}
    `
  }
}

customElements.define('test-icon', Icon)

export {Icon}
