import { Modal, ModalFuncProps, Row, Col } from 'antd';
import styles from './ReportModal.module.scss';
import {FC, useState, useEffect} from 'react';
import Item from './components/Item/Item';
import ApiService from '@/service/apiService';
import Button from '@/components/Button/Button';
import { useAppSelector } from '@/hooks/useTypesRedux';
import notify from '@/helpers/notify';

const service = new ApiService()
const list = [
    {value: 'SPAM', label: 'Spam'},
    {value: 'NUDITY', label: 'Nudity'},
    {value: 'INAPPROPRIATE', label: 'Inappropriate'},
    {value: 'VIOLENCE', label: 'Violence'},
    {value: 'COPYRIGHT', label: 'Copyright'},
]

interface I {
    product?: any
}

const ReportModal:FC<ModalFuncProps & I> = (props) => {
    const {
        onCancel,
        product

    } = props
    const {token: {access}} = useAppSelector(s => s.main)
    const [selected, setSelected] = useState<string>()
    const [load, setLoad] = useState(false)

    useEffect(() => console.log(product), [product])

    const onClose = () => {
        setSelected(undefined)
        onCancel && onCancel()
    }

    const onReport = () => {
        if(access && product && selected) {
            service.onReport(access, {report_reason: selected, card: product}).then(res => {
                if(res) {
                    onClose()
                }
            }).finally(() => {
                setLoad(false)
            })
        }
        if(!access) notify('You are not authorized', 'ERROR')
    }

    return (
        <Modal
            {...props}
            onCancel={onClose}       
            className={`${styles.wrapper} modal`}
            >
            <Row gutter={[10,10]} style={{paddingTop: 30}}>
                {
                    list?.map((i, index) => (
                        <Col key={index} span={24}>
                            <Item
                                value={i.value}
                                label={i.label}
                                onChange={setSelected}
                                selected={selected}
                                />
                        </Col>
                    ))
                }
                <div className={styles.action}>
                    <div className={styles.item}>
                        <Button
                            text='Cancel'
                            variant={'brown'}
                            onClick={onClose}
                            />
                    </div>
                    <div className={styles.item}>
                    <Button 
                        text='Send'
                        load={load}
                        disabled={!selected}
                        onClick={onReport}
                        />
                    </div>
                </div>
            </Row>
        </Modal>
    )
}

export default ReportModal;