import styles from './ProductModal.module.scss';
import { Modal, ModalFuncProps, Row, Col } from 'antd';
import {FC, useState, useEffect} from 'react'
import Avatar from '@/components/Avatar/Avatar';
import UserBadge from '@/components/UserBadge/UserBadge';
import Image from 'next/image';
import { useAppSelector, useAppDispatch } from '@/hooks/useTypesRedux';
import { useGetProductQuery } from '@/store/slices/apiSlice';

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

import Button from '@/components/Button/Button';
import ApiService from '@/service/apiService';
import { main_updateCurrentProduct } from '@/store/slices/mainSlice';
interface I {

}

const service = new ApiService()

const ProductModal:FC<I & ModalFuncProps> = (props) => {
    const {onCancel, open} = props
    const {currentProduct, token: {access}} = useAppSelector(s => s.main)
    const {
        id,
    } = currentProduct || {}
    const dispatch = useAppDispatch()
    const [liked, setLiked] = useState<boolean>(false)
    const [fav, setFav] = useState<boolean>(false)
    const [data, setData] = useState<any>(null)

    

    const {
        active,
        created_at,
        description,
        etsy_ext_id,
        favorites,
        cover_url,
        is_favorited,
        is_liked,
        last_updated,
        likes,
        popularity,
        shop,
        tags,
        title,
        views
    } = data || {}

    const onClose = () => {
        dispatch(main_updateCurrentProduct(null))
        setLiked(false)
        setFav(false)
        setData(null)
        onCancel && onCancel()
    }

    const getData = () => {
        if(id) {
            service.getProduct(id).then(res => {
                console.log(res)
                setData(res)
            })
        }
    }

    useEffect(() => {
        if(id && open) {
            getData()
        } else {
            setData(null)
        }
    }, [id, open])

    const onLike = () => {
        if(access && id) {
            if(liked) {
                service.productUnlike(id, access).then(res => {
                    if(res?.status === 200 || res?.status === 201) {
                        setLiked(false)
                    }
                })
            } else {
                service.productLike(id, access).then(res => {
                    if(res?.status === 200 || res?.status === 201) {
                        setLiked(true)
                    }
                })  
            }
             
        }
    }

    const onShare = () => {}
    const onFav = () => {}
    const onOpen = () => {}

    useEffect(() => {
        if(data) {
            setLiked(is_liked)
            setFav(is_favorited)
        }
    }, [is_liked, is_favorited, data])

    return (
        <Modal
            {...props}
            onCancel={onClose}
            centered
            className={`${styles.wrapper} modal`}
            >
            <Row gutter={[10,10]}>
                <Col span={24}>
                    <div className={styles.top}>
                        <div className={styles.top_main}>
                            <UserBadge
                                username={shop?.name}
                                />
                        </div>
                    </div>
                </Col>
                <Col span={24}>
                    <div className={styles.image}>
                        {
                            cover_url && (
                                <Image
                                    src={cover_url}
                                    loader={(p) => {
                                        return p?.src ? p?.src : ''
                                    }} 
                                    width={200}
                                    height={200}
                                    alt=''
                                    />
                            )
                        }
                        
                    </div>
                </Col>
                <Col span={24}>
                    <div className={styles.name}>{title}</div>
                </Col>
                {
                    access && (
                        <Col span={24}>
                            <div className={styles.action}>
                                <div className={styles.item}>
                                    <Button
                                        icon={liked ? <BsHeartFill/> : <BsHeart/>}
                                        onClick={onLike}
                                        round
                                        variant={'gray'}
                                        />
                                </div>
                                <div className={styles.item}>
                                    <Button
                                        icon={fav ? <BsBookmarkFill/> : <BsBookmark/>}
                                        onClick={onFav}
                                        variant={'gray'}
                                        round
                                        />
                                </div>
                                {/* <div className={styles.item}></div> */}
                            </div>
                        </Col>
                    )
                }
                
            </Row>
        </Modal>
    )
}

export default ProductModal;    