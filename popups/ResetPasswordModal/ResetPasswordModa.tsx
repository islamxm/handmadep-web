import {Modal, ModalFuncProps, Row, Col} from 'antd';
import {ChangeEvent, FC, useEffect, useState} from 'react'
import styles from './ResetPasswordModal.module.scss'
import Input from '@/components/Input/Input';
import Button from '@/components/Button/Button';
import { useResetPasswordMutation } from '@/store/slices/apiSlice';
import notify from '@/helpers/notify';
import GlobalLinks from '@/components/GlobalLinks/GlobalLinks';

const ResetPasswordModal:FC<ModalFuncProps> = (props) => {
    const {onCancel} = props
    const [load, setLoad] = useState(false)
    const [error, setError] = useState(false)
    const [email, setEmail] = useState<string>('')
    const [resetPasswordResponse, resetPasswordResponseResult] = useResetPasswordMutation()

    const onClose = () => {
        setEmail('')
        setLoad(false)
        setError(false)
        onCancel && onCancel()
    }

    const onSubmit = () => {
        if(email) {
            resetPasswordResponse({email})
        }
    }


    useEffect(() => {
        setLoad(resetPasswordResponseResult.isLoading)
        setError(resetPasswordResponseResult.isError)
        if(resetPasswordResponseResult.isSuccess) {
            notify('Check e-mail to reset your password', 'SUCCESS')
        }
    }, [resetPasswordResponseResult])

    return (
        <Modal
            {...props}
            onCancel={onClose}
            width={500}
            className={`${styles.wrapper} modal`}
            >
            <div className='modal-head page-title'>Reset password</div>
            <Col span={24}>
                <Row gutter={[10,10]}>
                    <Col span={24}>
                        <Input
                            error={error}
                            value={email}
                            onChange={(e:ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                            placeholder='E-mail'
                            />
                    </Col>
                    <Col span={24} style={{justifyContent: 'center', display: 'flex'}}>
                        <Button 
                            load={load}
                            disabled={!email}
                            text='Send mail'
                            onClick={onSubmit}
                            />
                    </Col>
                </Row>
            </Col>
        </Modal>
    )
}


export default ResetPasswordModal;