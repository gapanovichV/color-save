import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {PaletteSchema} from "entities/Palette";


export const LOCAL_STORAGE_PALETTE_KEY = 'palettes';

const defaultList = (localStorage.getItem(LOCAL_STORAGE_PALETTE_KEY)) || '[]';
const initialState: PaletteSchema[] = JSON.parse(defaultList)

export const paletteSlice = createSlice({
  name: 'palette',
  initialState,
  reducers: {
    addNewPalette(state, action: PayloadAction<PaletteSchema>) {
      state.push(action.payload)
      localStorage.setItem(LOCAL_STORAGE_PALETTE_KEY, JSON.stringify(state))
    },
    // addNewColorToPalette(state, action: PayloadAction<{id: string, color: string}> ) {
    // }
  },
});

// Action creators are generated for each case reducer function
export const { actions: paletteActions } = paletteSlice;
export const { reducer: paletteReducer } = paletteSlice;
