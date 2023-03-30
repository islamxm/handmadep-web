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



const Header:FC<headerTypes> = () => {
    const [authModal, setAuthModal] = useState(false)
    const [signupModal, setSignupModal] = useState(false)
    

    return (
        <div className={styles.wrapper}>
            <Auth/>
            <Signup/>
            <Container>
                <div className={styles.in}>
                    <div className={`${styles.part} ${styles.logo}`}>
                        
                    </div>
                    <div className={`${styles.part} ${styles.action}`}>
                        <div className={styles.item}>
                            <Button
                                text='Home'
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
                                badge={100}
                                icon={<BsBellFill size={25} color="#fff"/>}
                                />
                        </div>
                        <div className={styles.item}>
                            <Dropdown
                                dropdownRender={() => <ProfileMenu/>}
                                trigger={['click']}
                                
                                placement={'bottomCenter'}
                                >
                                    <div>
                                    <Avatar
                                    isActive
                                    size={40}
                                    image={avatarImg}
                                    />
                                    </div>
                                
                            </Dropdown>


                            {/* <Button
                                round
                                variant={'transparent'}
                                icon={<GoSignIn size={25} color="#fff"/>}
                                /> */}
                        </div>
                    </div>
                </div>
            </Container>
        </div>
    )
}

export default Header;