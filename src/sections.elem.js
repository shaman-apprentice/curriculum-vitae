import { BaseComponent } from './BaseComponent.js';

export class CurriculumVitaSections extends BaseComponent {
  render(data) {
    this.innerHTML = data
      .map(
        (_, i) => `
        <curriculum-vita-section
          data-src=${`${this.dataSrc}.${i}`}
        >
        </curriculum-vita-section>
      `
      )
      .join('');
  }
}
