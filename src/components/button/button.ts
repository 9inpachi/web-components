import { Component } from '../component/component';
import { styles, template } from '../component/util/decorators';

import buttonTemplate from './button.html';
import buttonStyles from './button.css';

@template(buttonTemplate)
@styles(buttonStyles)
export class Button extends Component {
  constructor() {
    super();
    this.addEventListener('click', this.onClick.bind(this));
  }

  onClick() {
    console.log('Hello world');
  }
}

customElements.define('x-button', Button);
