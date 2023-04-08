import {Modal, Row, Col, ModalFuncProps} from 'antd'
import styles from './LogoutModal.module.scss';
import {FC, useState} from 'react';
import Button from '@/components/Button/Button';
import { useAppSelector } from '@/hooks/useTypesRedux';
import { Cookies } from 'typescript-cookie';
import ApiService from '@/service/apiService';

const service = new ApiService();


const LogoutModal:FC<ModalFuncProps> = (props) => {
    const {onCancel} = props
    const [load, setLoad] = useState(false)

    const onClose = () => {
        onCancel && onCancel()
    }

    const logout = () => {
        //setLoad(true)

    }

    return (
        <Modal
            {...props}
            onCancel={onClose}
            className={`${styles.wrapper} modal`}
            >
            <Row gutter={[50,50]}>
                <Col span={24}>
                    <div className='modal-head page-title'>
                        Are you sure you want to logout?
                    </div>
                </Col>
                <Col span={24}>
                    <Row gutter={[20,20]}>
                        <Col span={12}>
                            <Button
                                variant='blue'
                                text='Cancel'
                                style={{width: '100%'}}
                                onClick={onClose}
                                />
                        </Col>
                        <Col span={12}>
                            <Button
                                text='Logout'
                                variant='brown'
                                style={{width: '100%'}}
                                onClick={logout}
                                />
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Modal>
    )
}

export default LogoutModal;