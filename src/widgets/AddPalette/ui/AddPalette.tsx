import chroma from "chroma-js";
import { nanoid } from 'nanoid'
import classNames from "classnames";
import slugify from "react-slugify";
import {useDispatch} from "react-redux";
import {ChangeEvent, useState} from "react";
import cls from './AddPalette.module.scss'
import {paletteActions, PaletteSchema} from "entities/Palette";
import {ReactComponent as Plus} from "shared/assets/icons/plus.svg";

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
    dispatch(paletteActions.addPalette(newPalette))
    setPaletteName('')
  }

  return (
    <div className={classNames(cls.AddPalette, className)}>
        <div className={classNames(cls.InputBox, className)}>
          <input required onChange={(e: ChangeEvent<HTMLInputElement> ) => setPaletteName(e.target.value)} placeholder='Create Palette...' value={paletteName} type="text" />
          <button type={"button"} onClick={() => addPalette()}><Plus/></button>
        </div>
    </div>
  );
}