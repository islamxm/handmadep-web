import styles from './Body.module.scss';
import {FC} from 'react';
import {IProduct} from '@/models/IProduct';
import { Row, Col } from 'antd';
import Button from '@/components/Button/Button';
import UserBadge from '@/components/UserBadge/UserBadge';
import Keyword from '@/components/Keyword/Keyword';
import {BsHeart, BsHeartFill, BsShareFill, BsFlagFill} from 'react-icons/bs';
import parse from 'html-react-parser';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAppSelector, useAppDispatch } from '@/hooks/useTypesRedux';
import { updateAuthPopup, updateSignupPopup } from '@/store/actions';
import ApiService from '@/service/apiService';
import FancyboxWrapper from '@/components/FancyboxWrapper/FancyboxWrapper';
import { useWindowSize } from 'usehooks-ts';
import {BiLinkExternal} from 'react-icons/bi'

const service = new ApiService()

const Body:FC<IProduct> = ({
    cover_url,
    created_at,
    description,
    etsy_ext_id,
    id,
    shop,
    tags,
    title,
    views, 
    active,

    is_favorited,
    last_updated,
    is_liked
}) => { 
    const dispatch = useAppDispatch()
    const {token: {access}} = useAppSelector(s => s)
    const router = useRouter()
    const {width} = useWindowSize()
    const [liked, setLiked] = useState(false)
    const [pinned, setPinned] = useState(false)
    const [likedLoad, setLikeLoad] = useState(false)
    const [pinLoad, setPinLoad] = useState(false)

    const openAuth = () => dispatch(updateAuthPopup(true))

    useEffect(() => {
        setPinned(is_favorited ? true : false)
        setLiked(is_liked ? true : false)
    }, [is_favorited, is_liked])


    const onShare = () => {

        if(process?.browser && navigator?.share && navigator?.canShare({
            url: window?.location?.href,
            text: title,
            title: title,
        })) {
            navigator?.share({
                url: window?.location?.href,
                text: title,
                title: title,
            })
        } else {
            console.log("CAN'T SHARE")
        }
    }


    const onLike = () => {
        if(access && id) {
            if(!liked) {
                // setLikeLayer(true)
                setLikeLoad(true)
                service.productLike(id, access).then(res => {
                    if(res?.status === 201 || res?.status === 204) {
                        // setLikeLayer(true)
                        setLiked(true)
                    } else {
                        // setLikeLayer(false)
                        setLiked(false)
                    }
                }).finally(() => setLikeLoad(false))
            } else {
                setLikeLoad(true)
                service.productUnlike(id, access).then(res => {
                    if(res?.status === 201 || res?.status === 204) {
                        // setLikeLayer(false)
                        setLiked(false)
                    } else {
                        // setLikeLayer(true)
                        setLiked(true)
                    }
                }).finally(() => setLikeLoad(false))
                // setLikeLayer(false)
            }
            // setLiked(s => !s)
        } else {
            openAuth()
        }
    }   

    const onSave = () => {
        if(access && id) {
            if(!pinned) {
                setPinLoad(true)
                service.productSave(id, access).then(res => {
                    console.log(res)
                    if(res?.status === 201 || res?.status === 204) {
                        setPinned(true)
                    } else {
                        setPinned(false)
                    }
                }).finally(() => setPinLoad(false))
            } else {
                setPinLoad(true)
                service.productUnsave(id, access).then(res => {
                    console.log(res)
                    if(res?.status === 201 || res?.status === 204) {
                        setPinned(false)
                    } else {
                        setPinned(true)
                    }
                }).finally(() => setPinLoad(false))
            }
        } else {
            openAuth()
        }
    }


    return (
        <div className={`${styles.wrapper} panel`}>
            <div className={styles.body}>
                <div className={styles.action}>
                    <div className={`${styles.item} ${styles.save}`}>
                        {
                            pinned ? (
                                <Button
                                    onClick={onSave} 
                                    text='Saved' 
                                    variant={'blue'}/> 
                            ) : (
                                <Button
                                    onClick={onSave} 
                                    text='Save' 
                                    variant={'brown'}/>
                            )
                        }
                        
                    </div>
                    <div className={styles.item}>
                        <Button
                            onClick={onLike}
                            icon={liked ? <BsHeartFill color='var(--brown)' size={25}/>  : <BsHeart size={25}/>}
                            round
                            variant={'white'}
                            />
                    </div>
                    <div className={styles.item}>
                        <Button
                            onClick={onShare}
                            icon={<BsShareFill size={25}/>}
                            round
                            variant='white'
                            />
                    </div>
                    <div className={styles.item}>
                        <Button
                            icon={<BsFlagFill size={25}/>}
                            round
                            variant='white'
                            />
                    </div>
                </div>
                <div className={styles.main}>
                    <Row gutter={[20,20]}>
                        <Col span={24}>
                            <h2 className={styles.title}>{title}</h2>
                        </Col>
                        {
                            description ? (
                                <Col span={24}>
                                    <div className={styles.descr}>
                                        {parse(description)}
                                    </div>
                                </Col>
                            ) : null
                        }
                        
                        <Col span={24}>
                            <div className={styles.keywords}>
                                {
                                    tags?.map((item,index) => (
                                        <div className={styles.keywords_item} key={item.id}>
                                            <Keyword
                                                label={item.keyword}
                                                id={item.id}
                                                />
                                        </div>
                                    ))
                                }
                            </div>
                        </Col>
                        <Col span={24}>
                            <div className={styles.ex}>
                                <div className={styles.author}>
                                    <UserBadge
                                        username={shop?.name}
                                        />
                                </div>
                                <div className={styles.button}>
                                    <Button
                                        link={shop?.shop_url}
                                        blank
                                        
                                        text={width > 768 ? 'Link' : undefined}
                                        round={width <= 768}
                                        icon={width <= 768 && <BiLinkExternal/>}
                                        />
                                </div>
                                <div className={`${styles.button} ${styles.button_save}`}>
                                    {
                                        pinned ? (
                                            <Button
                                                onClick={onSave} 
                                                text='Saved' 
                                                variant={'blue'}/> 
                                        ) : (
                                            <Button
                                                onClick={onSave} 
                                                text='Save' 
                                                variant={'brown'}/>
                                        )
                                    }
                                </div>
                            </div>
                        </Col>
                    </Row>
                </div>
            </div>
        </div>
    )
}

export default Body;