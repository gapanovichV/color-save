import classNames from "classnames";
import {Link} from "react-router-dom";
import {ReactComponent as Trash} from "shared/assets/icons/trash.svg";
import {ReactComponent as Paleterum} from "shared/assets/icons/paleterum.svg";
import cls from './HeaderPalette.module.scss'

interface HeaderPaletteProps {
  className?: string;
  formatCodeColor?: string;
  toggleFormat?: () => void;
  setIsOpenModal?: () => void;
  handleClickDeletePalette?: () => void
}
enum Format {
  HEX = 'hex',
  RGB = 'rgb'
}

export const HeaderPalette  = (props: HeaderPaletteProps) => {
  const {className, toggleFormat, formatCodeColor, setIsOpenModal, handleClickDeletePalette} = props
  return (
    <div className={classNames(cls.header, className)}>
      <div className={classNames(cls.link_icon, className)}>
        <Link to={'/'}>&larr;&nbsp; Back</Link>
      </div>
      <div className={classNames(cls.center)}>
        <select className={classNames(cls.select)} value={formatCodeColor} onChange={toggleFormat}>
          <option value={Format.HEX}>HEX</option>
          <option value={Format.RGB}>RGB</option>
        </select>
      </div>
      <div className={classNames(cls.button)}>
        <button onClick={setIsOpenModal}><Paleterum/></button>
        <button onClick={handleClickDeletePalette}><Trash/></button>
      </div>
    </div>
  );
}