import styles from './Drop.module.scss';
import {FC} from 'react';
import Button from '@/components/Button/Button';
import {FaUser} from 'react-icons/fa'
import {BsFillBookmarkFill} from 'react-icons/bs'
import {AiFillHeart} from 'react-icons/ai';
import getClassNames from "@/helpers/getClassNames";
import Router from "next/router";

interface I {
  isOpen?:boolean,
  onClose?: (...args:any[]) => any
}

const Drop: FC<I> = ({isOpen, onClose}) => {

  const handleClose = (e: any) => {
    if(e?.target?.classList?.contains(styles.wrapper)) {
      onClose && onClose()
    }
  }

  return (
    <div onClick={handleClose} className={getClassNames([styles.wrapper, isOpen && styles.open])}>
      <div className={styles.main}>
        <div className={styles.item}>
          <Button
            icon={<FaUser/>}
            round={true}
            style={{width:39,height:39}}
            onClick={() => Router.push('/profile')}
          />
        </div>
        <div className={styles.item}>
          <Button
            icon={<BsFillBookmarkFill/>}
            round={true}
            style={{width:39,height:39}}
            onClick={() => Router.push('/favs')}
          />
        </div>
        <div className={styles.item}>
          <Button
            icon={<AiFillHeart/>}
            round={true}
            style={{width:39,height:39}}
            onClick={() => Router.push('/likes')}
          />
        </div>
      </div>
    </div>
  )
}

export default Drop;