import styles from './Product.module.scss';
import {useEffect, useState, useRef, memo} from 'react';
import {IProduct} from '@/models/IProduct';
import Image from 'next/image';
import { useAppSelector, useAppDispatch } from '@/hooks/useTypesRedux';
import {motion, AnimatePresence} from 'framer-motion';
import { useLongPress } from 'use-long-press';
import {
    BsFillHeartFill,
    BsBookmark,
    BsBookmarkFill
} from 'react-icons/bs';
import placeholder from '@/public/assets/handmade-watermark.png';
import Button from '../Button/Button';
import { useDoubleTap } from 'use-double-tap';
import * as _ from 'lodash';
import Router from 'next/router';
import { useRouter } from 'next/router';
import { main_updateAuthPopup, main_updateCurrentProduct } from '@/store/slices/mainSlice';
import ApiService from '@/service/apiService';
import getClassNames from '@/helpers/getClassNames';

const service = new ApiService()

interface ITest extends IProduct {
    height?: number
    isLast?: boolean,
    newLimit?: (...args: any[]) => any,
} 

const ProductItem = ({
    data 
}: {data: ITest}) => {
    const {
        cover_url,
        created_at,
        description,
        etsy_ext_id,
        id,
        shop,
        tags,
        title,
        views,
        isLast,
        is_favorited,
        is_liked,
        newLimit,
    } = data
    const cardRef = useRef<HTMLDivElement | null>(null)
    const [liked, setLiked] = useState(false)
    const [pinned, setPinned] = useState(false)
    const [likeLayer, setLikeLayer] = useState(false)

    const [bg] = useState('rgb(55, 29, 49)')
    const [loaded, setLoaded] = useState(false)

    const dispatch = useAppDispatch()
    const {token} = useAppSelector(s => s.main)
    const {access} = token

    const openAuth = () => dispatch(main_updateAuthPopup(true))

    useEffect(() => {
        setPinned(is_favorited ? true : false)
        setLiked(is_liked ? true : false)
    }, [is_favorited, is_liked])

    const bind = useDoubleTap((event) => {
        onLike && onLike()

      }, 350, {
        onSingleTap: () => {
            Router.push(`/itm/${id}`)
        } 
      });

      

    useEffect(() => {
        let tm: any;
        if(likeLayer) {
            tm = setTimeout(() => {
                setLikeLayer(false)
            }, 1000)
        } else {
            clearTimeout(tm)
        }
        return () => {
            if(tm) {
                clearTimeout(tm)
            }
        }
    }, [likeLayer])



    const onShare = () => {
        if(process?.browser) {
            window.navigator.share({
                url:window.location.origin + `/itm/${id}`,
                title: title,  
            })   
        }
    }

    const openProductModal = useLongPress(() => {
        dispatch(main_updateCurrentProduct(data))
    })
    

    const onLike = () => {
        if(access && id) {
            if(!liked) {
                service.productLike(id, access).then(res => {
                    if(res?.status === 201 || res?.status === 204) {
                        setLikeLayer(true)
                        setLiked(true)
                    } else {
                        setLikeLayer(false)
                        setLiked(false)
                    }
                })
            } else {
                service.productUnlike(id, access).then(res => {
                    if(res?.status === 201 || res?.status === 204) {
                        setLikeLayer(false)
                        setLiked(false)
                    } else {
                        setLikeLayer(true)
                        setLiked(true)
                    }
                })
            }
        } else {
            openAuth()
        }
    }   

    const onSave = () => {
        if(access && id) {
            if(!pinned) {
                service.productSave(id, access).then(res => {
                    if(res?.status === 201 || res?.status === 204) {
                        setPinned(true)
                    } else {
                        setPinned(false)
                    }
                })
            } else {
                service.productUnsave(id, access).then(res => {
                    if(res?.status === 201 || res?.status === 204) {
                        setPinned(false)
                    } else {
                        setPinned(true)
                    }
                })
            }
        } else {
            openAuth()
        }
    }

    

    return (
        <motion.div 
            className={getClassNames([styles.wrapper, loaded ? styles.loaded : styles.loading])}
            ref={cardRef}
            {...openProductModal()}
            >
            <div className={styles.loading_el}></div>
            <div className={styles.action}>
                <div className={styles.item}>
                    <Button
                        round
                        variant={'transparent'}
                        onClick={onSave}
                        icon={pinned ? <BsBookmarkFill size={25}/> : <BsBookmark size={25}/>}
                        />
                </div>
            </div>
            <div className={styles.body} {...bind}>
                <AnimatePresence>
                    {
                        likeLayer && (
                            <motion.div 
                                initial={{opacity: 0, scale: 0}}
                                animate={{opacity: 1, scale: 1}}
                                exit={{opacity: 0, scale: 0}}
                                transition={{type: 'spring', stiffness: 400, damping: 15}}
                                className={styles.like}
                                >
                                <BsFillHeartFill/>
                            </motion.div>
                        )
                    }
                </AnimatePresence>
                <div className={styles.image} style={{backgroundColor: bg, height: data?.height}}>
                            <Image
                                className={styles.image_el}
                                loader={(p) => {
                                    return p?.src ? p?.src : ''
                                }} 
                                onLoad={(e) => {
                                    setLoaded(true)
                                }}
                                loading={'lazy'}
                                unoptimized
                                width={100}
                                height={100}
                                src={cover_url ? cover_url : placeholder} 
                                alt=''/>
                </div>
                <div className={styles.label}>{title}</div>
            </div>
        </motion.div>
    )
    
    

    
}
const Product = memo(ProductItem);
export default Product