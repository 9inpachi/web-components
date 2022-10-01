import { Component } from '../component/component';
import { template, styles, property } from '../component/util/decorators';

import buttonTemplate from './button.html';
import buttonStyles from './button.css';

@template(buttonTemplate)
@styles(buttonStyles)
export class Button extends Component {
  @property()
  test = 'default';

  init() {
    this.getElement('myButton')?.addEventListener('click', console.log);
  }
}

customElements.define('x-button', Button);
