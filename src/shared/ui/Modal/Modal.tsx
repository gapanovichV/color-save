import React, {ReactNode} from 'react'
import classNames from "classnames";
import cls from './Modal.module.scss'

interface ModalProps {
  className?: string;
  children?: ReactNode;
  isOpen?: boolean;
  onClose?: () => void;
}
export const Modal  = (props: ModalProps) => {
  const {className, children, isOpen, onClose} = props

  const handleClickClose = () => {
    if (onClose) {
      onClose()
    }
  }

  const handleClickContent = (e: React.MouseEvent) => {
    e.stopPropagation()
  };
  const mods: Record<string, boolean> = {
    [cls.opened]: isOpen,
  };
  return (
    <div className={classNames(cls.Modal, mods)}>
        <div onClick={handleClickClose} className={classNames(cls.overlay)}>
          <div onClick={handleClickContent} className={classNames(cls.content, className)}>
            {children}
          </div>
        </div>
    </div>
  );
}