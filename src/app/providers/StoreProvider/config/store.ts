import { configureStore, ReducersMapObject } from '@reduxjs/toolkit';
import { paletteReducer } from 'entities/Palette';
import { StateSchema } from './StateSchema';

export function createReduxStore(initialState?: StateSchema) {
  const rootReducers: ReducersMapObject<StateSchema> = {
    palette: paletteReducer,
  };

  return configureStore<StateSchema>({
    reducer: rootReducers,
    preloadedState: initialState,
  });
}
