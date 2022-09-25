export interface Component {
  template: string;
  styles: string;
}

export abstract class Component extends HTMLElement {
  private shadowDOM: ShadowRoot;

  constructor() {
    super();

    this.shadowDOM = this.attachShadow({ mode: 'open' });

    this.shadowDOM.appendChild(this.processStyles());
    this.shadowDOM.appendChild(this.processTemplate());
  }

  private processStyles() {
    const link = document.createElement('link');
    link.setAttribute('rel', 'stylesheet');
    link.setAttribute('href', this.styles);

    return link;
  }

  private processTemplate() {
    const element = new Element();
    element.innerHTML = `\`${this.template}\``;

    return element;
  }
}
