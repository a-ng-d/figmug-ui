export const doSnakeCase = (string: string) =>
  string
    .toLowerCase()
    .split(' ')
    .join('_')
    .replace(/[@/$^%#&!?,;:+=<>(){}"«»]/g, '');
