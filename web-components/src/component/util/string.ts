export const camelCaseToKebabCase = (value: string) => {
  return value.replace(/[A-Z]/g, (letter) => `-${letter.toLowerCase()}`);
};

export const evaluateStringTemplate = <T extends object>(
  template: string,
  context: T,
): string => {
  const properties = Object.getOwnPropertyNames(context);
  const values = Object.values(context);
  const evaluationFunction = new Function(
    ...properties,
    `return \`${template}\`;`,
  );

  return evaluationFunction.apply(context, ...values);
};
