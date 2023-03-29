import styles from './Signup.module.scss';
import {Modal, ModalFuncProps, Col, Row} from 'antd'
import {FC, useState} from 'react';


const Signup:FC<ModalFuncProps> = (props) => {

    return (
        <Modal  
            {...props}
            className={`${styles.wrapper} modal`}
            >
                
        </Modal>
    )
}

export default Signup