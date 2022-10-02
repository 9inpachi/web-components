export interface IHTMLParser {
  processEventListeners(): void;
  getAttributesMap(): { [key: string]: string };
  getRootElement(): Element | null;
}
