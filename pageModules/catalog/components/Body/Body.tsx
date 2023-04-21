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
    last_updated
}) => { 
    const [fav, setFav] = useState(false)

    useEffect(() => {
        setFav(is_favorited ? true : false)
    }, [is_favorited])

    return (
        <div className={`${styles.wrapper} panel`}>
            <div className={styles.body}>
                <div className={styles.action}>
                    <div className={styles.item}>
                        <Button text='Save' variant={'brown'}/>
                    </div>
                    <div className={styles.item}>
                        <Button
                            icon={fav ? <BsHeartFill color='var(--brown)' size={25}/>  : <BsHeart size={25}/>}
                            round
                            variant={'white'}
                            />
                    </div>
                    <div className={styles.item}>
                        <Button
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
                                        <div className={styles.keywords_item} key={index}>
                                            <Keyword
                                                label={item.toString()}
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
                                        text='Link'
                                        />
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