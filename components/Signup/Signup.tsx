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


    const onSubmit = useCallback(() => {
        
    }, [email, password, repeatPassword])


    return (
        <Modal  
            {...props}
            width={500}
            className={`${styles.wrapper} modal`}
            >
            <div className='modal__head page-title'>Sign up</div>
            <Col span={24}>
                <Row gutter={[10,10]}>
                    <Col span={24}>
                        <Input
                            placeholder='E-mail'
                            />
                    </Col>
                    <Col span={24}>
                        <Input 
                            placeholder='Password'
                            type='password'
                            />
                    </Col>
                    <Col span={24}>
                        <Input
                            placeholder='Confirm password'
                            type='password'
                            />
                    </Col>
                    <Col span={24} style={{display: 'flex', justifyContent: 'center'}}>
                        <Button
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