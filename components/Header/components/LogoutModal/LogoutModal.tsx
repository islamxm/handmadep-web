import {Modal, Row, Col, ModalFuncProps} from 'antd'
import styles from './LogoutModal.module.scss';
import {FC, useState} from 'react';
import Button from '@/components/Button/Button';
import { useAppSelector, useAppDispatch } from '@/hooks/useTypesRedux';
import { Cookies } from 'typescript-cookie';
import notify from '@/helpers/notify';
import Router  from 'next/router';
import { cookiesStorageKeys } from '@/helpers/storageKeys';
import { main_deleteToken, main_updateLoading } from '@/store/slices/mainSlice';


const LogoutModal:FC<ModalFuncProps> = (props) => {
    const {onCancel} = props
    const dispatch = useAppDispatch()
    const [load, setLoad] = useState(false)

    const onClose = () => {
        onCancel && onCancel()
    }

    const logout = () => {
        Router.replace('/')
        setLoad(true)
        dispatch(main_updateLoading(true))
        Cookies.remove(cookiesStorageKeys.TOKEN_ACCESS)
        Cookies.remove(cookiesStorageKeys.TOKEN_REFRESH)
        if(process?.browser) {
            sessionStorage.removeItem(cookiesStorageKeys.TOKEN_ACCESS)
            sessionStorage.removeItem(cookiesStorageKeys.TOKEN_REFRESH)
        }
        dispatch(main_deleteToken())
        setLoad(false)
        notify('Logged out', 'SUCCESS')
        onClose()
        dispatch(main_updateLoading(false))
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
                                load={load}
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