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
    let processedTemplate: string;

    try {
      processedTemplate = new Function(
        ...Object.getOwnPropertyNames(this),
        `return \`${this.template}\`;`,
      )(...Object.values(this));
    } catch (error) {
      throw new Error(
        ['Unable to process HTML template', this.template, error].join('\n\n'),
      );
    }

    const fragment = document
      .createRange()
      .createContextualFragment(processedTemplate);

    return fragment;
  }
}
