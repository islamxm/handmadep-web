import styles from './Signup.module.scss';
import { Modal, ModalFuncProps, Col, Row } from 'antd'
import { FC, useState, useCallback } from 'react';
import Input from '../Input/Input';
import Button from '../Button/Button';
import google from '@/public/assets/auth-google.png';
import Image from 'next/image';
import ApiService from '@/service/apiService';
import notify from '@/helpers/notify';
import { useAppDispatch } from '@/hooks/useTypesRedux';
import { main_updateLoading } from '@/store/slices/mainSlice';
import apiSlice from '@/store/slices/apiSlice';
import { HiOutlineMail } from 'react-icons/hi';

const service = new ApiService();

interface IAuthModal extends ModalFuncProps {
    toggleModal: (...args: any[]) => any
}

const Signup: FC<IAuthModal> = (props) => {
    const { onCancel, toggleModal } = props;
    const dispatch = useAppDispatch();

    const [authWithEmail, setAuthWithEmail] = useState(false)
    const [load, setLoad] = useState(false);

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [repeatPassword, setRepeatPassword] = useState('')
    const [username, setUsername] = useState('')

    const [emailError, setEmailError] = useState('')
    const [passwordError, setPasswordError] = useState('')
    const [usernameError, setUsernameError] = useState('')

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
            if (res?.status === 200 || res?.status === 201) {
                notify('Success', 'SUCCESS')
                toggleModal()
            } else {
                res?.json()?.then(r => {
                    if (typeof r?.username === 'object') {
                        setUsernameError(r?.username[0])
                        notify(r?.username[0], 'ERROR')
                    }
                    if (typeof r?.password === 'object') {
                        setPasswordError(r?.password[0])
                        notify(r?.password[0], 'ERROR')
                    }
                    if (typeof r?.email === 'object') {
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
        const res = await dispatch(apiSlice.endpoints.authGoogle.initiate(''))
        const { data, isSuccess, isLoading } = res
        dispatch(main_updateLoading(isLoading))
        if (data?.authorization_url && isSuccess) window.location.replace(data?.authorization_url)
    }



    const onClose = () => {
        if (onCancel) {
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
                <Row gutter={[10, 10]}>
                    {
                        authWithEmail && (
                            <>
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
                                        errorText={'Password is not correct'}
                                        error={repeatPassword && repeatPassword !== password ? true : false}
                                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setRepeatPassword(e.target.value)}
                                        placeholder='Confirm password'
                                        type='password'
                                    />
                                </Col>
                                <Col span={24} style={{ display: 'flex', justifyContent: 'center' }}>
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
                            </>
                        )
                    }
                    <Col span={24}>
                        <div className={styles.itgr}>
                            {
                                !authWithEmail ? (
                                    <button
                                        onClick={() => setAuthWithEmail(true)}
                                        className={styles.item}>
                                        <div className={styles.icon}><HiOutlineMail /></div>
                                        <div className={styles.label}>Continue with e-mail</div>
                                    </button>
                                ) : null
                            }
                            <button
                                onClick={() => {
                                    if (authWithEmail) {
                                        setAuthWithEmail(false)
                                    } else {
                                        authGoogle()
                                    }
                                }}
                                className={styles.item}>
                                <div className={styles.icon}><Image src={google} alt="" /></div>
                                <div className={styles.label}>Continue with Google</div>
                            </button>
                        </div>
                    </Col>
                    <Col span={24}>
                        <div className={styles.terms}>
                            If you choose to continue, you agree to the <a href="#">Terms of Useset</a> established by HandMadeP. Read our <a href="#">Privacy Policy</a>.
                        </div>
                    </Col>
                </Row>
            </Col>
        </Modal>
    )
}

export default Signup