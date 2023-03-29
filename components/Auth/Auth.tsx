import styles from './Auth.module.scss';
import {Row, Col, Modal, ModalFuncProps } from 'antd';
import {FC, useState} from 'react';
import Button from '../Button/Button';
import Input from '../Input/Input';
import { updateToken } from '@/store/actions';
import { useAppDispatch } from '@/hooks/useTypesRedux';
import google from '@/public/assets/auth-google.png';
import facebook from '@/public/assets/auth-facebook.png';
import twitter from '@/public/assets/auth-twitter.png';
import Image from 'next/image';


const Auth:FC<ModalFuncProps> = (props) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useAppDispatch()


    return (
        <Modal
            open
            {...props}
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
                    <Col span={24} style={{justifyContent: 'center', display: 'flex'}}>
                        <Button
                            text={'Log in'}
                            
                            />
                    </Col>
                    <Col span={24}>
                        <div className={styles.ex}>
                            Don&apos;t have account? <span>Sign up</span>
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

export default Auth;


