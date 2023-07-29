import styles from './Header.module.scss';
import { headerTypes } from './types';
import {FC, useState} from 'react';
import Container from '../Container/Container';
import Button from '../Button/Button';
import {BsFillChatDotsFill, BsPlusLg, BsBellFill} from 'react-icons/bs';
import Avatar from '../Avatar/Avatar';
import Search from '../Search/Search';
import avatarImg from '@/public/assets/user.png';
import { Dropdown } from 'antd';
import {GoSignIn} from 'react-icons/go';
import ProfileMenu from './components/ProfileMenu/ProfileMenu';
import Auth from '../Auth/Auth';
import Signup from '../Signup/Signup';
import { updateAuthPopup, updateSignupPopup } from '@/store/actions';
import { useAppSelector, useAppDispatch } from '@/hooks/useTypesRedux';
import LogoutModal from './components/LogoutModal/LogoutModal';



const Header:FC<headerTypes> = () => {

    const [logoutModal, setLogoutModal] = useState(false)

    const dispatch = useAppDispatch()
    const {
        token, 
        userData,
        authPopup,
        signupPopup
    } = useAppSelector(s => s)

    const {access} = token;

    const openAuth = () => {
        dispatch(updateAuthPopup(true))
        dispatch(updateSignupPopup(false))
    }
    const closeAuth = () => dispatch(updateAuthPopup(false))

    const openSignup = () => {
        dispatch(updateSignupPopup(true))
        dispatch(updateAuthPopup(false))
    }
    const closeSignup = () => dispatch(updateSignupPopup(false))

    const openLogoutModal = () => setLogoutModal(true)
    const closeLogoutModal = () => setLogoutModal(false)

    return (
        <div className={styles.wrapper}>
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
                    <div className={`${styles.part} ${styles.logo}`}>
                        
                    </div>
                    <div className={`${styles.part} ${styles.action}`}>
                        <div className={styles.item}>
                            <Button
                                text='Home'
                                link='/'
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
                        <div className={styles.item}>
                            <Button
                                variant={'transparent'}
                                round
                                // badge={100}
                                icon={<BsBellFill size={25} color="#fff"/>}
                                />
                        </div>
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
                                            // image={avatarImg}
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