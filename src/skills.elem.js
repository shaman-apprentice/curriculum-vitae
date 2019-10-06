import { BaseComponent } from './BaseComponent.js';

export class CurriculumVitaSkills extends BaseComponent {
  render(data) {
    this.innerHTML = `
      <curriculum-vita-separator title="${
        data.heading
      }"></curriculum-vita-separator>
      <section name="skill-entries">
        ${data.entries.map(renderEntry).join('')}
      </section>
    `;
  }
}

function renderEntry({ title, entries }) {
  return `
    <section>
      <curriculum-vita-separator title="${title}" h="4"></curriculum-vita-separator
      ${entries.map(entry => `<p>${entry}</p>`).join('')}
    </section>
  `;
}
