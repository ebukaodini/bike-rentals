declare module 'styled-components' {
  export interface DefaultTheme extends ITheme {}
}

export interface ITheme {
  primary: string
  active: string
  alt: string
  light: string
  altLight: string
  dark: string
  grey: string
  neutral: string
  success: string
  warning: string
  danger: string
}

export const Theme: ITheme = {
  primary: '#F68B1E',
  active: '#D87109',
  alt: '#0875C4',
  light: '#FEF2E6',
  altLight: '#E6F0FE',
  dark: '#311A02',
  grey: '#B1A395',
  neutral: '#F3F2F2',
  success: '#3E8D63',
  warning: '#FFC266',
  danger: '#F02517',
}
