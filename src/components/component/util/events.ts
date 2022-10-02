export const allEvents = (() => {
  const eventsSet: Set<string> = new Set<string>();

  for (const property in window) {
    if (/^on/.test(property)) {
      eventsSet.add(property.substring(2));
    }
  }

  return eventsSet;
})();

// Examples:
// <button on:click='
// <button on:load="
// <button on:load = "
// After this should come the event expression which should be a method.
export const literalEndsWithEventRegex = /on:\w+\s*=\s*['"]$/;
