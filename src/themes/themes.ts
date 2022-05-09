declare module 'styled-components' {
  export interface DefaultTheme extends ITheme {}
}

export interface ITheme {
  primary: string
  active: string
  secondary: string
  light: string
  dark: string
  grey: string
}

export const Theme: ITheme = {
  primary: '#F68B1E',
  active: '#D87109',
  secondary: '#0875C4',
  light: '#FEF2E6',
  dark: '#311A02',
  grey: '#9C8A78'
}
