export function template(template: string): ClassDecorator {
  return function (target) {
    // Sets `template` as the property of the decorated class. God bless the prototype chain.
    Object.defineProperty(target.prototype, 'template', {
      value: template,
    });
  };
}
