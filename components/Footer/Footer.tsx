import styles from './Footer.module.scss';
import Container from '../Container/Container';
import Link from 'next/link';

import { FC } from 'react'

const Footer:FC<any> = () => {
  return (
    <footer className={styles.wrapper}>
      <Container>
        <div className={styles.in}>
          <div className={styles.part}>
            <ul className={styles.list}>
              <li className={styles.item}>
                <Link href={'/terms'}>Terms of useset</Link>
              </li>
              <li className={styles.item}>
                <Link href={'/policy'}>Privacy Policy</Link>
              </li>
              <li className={styles.item}>
                <Link href={'/cookie'}>Cookie Policy</Link>
              </li>
              <li className={styles.item}>
                <Link href={'/about'}>About us</Link>
              </li>
              <li className={styles.item}>
                <Link href={'/about'}>Contacts</Link>
              </li>
            </ul>
          </div>
        </div>
      </Container>
    </footer>
  )
}

export default Footer;