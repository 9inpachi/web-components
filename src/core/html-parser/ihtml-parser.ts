export interface IHTMLParser {
  processEventListeners(): void;
  getRootElement(): Element | null;
}
