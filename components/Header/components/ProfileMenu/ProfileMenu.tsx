import styles from './ProfileMenu.module.scss';
import Link from 'next/link';
import {FaUserAlt} from 'react-icons/fa';
import {FiLogOut} from 'react-icons/fi';
import { BsHeartFill, BsBookmarkFill} from 'react-icons/bs';
import getClassNames from '@/helpers/getClassNames';

const ProfileMenu = ({
    openLogoutModal
}: {
    openLogoutModal?: (...args: any) => any
}) => {
    
    return (
        <div className={styles.wrapper}>
            <ul className={styles.list}>
                <li className={styles.item}>
                    <Link href={'/profile'} className={styles.link}>
                        <div className={styles.icon}><FaUserAlt/></div>
                        <div className={styles.text}>Profile</div>
                    </Link> 
                </li>
                <li className={styles.item}>
                    <Link href={'/likes'} className={styles.link}>
                        <div className={styles.icon}><BsHeartFill/></div>
                        <div className={styles.text}>Favourites</div>
                    </Link> 
                </li>
                <li className={styles.item}>
                    <Link href={'/favs'} className={styles.link}>
                        <div className={styles.icon}><BsBookmarkFill/></div>
                        <div className={styles.text}>Saved</div>
                    </Link> 
                </li>
                <li className={getClassNames([styles.item, styles.logout])}>
                    <div onClick={() => {
                        openLogoutModal && openLogoutModal()
                    }} className={styles.link}>
                        <div className={styles.icon}><FiLogOut/></div>
                        <div className={styles.text}>Log out</div>
                    </div> 
                </li>
            </ul>
        </div>
    )
}


export default ProfileMenu;