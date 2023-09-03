import styles from './Header.module.scss';
import { headerTypes } from './types';
import {FC, useEffect, useState} from 'react';
import Container from '../Container/Container';
import Button from '../Button/Button';
import {BsPlusLg, BsBellFill} from 'react-icons/bs';
import Avatar from '../Avatar/Avatar';
import Search from '../Search/Search';
import { Dropdown } from 'antd';
import {GoSignIn} from 'react-icons/go';
import ProfileMenu from './components/ProfileMenu/ProfileMenu';
import Auth from '../Auth/Auth';
import Signup from '../Signup/Signup';
import { useAppSelector, useAppDispatch } from '@/hooks/useTypesRedux';
import LogoutModal from './components/LogoutModal/LogoutModal';
import { main_updateAuthPopup, main_updateSignupPopup } from '@/store/slices/mainSlice';
import Router, { useRouter } from 'next/router';
import NotificationsDrop from './components/NotificationsDrop/NotificationsDrop';
import { useWindowSize } from 'usehooks-ts';
import getClassNames from '@/helpers/getClassNames';


const Header:FC<headerTypes> = () => {
    const {width} = useWindowSize()
    const [logoutModal, setLogoutModal] = useState(false)
    const {pathname} = useRouter()
    const dispatch = useAppDispatch()
    const {
        token, 
        userData,
        authPopup,
        signupPopup,
        searchPopup
    } = useAppSelector(s => s.main)

    const {access} = token;

    const openAuth = () => {
        dispatch(main_updateAuthPopup(true))
        dispatch(main_updateSignupPopup(false))
    }
    const closeAuth = () => dispatch(main_updateAuthPopup(false))

    const openSignup = () => {
        dispatch(main_updateSignupPopup(true))
        dispatch(main_updateAuthPopup(false))
    }
    const closeSignup = () => dispatch(main_updateSignupPopup(false))

    const openLogoutModal = () => setLogoutModal(true)
    const closeLogoutModal = () => setLogoutModal(false)


    return (
        <div className={getClassNames([styles.wrapper, searchPopup && styles.open])}>
            <Auth 
                open={authPopup}
                onCancel={closeAuth}
                toggleModal={openSignup}/>
            <Signup 
                open={signupPopup}
                onCancel={closeSignup}
                toggleModal={openAuth}/>
            <LogoutModal
                open={logoutModal}
                onCancel={closeLogoutModal}
                />
            <Container>
                <div className={styles.in}>
                    <div className={`${styles.part} ${styles.logo}`}></div>
                    <div className={`${styles.part} ${styles.action}`}>
                        <div className={styles.item}>
                            <Button
                                text='Home'
                                onClick={() => {
                                    if(pathname !== '/') {
                                        Router.push('/')
                                    }
                                }}
                                />
                        </div>
                        <div className={styles.item}>
                            <Button
                                variant={'white'}
                                text={"Create"}
                                after={<BsPlusLg/>}
                                tooltip={'Coming soon'}
                                />
                        </div>
                    </div>
                    <div className={`${styles.part} ${styles.search}`}>
                        <Search/>
                    </div>
                    <div className={`${styles.part} ${styles.action}`}>
                        {
                            access && (
                                width <= 768 ? (
                                    null
                                ) : (
                                    <Dropdown
                                        overlay={<NotificationsDrop/>}
                                        >
                                        <div className={styles.item}>
                                            <Button
                                                badge={1}
                                                variant={'transparent'}
                                                round
                                                icon={<BsBellFill size={25} color="#fff"/>}
                                                />
                                        </div>
                                    </Dropdown>
                                )
                                
                            )
                        }
                        <div className={styles.item}>
                            {
                                access ? (
                                    <Dropdown
                                        dropdownRender={() => <ProfileMenu openLogoutModal={openLogoutModal}/>}
                                        trigger={['hover']}
                                        placement={'bottomLeft'}
                                        >
                                            <div>
                                            <Avatar
                                            isActive
                                            size={40}
                                            label={userData?.username}
                                            image={userData?.avatar_image}
                                            />
                                            </div>
                                    </Dropdown>
                                ) : (
                                    <Button
                                        onClick={openAuth}
                                        round
                                        variant={'transparent'}
                                        icon={<GoSignIn size={25} color="#fff"/>}
                                        />
                                )
                            }
                        </div>
                    </div>
                </div>
            </Container>
        </div>
    )
}

export default Header;