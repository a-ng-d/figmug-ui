export const doPascalCase = (string: string) =>
  string.charAt(0).toUpperCase() +
  string
    .toLowerCase()
    .replace(/[^a-zA-Z0-9]+(.)/g, (chr) => chr.toUpperCase())
    .replace(/[@/$^%#&!?,;:+=<>(){}"«» ]/g, '')
    .slice(1);
