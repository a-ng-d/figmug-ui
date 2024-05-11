export const doKebabCase = (string: string) =>
  string
    .toLowerCase()
    .split(' ')
    .join('-')
    .replace(/[@/$^%#&!?,;:+=<>(){}"«»]/g, '')
