import styles from './DeleteAccountModal.module.scss';
import { FC, useEffect, useState } from 'react'
import {Modal, ModalFuncProps, Row, Col} from 'antd'
import getClassNames from '@/helpers/getClassNames';
import { useDeleteAccountMutation } from '@/store/slices/apiSlice';
import { useAppDispatch, useAppSelector } from '@/hooks/useTypesRedux';
import Button from '@/components/Button/Button';
import notify from '@/helpers/notify';
import { deauthorizeFunc } from '@/helpers/authorizeUtils';
import { main_deleteToken } from '@/store/slices/mainSlice';
import Router from 'next/router';

const DeleteAccountModal:FC<ModalFuncProps> = (props) => {
  const dispatch = useAppDispatch()
  const {onCancel} = props
  const [deleteAcoount, deleteAcoountRes] = useDeleteAccountMutation()
  const {token: {access}} = useAppSelector(s => s.main)
  const [load, setLoad] = useState(false)

  const onDelete = () => {
    if(access) {
      setLoad(true)
      deleteAcoount(access).finally(() => setLoad(false))
    }
  }

  useEffect(() => {
    const {data, isLoading, isSuccess, isError} = deleteAcoountRes
    if(isSuccess && !isLoading) {
      notify('Account is deleted!', "SUCCESS")
      deauthorizeFunc()
      dispatch(main_deleteToken())
      onCancel && onCancel()
      Router.push('/')
    }
    if(isError) notify('Error occured!', 'ERROR')
  }, [deleteAcoountRes])

  return (
    <Modal
      {...props}
      footer={false}
      className={getClassNames([styles.wrapper, 'modal'])}
      >
      <Row gutter={[20,20]}>
        <Col span={24}>
          <div className={styles.text}>
          Do you really want to delete your account?
          </div>
        </Col>
        <Col span={24}>
          <Row gutter={[10,10]}>
            <Col span={12}>
              <Button
                text='Yes'
                onClick={onDelete}
                load={load}
                style={{width: '100%'}}
                />
            </Col>
            <Col span={12}>
              <Button
                text='No'
                onClick={onCancel}
                variant={'brown'}
                style={{width: '100%'}}
                />
            </Col>
          </Row>
        </Col>
      </Row>
    </Modal>
  )
}

export default DeleteAccountModal;