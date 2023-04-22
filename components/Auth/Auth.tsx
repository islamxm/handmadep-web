import styles from './Auth.module.scss';
import {Row, Col, Modal, ModalFuncProps } from 'antd';
import {FC, useState, useCallback} from 'react';
import Button from '../Button/Button';
import Input from '../Input/Input';
import { updateToken, updateLoading } from '@/store/actions';
import { useAppDispatch } from '@/hooks/useTypesRedux';
import google from '@/public/assets/auth-google.png';
import facebook from '@/public/assets/auth-facebook.png';
import twitter from '@/public/assets/auth-twitter.png';
import Image from 'next/image';
import { Cookies } from 'typescript-cookie';
import Checkbox from '../Checkbox/Checkbox';
import ApiService from '@/service/apiService';
import { GoogleLogin, useGoogleLogin   } from '@react-oauth/google';
import { endpoints } from '@/service/endpoints';
import notify from '@/helpers/notify';
import { Session } from '@/helpers/sessionStorage';



const service = new ApiService();


interface IAuthModal extends ModalFuncProps {
    toggleModal: (...args: any[]) => any
}

const Auth:FC<IAuthModal> = (props) => {
    const {onCancel, toggleModal} = props
    const dispatch = useAppDispatch()

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [emailError, setEmailError] = useState('')
    const [passwordError, setPasswordError] = useState('')
    
    const [save, setSave] = useState(false)

    const [load, setLoad] = useState(false)

    const onClose = () => {
        if(onCancel) {
            setSave(false)
            setEmail('')
            setPassword('')
            onCancel()
        }
    }


    const onSubmit = useCallback(() => {
        setLoad(true)
        service.getTokens({email: email, password: password}).then(res => {
            
            if(res?.status === 200) {
                res?.json().then(res => {
                    notify('Welcome!', 'SUCCESS')
                    dispatch(updateToken({
                        access: res?.access,
                        refresh: res?.refresh
                    }))
                    if(save) {
                        Cookies.set('handmadep-web-access-token', res?.access)
                        Cookies.set('handmadep-web-refresh-token', res?.refresh)
                    } else {
                        Cookies.remove('handmadep-web-access-token')
                        Cookies.remove('handmadep-web-refresh-token')
                        if(process?.browser) {
                            sessionStorage.setItem('handmadep-web-access-token', res?.access)
                            sessionStorage.setItem('handmadep-web-refresh-token', res?.refresh)
                        }
                    }
                    onClose()
                })
            } else {
                res?.json().then(res => {
                    notify(res?.detail, 'ERROR')
                })
            }
            
        }).finally(() => {
            setLoad(false)
        })
    }, [email, password, save])


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

    // const authTwitter = async () => {
    //     const res = await fetch('')
    // }


    return (
        <Modal
            {...props}
            onCancel={onClose}
            width={500}
            className={`${styles.wrapper} modal`}
            >
            <div className='modal-head page-title'>
                Log in
            </div>
            <Col span={24}>
                <Row gutter={[10,10]}>
                    <Col span={24}>
                        <Input
                            placeholder='E-mail'
                            value={email}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                            />
                    </Col>
                    <Col span={24}>
                        <Input
                            placeholder='Password'
                            value={password}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                            type={'password'}
                            />
                    </Col>
                    <Col span={24}>
                        <Checkbox 
                            checked={save}
                            text='Save me'
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSave(e.target.checked)}
                            id='save-me'/>
                    </Col>
                    <Col span={24} style={{justifyContent: 'center', display: 'flex'}}>
                        <Button
                            text={'Log in'}
                            load={load}
                            disabled={email && password ? false : true}
                            onClick={onSubmit}
                            />
                    </Col>
                    <Col span={24}>
                        <div className={styles.ex}>
                            Don&apos;t have account? 
                            <span
                                onClick={() => {
                                    onClose()
                                    toggleModal()
                                }}
                                >Sign up</span>
                        </div>
                    </Col>
                    {/* <Col span={24}>
                        <div className={styles.itgr}>
                            <button 
                                onClick={authGoogle}
                                className={styles.item}>
                                <Image src={google} alt="" />
                            </button>
                            <button 
                                onClick={authFacebook}
                                className={styles.item}>
                                <Image src={facebook} alt="" />
                            </button>
                            <button className={styles.item}>
                                <Image src={twitter} alt="" />
                            </button>
                        </div>
                    </Col> */}
                </Row>
            </Col>
        </Modal>
    )
}

export default Auth;


