import styles from './Menu.module.scss';
import Button from '../Button/Button';
import {AiFillHome, AiOutlineSearch, AiOutlinePlus} from 'react-icons/ai';
import {BsBellFill} from 'react-icons/bs';
import {ImEnter} from 'react-icons/im';
import Avatar from '../Avatar/Avatar';
import { useAppDispatch, useAppSelector } from '@/hooks/useTypesRedux';
import {useEffect} from 'react';
import Router from 'next/router';
import { main_closeSearch, main_openSearch, main_updateAuthPopup } from '@/store/slices/mainSlice';


const Menu = () => {
    const {token, userData, searchPopup} = useAppSelector(s => s.main)
    const dispatch = useAppDispatch()

    const openAuth = () => dispatch(main_updateAuthPopup(true))
    const closeAuth = () => dispatch(main_updateAuthPopup(false))

    
    


    return (
        <div className={styles.wrapper}>
            <ul className={styles.list}>
                <li className={styles.item}>
                    <Button
                        link='/'
                        round
                        variant={'transparent'}
                        icon={<AiFillHome size={25}/>}
                        />
                </li>
                <li className={styles.item}>
                    <Button
                        onClick={() => {
                            searchPopup ? dispatch(main_closeSearch()) : dispatch(main_openSearch())
                        }}
                        round
                        variant={'transparent'}
                        icon={<AiOutlineSearch size={25}/>}
                        />
                </li>
                <li className={styles.item}>
                    <Button
                        tooltip="Coming soon"
                        round
                        variant={'transparent'}
                        icon={<AiOutlinePlus size={25}/>}
                        />
                </li>
                <li className={styles.item}>
                    <Button
                        round
                        variant={'transparent'}
                        icon={<BsBellFill size={25}/>}
                        />
                </li>
                <li className={styles.item}>
                    {
                        token?.access ? (
                            <Avatar
                                label={userData?.username}
                                size={45}
                                image={userData?.avatar_url}
                                onClick={() => Router.push('/profile')}
                                />
                        ) : (
                            <Button
                                round
                                onClick={openAuth}
                                variant={'transparent'}
                                icon={<ImEnter size={25}/>}
                                />
                        )
                    }

                </li>
            </ul>
        </div>
    )
}


export default Menu;