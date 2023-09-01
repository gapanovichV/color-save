import React, {useState} from "react";
import classNames from "classnames";
import {useDispatch, useSelector} from "react-redux";
import {Link, useParams, useNavigate, Params} from "react-router-dom";
import {ColorPicker, useColor} from "react-color-palette";
import {paletteActions, PaletteSchema} from "entities/Palette";
import {getPalette} from "entities/Palette/model/selectors/getPalette.ts";
import {ReactComponent as Trash} from "shared/assets/icons/trash.svg";
import {ReactComponent as Paleterum} from "shared/assets/icons/paleterum.svg";
import {Modal} from "shared/ui/Modal/Modal.tsx";
import "react-color-palette/css";
import cls from './Palette.module.scss'

interface PaletteProps {
  className?: string
}
enum Format {
  HEX = 'hex',
  RGB = 'rgb'
}

export const Palette  = ({className}: PaletteProps) => {
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const {paletteId}: Readonly<Params> = useParams();
  const palette: PaletteSchema[] = useSelector(getPalette)

  const [color, setColor] = useColor("#8c4444");
  const [formatCodeColor, setFormatCodeColor] = useState<string>(Format.HEX)
  const [isOpenModal, setIsOpenModal] = useState(false)

  const initialPalette: PaletteSchema = palette.find(pal => pal.id === paletteId)

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

  const handleClickDeletePalette = (id: string) => {
    if (id != null) {
      dispatch(paletteActions.delPalette(id))
      navigate('/')
    }
  }

  const handleClickAddColorToPalette = (id: string ) => {
    dispatch(paletteActions.addNewColorToPalette({id , color: color.hex}))
    setIsOpenModal(false)
  }

  const deleteColor = (id: string, index: number) => {
    dispatch(paletteActions.deleteColorFormPalette({id, index}))
  }

  const handleCopyToClipboard = (e: React.MouseEvent<HTMLDivElement>) => {
    const {innerText} = e.target as HTMLElement;
    navigator.clipboard.writeText(innerText).then(() => {
      console.log('success')
    }).catch(() => {
      console.log('error')
    })
  }

  return (
    <div className={classNames(cls.palette, className)}>
      <div className={classNames(cls.header)}>
        <div className={classNames(cls.link_icon)}>
          <Link to={'/'}>&larr;&nbsp; Back</Link>
        </div>
        <div className={classNames(cls.center)}>
          <select className={classNames(cls.select)} value={formatCodeColor} onChange={toggleFormat}>
            <option value={Format.HEX}>HEX</option>
            <option value={Format.RGB}>RGB</option>
          </select>
        </div>
        <div className={classNames(cls.button)}>
          <button onClick={() => setIsOpenModal(true)}><Paleterum /></button>
          <button onClick={() => handleClickDeletePalette(paletteId)}><Trash/></button>
        </div>
      </div>
      <Modal isOpen={isOpenModal} onClose={() => setIsOpenModal(false)}>
        <ColorPicker hideAlpha={true} color={color} onChange={setColor} />
        <button className={classNames(cls.modal_btn)} onClick={() => handleClickAddColorToPalette(paletteId)}>ADD</button>
      </Modal>
      <div className={classNames(cls.colors)}>
        {
          initialPalette && initialPalette.colors.map((color, index) => {
            return (
              <div onClick={(e) => {
                handleCopyToClipboard(e)
              }
              } className={classNames(cls.color_card)} key={index} style={{background: color}}>
                <h4 className={classNames(cls.code_color)}>{formatCodeColor === Format.HEX ? color : convertToRgb(color) }</h4>
                <button className={classNames(cls.delete_color)} onClick={() => deleteColor(paletteId, index)}><Trash /></button>
              </div>)
          })
        }
      </div>
    </div>
  );
}