import { Modal, ModalFuncProps, Row, Col } from 'antd';
import styles from './ReportModal.module.scss';
import {FC, useState, useEffect} from 'react';
import Item from './components/Item/Item';
import Button from '@/components/Button/Button';
import { useAppSelector } from '@/hooks/useTypesRedux';
import notify from '@/helpers/notify';
import {useReportProductMutation} from '@/store/slices/apiSlice';
import ReportReasons from '@/models/ReportReasons';


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
    const [selected, setSelected] = useState<ReportReasons | undefined>()
    const [reportProductResponse, reportProductResponseResult] = useReportProductMutation()

    const onClose = () => {
        setSelected(undefined)
        onCancel && onCancel()
    }
    
    const onSubmit = () => {
        if(access && product && selected) {
            reportProductResponse({token: access, body: {report_reason: selected, card: product}})
        }
        if(!access) notify('You are not authorized', 'ERROR')
    }

    useEffect(() => {
        if(reportProductResponseResult.isSuccess) {
            notify('Report sended', 'SUCCESS')
            onClose()
        } 
        if(reportProductResponseResult.isError) {
            notify('An error has occurred', 'ERROR')
        }
    }, [reportProductResponseResult])


    return (
        <Modal
            {...props}
            onCancel={onClose}  
            centered     
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
                        load={reportProductResponseResult.isLoading}
                        disabled={!selected}
                        onClick={onSubmit}
                        />
                    </div>
                </div>
            </Row>
        </Modal>
    )
}

export default ReportModal;