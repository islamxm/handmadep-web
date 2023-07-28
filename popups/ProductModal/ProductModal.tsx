import styles from './ProductModal.module.scss';
import { Modal, ModalFuncProps, Row, Col } from 'antd';
import {FC, useState, useEffect} from 'react'
import Avatar from '@/components/Avatar/Avatar';
import UserBadge from '@/components/UserBadge/UserBadge';
import Image from 'next/image';
import { useAppSelector, useAppDispatch } from '@/hooks/useTypesRedux';
import {
    BsFillHeartFill,
    BsFillPinAngleFill,
    BsHeart,
    BsBookmark,
    BsFillBookmarkFill, 
    BsShareFill, 
    BsFillBookmarksFill,
    BsHeartFill,
    BsBookmarkFill
} from 'react-icons/bs';

interface I {

}



const ProductModal:FC<I & ModalFuncProps> = (props) => {
    const {onCancel} = props
    const {} = useAppSelector(s => s)
    const dispatch = useAppDispatch()


    const onClose = () => {
        onCancel && onCancel()
    }

    const onLike = () => {}
    const onShare = () => {}
    const onFav = () => {}
    const onOpen = () => {}


    return (
        <Modal
            {...props}
            open
            centered
            className={`${styles.wrapper} modal`}
            >
            <Row gutter={[10,10]}>
                <Col span={24}>
                    <div className={styles.top}>
                        <div className={styles.top_main}>
                            <UserBadge
                                username='Test Name 1'
                                />
                        </div>
                    </div>
                </Col>
                <Col span={24}>
                    <div className={styles.image}>
                        {/* <Image
                            width={200}
                            height={200}
                            alt=''
                            /> */}
                    </div>
                </Col>
                <Col span={24}>
                    <div className={styles.name}>Product Name</div>
                </Col>
                <Col span={24}>
                    <div className={styles.action}>
                        <div className={styles.item}></div>
                        <div className={styles.item}></div>
                        <div className={styles.item}></div>
                    </div>
                </Col>
            </Row>
        </Modal>
    )
}

export default ProductModal;    