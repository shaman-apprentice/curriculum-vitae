import { BaseComponent } from './BaseComponent.js';

export class CurriculumVitaSection extends BaseComponent {
  render(data) {
    this.innerHTML = `
      <curriculum-vita-separator title="${
        data.title
      }"></curriculum-vita-separator>
      <section name="entries">
        ${data.entries.map(renderSectionContent).join('')}
      </section>
    `;
  }
}

function renderSectionContent(entry) {
  return `
    <section name="date">${entry.date || ''}</section>
    <section name="what" ${
      entry.hackyPageBreak ? getHackyPageBreak(entry.hackyPageBreak) : ''
    }>
      <h4>${entry.title}</h4>
      <p>${entry.description || ''}</p>
    </section> 
  `;
}

/** see print.css for reasoning */
function getHackyPageBreak(value) {
  return `hacky-page-break style="--hacky-page-break: ${value};"`;
}
