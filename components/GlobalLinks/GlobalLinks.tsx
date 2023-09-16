import styles from './GlobalLinks.module.scss';
import { FC } from 'react'
import Link from 'next/link';
const GlobalLinks:FC<any> = () => {
  return (
    <div className={styles.wrapper}>
      <Link href={'/cookie'}>Cookie Policy</Link>
      <Link href={'/about'}>About us</Link>
      <Link href={'/contacts'}>Contacts</Link>
    </div>
  )
}

export default GlobalLinks;