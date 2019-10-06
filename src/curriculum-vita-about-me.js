import { BaseComponent } from './BaseComponent.js';

export class CurriculumVitaAboutMe extends BaseComponent {
  render(data) {
    this.innerHTML = `
      <section name="application-photo">
        <img src="/assets/application_photo.jpg" />
      </section>
      <section name="about-me">
        ${data.reduce((acc, { name, lines }) => {
          acc += `
            <p>${name}:</p>
            <p>${lines.slice(1).reduce((acc, line) => {
              acc += `<br/>${line}`;
              return acc;
            }, lines[0])}</p>
          `;
          return acc;
        }, '')}
      </section>
    `;
  }
}
