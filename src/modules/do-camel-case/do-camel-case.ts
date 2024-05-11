export const doCamelCase = (string: string) =>
  string
    .toLowerCase()
    .replace(/[^a-zA-Z0-9]+(.)/g, (chr) => chr.toUpperCase())
    .replace(/[@/$^%#&!?,;:+=<>(){}"«» ]/g, '');
