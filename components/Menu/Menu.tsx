import styles from './Menu.module.scss';
import Button from '../Button/Button';
import {AiFillHome, AiOutlineSearch, AiOutlinePlus} from 'react-icons/ai';
import {BsBellFill} from 'react-icons/bs';
import {ImEnter} from 'react-icons/im';
import Avatar from '../Avatar/Avatar';
import { useAppDispatch, useAppSelector } from '@/hooks/useTypesRedux';
import { updateAuthPopup } from '@/store/actions';
import {useEffect} from 'react';
import Router from 'next/router';


const Menu = () => {
    const {token, userData} = useAppSelector(s => s)
    const dispatch = useAppDispatch()

    const openAuth = () => dispatch(updateAuthPopup(true))
    const closeAuth = () => dispatch(updateAuthPopup(false))

    useEffect(() => {
        console.log(userData)
    }, [userData])
    


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
                        link='/'
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
                        token ? (
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