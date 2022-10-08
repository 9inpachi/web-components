import { Component } from '../../component/component';
import { template, styles, property } from '../../component/util/decorators';

import buttonTemplate from './button.html';
import buttonStyles from './button.css';

@template(buttonTemplate)
@styles(buttonStyles)
export class Button extends Component {
  @property()
  elementProp = 'default';

  onClick() {
    alert(`Button with element-prop="${this.elementProp}" clicked.`);
  }
}

customElements.define('test-button', Button);
