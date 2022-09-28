export const camelCaseToKebabCase = (value: string) => {
  return value.replace(/[A-Z]/g, (letter) => `-${letter}`);
};
