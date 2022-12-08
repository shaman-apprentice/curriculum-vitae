const componentTemplate = document.createElement("template");
componentTemplate.innerHTML = `
  <section>
    <slot name="title">TITLE</slot>
  </section>
  <section class="entries">
    <slot name="entries">ENTRIES</slot>
  </section>
`;

export class ContentSectionComponent extends HTMLElement {
  constructor() {
    super();

    const shadowRoot = this.attachShadow({ mode: "open" });
    shadowRoot.appendChild(componentTemplate.content.cloneNode(true));
  }
}