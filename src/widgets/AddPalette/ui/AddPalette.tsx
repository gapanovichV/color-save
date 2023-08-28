import { nanoid } from 'nanoid'
import slugify from "react-slugify";
import chroma from "chroma-js";
import classNames from "classnames";
import cls from './AddPalette.module.scss'
import {ChangeEvent, useState} from "react";
import {paletteActions, PaletteSchema} from "entities/Palette";
import {useDispatch} from "react-redux";

interface AddPaletteProps {
    className?: string
}
export const AddPalette  = ({className}: AddPaletteProps) => {
  const dispatch = useDispatch();
  const [paletteName, setPaletteName] = useState<string>('')
  const generateColors = (): string[] => {
    const colors = []
    while (colors.length <= 24) {
      const color = chroma.random().hex()
      if (chroma.valid(color)) {
        colors.push(color)
      }
    }
    return colors
  }
  const addPalette = () => {
    const newPalette: PaletteSchema  = {
      name: slugify(paletteName),
      id: nanoid(),
      colors: generateColors()
    }
    dispatch(paletteActions.addNewPalette(newPalette))
    setPaletteName('')
  }

  return (
    <div className={classNames(cls.AddPalette, className)}>
        <div className={classNames(cls.InputBox, className)}>
          <input required onChange={(e: ChangeEvent<HTMLInputElement> ) => setPaletteName(e.target.value)} placeholder='Create Palette...' value={paletteName} type="text" />
          <button type={"button"} onClick={() => addPalette()}>+</button>
        </div>
    </div>
  );
}