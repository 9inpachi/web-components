import { Component } from '../../components/component/component';
import { IHTMLParser } from './ihtml-parser';

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
        if (attribute.startsWith('on:')) {
          const eventListener = node.getAttribute(attribute);

          if (eventListener) {
            node.addEventListener(
              attribute.substring(3),
              new Function(eventListener).bind(this.componentContext),
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
