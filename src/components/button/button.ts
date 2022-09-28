import { Component } from '../component/component';
import { property, styles, template } from '../component/util/decorators';

import buttonTemplate from './button.html';
import buttonStyles from './button.css';

@template(buttonTemplate)
@styles(buttonStyles)
export class Button extends Component {
  @property()
  test!: string;

  constructor() {
    super();
    console.log(this.test);
  }
}

customElements.define('x-button', Button);
