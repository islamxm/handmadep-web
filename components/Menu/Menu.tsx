import styles from './Menu.module.scss';
import Button from '../Button/Button';
import {AiFillHome, AiOutlineSearch, AiOutlinePlus} from 'react-icons/ai';
import {BsBellFill} from 'react-icons/bs';
import {ImEnter} from 'react-icons/im';
import Avatar from '../Avatar/Avatar';

const Menu = () => {

    return (
        <div className={styles.wrapper}>
            <ul className={styles.list}>
                <li className={styles.item}>
                    <Button
                        link='/'
                        round
                        variant={'transparent'}
                        icon={<AiFillHome size={30}/>}
                        />
                </li>
                <li className={styles.item}>
                    <Button
                        link='/'
                        round
                        variant={'transparent'}
                        icon={<AiOutlineSearch size={30}/>}
                        />
                </li>
                <li className={styles.item}>
                    <Button
                        tooltip="Coming soon"
                        round
                        variant={'transparent'}
                        icon={<AiOutlinePlus size={30}/>}
                        />
                </li>
                <li className={styles.item}>
                    <Button
                        round
                        variant={'transparent'}
                        icon={<BsBellFill size={30}/>}
                        />
                </li>
                <li className={styles.item}>
                    <Button
                        round
                        variant={'transparent'}
                        icon={<ImEnter size={30}/>}
                        />
                </li>
            </ul>
        </div>
    )
}


export default Menu;