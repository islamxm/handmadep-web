import Button from '@/components/Button/Button';
import styles from './ProfileFooter.module.scss';
import Link from 'next/link';
import { FC, useState } from 'react'
import DeleteAccountModal from '@/popups/DeleteAccountModal/DeleteAccountModal';

const ProfileFooter:FC<any> = () => {
  const [modal, setModal] = useState(false)

  return (
    <div className={styles.wrapper}>
      <DeleteAccountModal
        open={modal}
        onCancel={() => setModal(false)}
        />
      <ul>
        <li>
          <Button
            variant={'brown'}
            text='Delete account'
            onClick={() => setModal(true)}
            />
        </li>
        <li>
          <Link href="/terms">Terms of useset</Link>
        </li>
        <li>
          <Link href={'/policy'}>Privacy Policy</Link>
        </li>
        <li>
          <Link href={'/cookie'}>Cookie Policy</Link>
        </li>
        <li>
          <Link href={'/about'}>About us</Link>
        </li>
        <li>
          <Link href={'/contacts'}>Contacts</Link>
        </li>
      </ul>
    </div>
  )
}

export default ProfileFooter;