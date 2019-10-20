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
    <section name="what">
      <h4>${entry.title}</h4>
      <p>${entry.description || ''}</p>
    </section> 
  `;
}
