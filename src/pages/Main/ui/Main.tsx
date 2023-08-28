import classNames from "classnames";
import cls from './Main.module.scss'
import {Palettes} from "widgets/Palettes";
import {AddPalette} from "widgets/AddPalette";

interface MainProps {
    className?: string
}
export const Main  = ({className}: MainProps) => {
  return (
    <div className={classNames(cls.Main, className)}>
      <div className={classNames(cls.Wrapper, className)}>
        <AddPalette />
        <Palettes />
      </div>
    </div>
  );
}