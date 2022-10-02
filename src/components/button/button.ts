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
    this.getElement('myButton')?.addEventListener('click', this.onClick);
  }

  onClick(event: MouseEvent) {
    console.log(event);
    console.log(this, this.getAttribute('class'));
  }
}

customElements.define('x-button', Button);
