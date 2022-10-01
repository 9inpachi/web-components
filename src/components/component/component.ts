export interface Component {
  template: string;
  styles: string;
}

export abstract class Component extends HTMLElement {
  private shadowDOM: ShadowRoot;

  protected init?(): void;

  constructor() {
    super();

    this.shadowDOM = this.attachShadow({ mode: 'open' });

    setTimeout(() => {
      this.styles && this.shadowDOM.appendChild(this.processStyles());
      this.template && this.shadowDOM.appendChild(this.processTemplate());
      this.init?.();
    });
  }

  private processStyles() {
    const link = document.createElement('link');
    link.setAttribute('rel', 'stylesheet');
    link.setAttribute('href', this.styles);

    return link;
  }

  protected processTemplate() {
    let processedTemplate: string;

    try {
      const properties = Object.getOwnPropertyNames(this);
      const values = Object.values(this);

      processedTemplate = new Function(
        ...properties,
        `return \`${this.template}\`;`,
      ).apply(this, ...values);
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

  protected getElement(name: string): HTMLElement | null {
    return this.shadowDOM.querySelector(`*[\\:${name}]`);
  }
}
