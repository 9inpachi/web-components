import { camelCaseToKebabCase } from '../string';

export const property = (definedName?: string): PropertyDecorator => {
  return (target, propertyKey) => {
    const propertyName =
      definedName ?? camelCaseToKebabCase(propertyKey.toString());

    const descriptor: PropertyDescriptor = {
      get(this: Element) {
        return this.getAttribute(propertyName);
      },
      set(this: Element, value: string) {
        this.setAttribute(propertyName, value);
      },
    };

    return propertyKey !== undefined
      ? legacyProperty(target, propertyKey, descriptor)
      : currentProperty(target, descriptor);
  };
};

// For how property decorators worked before TC39 decorators proposal.
const legacyProperty = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  target: any,
  propertyKey: PropertyKey,
  descriptor: PropertyDescriptor,
) => {
  Reflect.defineProperty(target, propertyKey, descriptor);
};

// For TC39 decorators proposal.
const currentProperty = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  target: any,
  descriptor: PropertyDescriptor,
) => {
  return {
    kind: 'field',
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    key: (target as any)?.key,
    placement: 'own',
    descriptor,
  };
};