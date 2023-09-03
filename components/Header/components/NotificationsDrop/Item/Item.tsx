import styles from './Item.module.scss';
import { FC, useState } from 'react'
import Avatar from '@/components/Avatar/Avatar';
import placeholder from '@/public/assets/handmade-watermark.png'

const Item:FC<any> = () => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className={styles.wrapper}>
      <div className={styles.avatar}>
        <Avatar
         image={placeholder}
         />
      </div>
      <div className={styles.body}>
        Welcome to our website, where art is embodied in every product♥️
        {
          !isOpen && <span onClick={() => setIsOpen(true)}>more</span> 
        }
        {
          isOpen && (
            <>
              <br/>
              <br/>
              We are delighted to have you here, where you will discover unique handmade items🫶
              <br/>
              <br/>
              Immerse yourself in the world of creativity and individuality, choosing from the very best🪐
              <br/>
              <br/>
              We hope your time with us will be inspiring and enjoyable ♡
            </>
          )
        }
      </div>
      
    </div>
  )
}

export default Item;