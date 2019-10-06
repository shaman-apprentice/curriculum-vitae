const dataSrcAttri = 'data-src';

export class BaseComponent extends HTMLElement {
  get dataSrc() {
    return this.getAttribute(dataSrcAttri);
  }

  set dataSrc(v) {
    this.setAttribute(dataSrcAttri, v);
  }

  connectedCallback() {
    this.render(getData(this.dataSrc));
  }

  render(data) {}
}

function getData(dataSrc) {
  try {
    return dataSrc.split('.').reduce((acc, key) => acc[key], window);
  } catch (error) {
    throw new Error(
      `global window object does not have the in "${dataSrcAttri}" attribute specified key "${dataSrc}" for the data of this component`
    );
  }
}
