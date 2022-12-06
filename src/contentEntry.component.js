const componentTemplate = document.createElement("template");
componentTemplate.innerHTML = `
  <section class="date">
    <slot name="date"></slot>
  </section>
  <section class="header">
    <slot name="header">HEADER</slot>
  </section>
  <section class="description">
    <slot name="description"></slot>
  </section>
`;

export class ContentEntryComponent extends HTMLElement {
  constructor() {
    super();

    const shadowRoot = this.attachShadow({ mode: "open" });
    shadowRoot.appendChild(componentTemplate.content.cloneNode(true));
  }
}