
export interface ISchema {
  palette: PaletteSchema[]
}

export interface PaletteSchema {
  name: string
  id: string
  colors: string[]
}
