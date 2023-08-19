import styles from './Auth.module.scss';
import {Row, Col, Modal, ModalFuncProps } from 'antd';
import {FC, useState, useEffect} from 'react';
import Button from '../Button/Button';
import Input from '../Input/Input';
import Image from 'next/image';

import { useAppDispatch, useAppSelector } from '@/hooks/useTypesRedux';
import google from '@/public/assets/auth-google.png';

import { Cookies } from 'typescript-cookie';
import Checkbox from '../Checkbox/Checkbox';

import { GoogleLogin, useGoogleLogin   } from '@react-oauth/google';
import notify from '@/helpers/notify';
import { useAuthGoogleQuery, useAuthMutation } from '@/store/slices/apiSlice';

import { main_updateLoading, main_updateResetPassPopup, main_updateToken } from '@/store/slices/mainSlice';
import { cookiesStorageKeys } from '@/helpers/storageKeys';

import ResetPasswordModal from '@/popups/ResetPasswordModal/ResetPasswordModa';
import { authorizeFunc, deauthorizeFunc } from '@/helpers/authorizeUtils';


interface I extends ModalFuncProps {
    toggleModal: (...args: any[]) => any
}

const Auth:FC<I> = (props) => {
    const {onCancel, toggleModal} = props
    const [authResponse, authResponseResult] = useAuthMutation()
    const {data,isLoading, refetch} = useAuthGoogleQuery('')
    
    const {resetPassPopup} = useAppSelector(s => s.main)
    const dispatch = useAppDispatch()

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    
    const [save, setSave] = useState(false)

    const onClose = () => {
        if(onCancel) {
            setSave(false)
            setEmail('')
            setPassword('')
            onCancel()
        }
    }

    const onAuth = () => {
        if(email && password) authResponse({password, email})
    }

    useEffect(() => {
        if(authResponseResult?.data && authResponseResult?.isSuccess) {
            const {tokens} = authResponseResult?.data
            notify('Welcome!', 'SUCCESS')
            authorizeFunc(tokens)
            dispatch(main_updateToken({
                access: tokens?.access,
                refresh: tokens?.refresh
            }))
        } else deauthorizeFunc()
    }, [authResponseResult])


    useEffect(() => {
        dispatch(main_updateLoading(isLoading))
    }, [isLoading])


    const authGoogle = async () => {
        const {data, isLoading, isSuccess} = await refetch()
        dispatch(main_updateLoading(isLoading))
        if(data?.authorization_url && isSuccess) window.location.replace(data?.authorization_url)
    }


    return (
        <Modal
            {...props}
            onCancel={onClose}
            width={500}
            className={`${styles.wrapper} modal`}
            >
            <ResetPasswordModal 
                open={resetPassPopup} 
                onCancel={() => dispatch(main_updateResetPassPopup(false))}
                />
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
                            load={authResponseResult?.isLoading}
                            disabled={email && password ? false : true}
                            onClick={onAuth}
                            />
                    </Col>
                    <Col span={24}>
                        <div className={styles.ex}>
                            Forgot password?
                            <span
                                onClick={() => {
                                    dispatch(main_updateResetPassPopup(true))
                                }}
                                > Reset password</span>
                        </div>
                    </Col>
                    <Col span={24}>
                        <div className={styles.ex}>
                            Don&apos;t have account? 
                            <span
                                onClick={() => {
                                    onClose()
                                    toggleModal()
                                }}
                                > Sign up</span>
                        </div>
                    </Col>
                    <Col span={24}>
                        <div className={styles.itgr}>
                            <button 
                                onClick={authGoogle}
                                className={styles.item}>
                                <Image src={google} alt="" />
                            </button>
                            {/* <button 
                                onClick={authFacebook}
                                className={styles.item}>
                                <Image src={facebook} alt="" />
                            </button>
                            <button className={styles.item}>
                                <Image src={twitter} alt="" />
                            </button> */}
                        </div>
                    </Col>
                </Row>
            </Col>
        </Modal>
    )
}

export default Auth;


