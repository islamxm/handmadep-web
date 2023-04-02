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



const service = new ApiService();

const Signup:FC<ModalFuncProps> = (props) => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [repeatPassword, setRepeatPassword] = useState('')
    const [username, setUsername] = useState('')


    const onSubmit = useCallback(() => {
        service.register({
            email,
            password,
            re_password: repeatPassword,
            username
        }).then(res => {
            console.log(res)
        })
    }, [email, password, repeatPassword])


    return (
        <Modal  
            {...props}
            width={500}
            // open
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
                            />
                    </Col>
                    <Col span={24}>
                        <Input
                            placeholder='Username'
                            value={username}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUsername(e.target.value)}
                            />
                    </Col>
                    <Col span={24}>
                        <Input 
                            placeholder='Password'
                            type='password'
                            value={password}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
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
                    <Col span={24} style={{display: 'flex', justifyContent: 'center'}}>
                        <Button
                            disabled={email && password && repeatPassword && (repeatPassword === password) ? false : true}
                            onClick={onSubmit}
                            text={'Sign up'}
                            />
                    </Col>
                    <Col span={24}>
                        <div className={styles.ex}>
                            Do you have account? <span>Log in</span> 
                        </div>
                    </Col>
                    <Col span={24}>
                        <div className={styles.itgr}>
                            <button className={styles.item}>
                                <Image src={google} alt="" />
                            </button>
                            <button className={styles.item}>
                                <Image src={facebook} alt="" />
                            </button>
                            <button className={styles.item}>
                                <Image src={twitter} alt="" />
                            </button>
                        </div>
                    </Col>
                </Row>    
            </Col>    
        </Modal>
    )
}

export default Signup