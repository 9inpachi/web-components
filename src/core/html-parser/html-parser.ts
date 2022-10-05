import { Component } from '../../components/component/component';
import { IHTMLParser } from './ihtml-parser';

const eventPrefix = 'on:';

export class HTMLParser implements IHTMLParser {
  private parsedFragment: DocumentFragment;

  constructor(htmlString: string, private componentContext: Component) {
    const parser = new DOMParser();
    const parsedHTML = parser.parseFromString(htmlString, 'text/html');
    const body = parsedHTML.querySelector('body');
    this.parsedFragment = document.createDocumentFragment();

    if (body) {
      for (const child of body.children) {
        this.parsedFragment.appendChild(child);
      }
    }
  }

  processEventListeners() {
    const rootElement = this.getRootElement();

    const addEventListenersToNodes = (node: Element) => {
      for (const attribute of node.getAttributeNames()) {
        if (attribute.startsWith(eventPrefix)) {
          const eventListener = node.getAttribute(attribute);

          if (eventListener) {
            node.addEventListener(
              attribute.substring(eventPrefix.length),
              // Evaluate the wrapper function (`new Function`) in component's context
              // to return the right value of `this.onClick`.
              // And then make the listener run in the component's context.
              new Function(`return ${eventListener}`)
                .apply(this.componentContext)
                .bind(this.componentContext),
            );
          }
        }

        for (const child of node.children) {
          addEventListenersToNodes(child);
        }
      }
    };

    rootElement && addEventListenersToNodes(rootElement);
  }

  getAttributesMap(): { [key: string]: string } {
    throw new Error('Method not implemented.');
  }

  getRootElement(): Element | null {
    return this.parsedFragment.firstElementChild;
  }
}
