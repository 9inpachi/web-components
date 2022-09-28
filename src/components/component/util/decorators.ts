export function template(template: string): ClassDecorator {
  return function (target) {
    // Sets `template` as the property of the decorated class. God bless the prototype chain.
    Reflect.defineProperty(target.prototype, 'template', {
      value: template,
    });
  };
}

export function styles(styles: string): ClassDecorator {
  return function (target) {
    // Sets `styles` as the property of the decorated class. God bless the prototype chain.
    Reflect.defineProperty(target.prototype, 'styles', {
      value: styles,
    });
  };
}

export function property(): PropertyDecorator {
  return function (target, propertyKey) {
    Reflect.defineProperty(target, propertyKey, {
      get() {
        return this.getAttribute(propertyKey);
      },
      set(value) {
        this.setAttribute(propertyKey, value);
      },
    });
  };
}
