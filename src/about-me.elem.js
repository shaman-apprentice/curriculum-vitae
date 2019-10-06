import { BaseComponent } from './BaseComponent.js';

export class CurriculumVitaAboutMe extends BaseComponent {
  render(data) {
    this.innerHTML = `
      <section name="application-photo">
        <img src="./assets/application_photo.jpg" />
      </section>
      <img name="QR-code-to-webpage" src="./assets/QR-code-to-webpage.svg"/>
      <section name="about-me">
        ${data.reduce((acc, { name, content }) => {
          acc += `
            <span>${name}:</span>
            ${content}
          `;
          return acc;
        }, '')}
      </section>
    `;
  }
}
