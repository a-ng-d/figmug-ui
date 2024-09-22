export class Case {
  string: string

  constructor(string: string) {
    this.string = string
  }

  doSnakeCase = () =>
    this.string
      .toLowerCase()
      .split(' ')
      .join('_')
      .replace(/[@/$^%#&!?,;:+=<>(){}"«»]/g, '')

  doPascalCase = () =>
    this.string.charAt(0).toUpperCase() +
    this.string
      .toLowerCase()
      .replace(/[^a-zA-Z0-9]+(.)/g, (chr) => chr.toUpperCase())
      .replace(/[@/$^%#&!?,;:+=<>(){}"«» ]/g, '')
      .slice(1)

  doKebabCase = () =>
    this.string
      .toLowerCase()
      .split(' ')
      .join('-')
      .replace(/[@/$^%#&!?,;:+=<>(){}"«»]/g, '')

  doCamelCase = () =>
    this.string
      .toLowerCase()
      .replace(/[^a-zA-Z0-9]+(.)/g, (chr) => chr.toUpperCase())
      .replace(/[@/$^%#&!?,;:+=<>(){}"«» ]/g, '')
}
