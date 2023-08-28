import classNames from "classnames";
import cls from './Palettes.module.scss'
import {useSelector} from "react-redux";
import {getPalette} from "entities/Palette/model/selectors/getPalette.ts";
import {Link} from "react-router-dom";
import {Path} from "app/types/app.ts";

interface PaletteProps {
    className?: string
}
export const Palettes  = ({className}: PaletteProps) => {
  const palettes = useSelector(getPalette)
  console.log(palettes)
  return (
    <div className={classNames(cls.Palettes, className)}>
      {
        palettes.map((palette) => {
          return (
            <Link className={classNames(cls.Link)} key={palette.id} to={Path.PALETTE + palette.id}>
              <div className={classNames(cls.Palette)}>
                {
                  palette.colors.map((color, index) => {
                    return <div key={index} className={classNames(cls.Color)} style={{background: color}}></div>
                  })
                }
              </div>
              <p className={classNames(cls.Title)}>{palette.name}</p>
            </Link>
          )
        })
      }
    </div>
  );
}