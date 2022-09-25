import { template } from './lib/decorators';

export interface Component {
  template: string;
}

export abstract class Component extends HTMLElement {
  constructor() {
    super();
    console.log(this.template);
  }
}

@template('test string')
class TestClass extends Component {
  someProp = 'test';
  constructor() {
    super();
    console.log(this.template);
  }
}

customElements.define('test-element', TestClass);
