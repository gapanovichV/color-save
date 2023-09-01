import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {PaletteSchema} from "entities/Palette";
import {ISchema} from "entities/Palette/model/types/paletteSchema.ts";


export const LOCAL_STORAGE_PALETTE_KEY = 'palettes';

const defaultList = (localStorage.getItem(LOCAL_STORAGE_PALETTE_KEY)) || '[]';
const initialState: ISchema = {palette: JSON.parse(defaultList)}

export const paletteSlice = createSlice({
  name: 'palette',
  initialState,
  reducers: {
    addPalette(state, action: PayloadAction<PaletteSchema>) {
      state.palette.push(action.payload)
      localStorage.setItem(LOCAL_STORAGE_PALETTE_KEY, JSON.stringify(state.palette))
    },
    delPalette(state, action: PayloadAction<string>) {
      const delPalette = state.palette.filter((pal) => pal.id !== action.payload)
      state.palette = delPalette
      localStorage.setItem(LOCAL_STORAGE_PALETTE_KEY, JSON.stringify(delPalette))
    },
    addNewColorToPalette(state, action: {payload: {id: string, color: string}, type: string} ) {
      const addNewColor = state.palette.map((pal) => pal.id == action.payload.id ? {
        ...pal,
        colors: [...pal.colors, action.payload.color]
      } : pal)
      state.palette = addNewColor
      localStorage.setItem(LOCAL_STORAGE_PALETTE_KEY, JSON.stringify(addNewColor))
    },
    deleteColorFormPalette(state, action: {payload: {id: string, index: number}, type: string} ) {
      const deleteColor = state.palette.map((pal) => pal.id == action.payload.id ? {
        ...pal,
        colors: pal.colors.filter((_, index) => index !== action.payload.index)
        }: pal
      )
      state.palette = deleteColor
      localStorage.setItem(LOCAL_STORAGE_PALETTE_KEY, JSON.stringify(deleteColor))
    },
  },
});

// Action creators are generated for each case reducer function
export const { actions: paletteActions } = paletteSlice;
export const { reducer: paletteReducer } = paletteSlice;
