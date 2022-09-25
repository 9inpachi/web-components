export function template(template: string): ClassDecorator {
  return function (target) {
    // Sets `template` as the property of the decorated class. God bless the prototype chain.
    Object.defineProperty(target.prototype, 'template', {
      value: template,
    });
  };
}

export function styles(styles: string): ClassDecorator {
  return function (target) {
    // Sets `styles` as the property of the decorated class. God bless the prototype chain.
    Object.defineProperty(target.prototype, 'styles', {
      value: styles,
    });
  };
}