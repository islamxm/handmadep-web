import styles from './Signup.module.scss';
import {Modal, ModalFuncProps, Col, Row} from 'antd'
import {FC, useState, useEffect, useCallback} from 'react';
import Input from '../Input/Input';
import Button from '../Button/Button';
import google from '@/public/assets/auth-google.png';
import facebook from '@/public/assets/auth-facebook.png';
import twitter from '@/public/assets/auth-twitter.png';
import Image from 'next/image';
import ApiService from '@/service/apiService';
import { GoogleLogin, useGoogleLogin   } from '@react-oauth/google';
import { endpoints } from '@/service/endpoints';
import notify from '@/helpers/notify';
import Checkbox from '../Checkbox/Checkbox';
import { useAppDispatch } from '@/hooks/useTypesRedux';
import { updateToken, updateLoading } from '@/store/actions';
import { Cookies } from 'typescript-cookie';

const service = new ApiService();


interface IAuthModal extends ModalFuncProps {
    toggleModal: (...args: any[]) => any
}


const Signup:FC<IAuthModal> = (props) => {
    const {onCancel, toggleModal} = props;
    const dispatch = useAppDispatch();


    const [load, setLoad] = useState(false);

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [repeatPassword, setRepeatPassword] = useState('')
    const [username, setUsername] = useState('')

    const [emailError, setEmailError] = useState('')
    const [passwordError, setPasswordError] = useState('')
    const [usernameError, setUsernameError] = useState('')

    const [save, setSave] = useState(false)

    const onSubmit = useCallback(() => {
        setLoad(true)
        setUsernameError('')
        setPasswordError('')
        setEmailError('')

        service.register({
            email,
            password,
            re_password: repeatPassword,
            username
        }).then(res => {
            if(res?.status === 200) {
                notify('Success', 'SUCCESS')
                toggleModal()
            } else {
                res?.json()?.then(r => {
                    if(typeof r?.username === 'object') {
                        setUsernameError(r?.username[0])
                        notify(r?.username[0], 'ERROR')
                    }
                    if(typeof r?.password === 'object') {
                        setPasswordError(r?.password[0])
                        notify(r?.password[0], 'ERROR')
                    }
                    if(typeof r?.email === 'object') {
                        setEmailError(r?.email[0])
                        notify(r?.email[0], 'ERROR')
                    }
                })
            }
           
            
        }).finally(() => {
            setLoad(false)
        })
    }, [email, username, password, repeatPassword])



    const authGoogle = async () => {
        dispatch(updateLoading(true))
        const res = await fetch('https://handmadep.com/api/auth/o/google-oauth2/?redirect_uri=https://handmadep.com/google');
        const r =  await res?.json().finally(() => {
            dispatch(updateLoading(false))
            onClose()
        })
        if(r?.authorization_url) {
            window.location.replace(r?.authorization_url)
        }
    }

    const authFacebook = async () => {
        dispatch(updateLoading(true))
        const res = await fetch('https://handmadep.com/api/auth/o/facebook/?redirect_uri=https://handmadep.com/facebook');
        const r = await res?.json().finally(() => {
            dispatch(updateLoading(false))
            onClose()
        })
        if(r?.authorization_url) {
            window.location.replace(r?.authorization_url)
        }
    }


    const onClose = () => {
        if(onCancel) {
            setEmail('')
            setUsername('')
            setPassword('')
            setRepeatPassword('')

            setEmailError('')
            setUsernameError('')
            setPasswordError('')
            setRepeatPassword('')

            onCancel()
        }   
    }

  


    return (
        <Modal  
            {...props}
            onCancel={onClose}
            width={500}
            className={`${styles.wrapper} modal`}
            >
            <div className='modal__head page-title'>Sign up</div>
            <Col span={24}>
                <Row gutter={[10,10]}>
                    <Col span={24}>
                        <Input
                            placeholder='E-mail'
                            value={email}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                            errorText={emailError}
                            error={emailError}
                            />
                    </Col>
                    <Col span={24}>
                        <Input
                            placeholder='Username'
                            value={username}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUsername(e.target.value)}
                            errorText={usernameError}
                            error={usernameError}
                            />
                    </Col>
                    <Col span={24}>
                        <Input 
                            placeholder='Password'
                            type='password'
                            value={password}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                            errorText={passwordError}
                            error={passwordError}
                            />
                    </Col>
                    <Col span={24}>
                        <Input
                            value={repeatPassword}
                            errorText={'Пароли не совпадают'}
                            error={repeatPassword && repeatPassword !== password ? true : false}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setRepeatPassword(e.target.value)}
                            placeholder='Confirm password'
                            type='password'
                            />
                    </Col>
                    {/* <Col span={24}>
                        <Checkbox 
                            checked={save}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSave(e.target.checked)}
                            id='save-me' 
                            text='Save me'/>
                    </Col> */}
                    <Col span={24} style={{display: 'flex', justifyContent: 'center'}}>
                        <Button
                            disabled={email && password && repeatPassword && (repeatPassword === password) ? false : true}
                            onClick={onSubmit}
                            text={'Sign up'}
                            load={load}
                            />
                    </Col>
                    <Col span={24}>
                        <div className={styles.ex}>
                            Do you have account? 
                            <span onClick={() => {
                                onClose()
                                toggleModal()
                            }}>Log in</span> 
                        </div>
                    </Col>
                    {/* <Col span={24}>
                        <div className={styles.itgr}>
                            <button
                                onClick={() => authGoogle()}
                                className={styles.item}>
                                <Image src={google} alt="" />
                            </button>
                            <button 
                                onClick={() => authFacebook()}
                                className={styles.item}>
                                <Image src={facebook} alt="" />
                            </button>
                            <button 
                                className={styles.item}>
                                <Image src={twitter} alt="" />
                            </button>
                        </div>
                    </Col> */}
                    <Col span={24}>
                    {/* <GoogleLogin
                        onSuccess={credentialResponse => {
                            console.log(credentialResponse);
                        }}
                        onError={() => {
                            console.log('Login Failed');
                        }}
                        />; */}
                    </Col>
                </Row>    
            </Col>    
        </Modal>
    )
}

export default Signup