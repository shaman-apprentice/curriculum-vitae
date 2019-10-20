import { BaseComponent } from './BaseComponent.js';

export class CurriculumVitaSkills extends BaseComponent {
  render(data) {
    this.innerHTML = `
      <h3 class="curriculum-vita-separator">${data.heading}</h3>
      <hr class="curriculum-vita-separator"/>
      <section name="skill-entries">
        ${data.entries.map(renderEntry).join('')}
      </section>
    `;
  }
}

function renderEntry({ title, entries }) {
  return `
    <section>
      <h4>${title}</h4>
      <hr />
      ${entries.map(entry => `<p>${entry}</p>`).join('')}
    </section>
  `;
}
