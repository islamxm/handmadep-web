import styles from './Product.module.scss';
import Link from 'next/link';
import {FC, useEffect, useState, useRef, memo} from 'react';
import {IProduct} from '@/models/IProduct';
import Image from 'next/image';
import {motion, AnimatePresence} from 'framer-motion';
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
import placeholder from '@/public/assets/handmade-watermark.png';
import Button from '../Button/Button';
import { useDoubleTap } from 'use-double-tap';
import colors from '@/helpers/colors';
import { useInView } from 'react-intersection-observer';
import * as _ from 'lodash';
import Router from 'next/router';



interface ITest extends IProduct {
    isLast?: boolean,
    newLimit?: (...args: any[]) => any
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
        newLimit
    } = data
    const [randomHeight, setRandomHeight] = useState<number>(150)
    const cardRef = useRef<HTMLDivElement | null>(null)
    const [liked, setLiked] = useState(false)
    const [pinned, setPinned] = useState(false)
    const [likeLayer, setLikeLayer] = useState(false)

    const [bg, setBg] = useState('rgb(55, 29, 49)')
    const [loaded, setLoaded] = useState(false)


    useEffect(() => {
        setRandomHeight(_.random(150, 350))
    }, [])
    
    useEffect(() => {
        setBg(colors[_.random(colors?.length - 1)])
    }, [])


    const bind = useDoubleTap((event) => {
        setLiked(true)
        setLikeLayer(true)
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


    



    return (
        <motion.div 
            className={`${styles.wrapper} ${loaded ? styles.loaded : ''}`}
            ref={cardRef}
            >
            <motion.div 
                // initial={{height: '100%'}}
                // animate={{height: 0}}
                // transition={{
                //     duration: 1.5,
                //     ease: 'easeInOut'
                // }}
                initial='hidden'
                whileInView={'visible'}
                variants={{
                    hidden: {height: '100%'},
                    visible: {
                        height: 0,
                        transition: {
                            duration: 1.5,
                            ease: 'easeInOut',
                        },
                    },
                }}
                viewport={{once: true}}
                className={styles.layer}></motion.div>
            <div className={styles.opts}>
                <div className={styles.item}>
                    <Button
                        round
                        variant={'white'}
                        onClick={() => {
                            !liked ? setLikeLayer(true) : setLikeLayer(false)
                            setLiked(s => !s)
                        }}
                        icon={liked ? <BsHeartFill color='var(--brown)'/> : <BsHeart/>}
                        />
                </div>
                <div className={styles.item}>
                    <Button
                        round
                        variant={'white'}
                        icon={<BsShareFill/>}
                        />
                </div>
            </div>
            <div className={styles.action}>
                <div className={styles.item}>
                    <Button
                        round
                        variant={'transparent'}
                        onClick={() => setPinned(s => !s)}
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
                <div className={styles.image} style={{backgroundColor: bg, height: randomHeight}}>
                            <Image
                                className={styles.image_el}
                                // placeholder={'blur'}
                                loader={(p) => {
                                    return p?.src ? p?.src : ''
                                }} 
                                onLoad={(e) => {
                                    setLoaded(true)
                                }}
                                // priority
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