import classNames from "classnames";
import cls from './Palette.module.scss'
import {Link, Params, useParams} from "react-router-dom";
import {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getPalette} from "entities/Palette/model/selectors/getPalette.ts";
import {paletteActions} from "entities/Palette";

interface PaletteProps {
    className?: string
}

enum Format {
  HEX = 'hex',
  RGB = 'rgb'
}

export const Palette  = ({className}: PaletteProps) => {
  const dispatch = useDispatch();
  const {paletteId}: Readonly<Params<string>> = useParams();
  const palette = useSelector(getPalette)

  const [formatCodeColor, setFormatCodeColor] = useState(Format.HEX)
  const initialPalette = palette.find(pal => pal.id === paletteId)
  console.log(initialPalette)
  const toggleFormat = () => {
    const newFormat = formatCodeColor === Format.HEX ? Format.RGB : Format.HEX
    setFormatCodeColor(newFormat)
  }

  const convertToRgb = (hex: string): string => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);

    return `rgb(${r},${g},${b})`;
  }
  return (
    <div className={classNames(cls.Palette, className)}>
      <div className={classNames(cls.Header)}>
        <div className={classNames(cls.Link_icon)}>
          <Link to={'/'}>&larr;&nbsp; Back</Link>
        </div>
        <div className={classNames(cls.Select)}>
          <select value={formatCodeColor} onChange={toggleFormat}>
            <option value={Format.HEX}>HEX</option>
            <option value={Format.RGB}>RGB</option>
          </select>
        </div>
        <div className={classNames(cls.Button)}>
          <button>Z</button>
          <button>X</button>
        </div>
      </div>

      <div className={classNames(cls.Colors)}>
        {
          initialPalette && initialPalette.colors.map((color, index) => {
            return (
              <div key={index} style={{background: color}}>
              <h4>{formatCodeColor === Format.HEX ? color : convertToRgb(color) }</h4>
            </div>)
          })
        }
      </div>
    </div>
  );
}