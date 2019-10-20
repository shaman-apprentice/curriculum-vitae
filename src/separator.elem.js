export class CurriculumVitaSeparator extends HTMLElement {
  connectedCallback() {
    const hSize = this.getAttribute('h') || 3;

    this.innerHTML = `
      <h${hSize} class="h">${this.getAttribute('title')}</h${hSize}>
      <hr />
    `;
  }
}
