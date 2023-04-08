import styles from './Body.module.scss';
import {FC} from 'react';
import {IProduct} from '@/models/IProduct';
import { Row, Col } from 'antd';
import Button from '@/components/Button/Button';
import UserBadge from '@/components/UserBadge/UserBadge';
import Keyword from '@/components/Keyword/Keyword';
import {BsHeart, BsHeartFill, BsShareFill, BsFlagFill} from 'react-icons/bs';

const kwMock = ['keyword 1', 'keyword 2', 'keyword 3', 'keyword 1', 'keyword 2', 'keyword 3', 'keyword 1', 'keyword 2', 'keyword 3', 'keyword 1', 'keyword 2', 'keyword 3',]


const Body:FC<IProduct> = ({
   
}) => {

    return (
        <div className={`${styles.wrapper} panel`}>
            {/* <div className={styles.body}>
                <div className={styles.action}>
                    <div className={styles.item}>
                        <Button text='Save' variant={'brown'}/>
                    </div>
                    <div className={styles.item}>
                        <Button
                            icon={<BsHeart size={25}/>}
                            round
                            variant='white'
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
                            <h2 className={styles.title}>{label} Product Name</h2>
                        </Col>
                        <Col span={24}>
                            <div className={styles.descr}>
                                {descr}
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut nulla omnis exercitationem vitae veritatis voluptates, odit nemo sunt sed repellat suscipit repellendus, esse commodi. Tenetur nam eligendi soluta dolor nostrum.
                            </div>
                        </Col>
                        <Col span={24}>
                            <div className={styles.keywords}>
                                {
                                    keywords?.map((item,index) => (
                                        <div className={styles.keywords_item} key={index}>
                                            <Keyword
                                                label={item}
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
                                        username='User Name'
                                        />
                                </div>
                                <div className={styles.button}>
                                    <Button
                                        text='Link'
                                        />
                                </div>
                            </div>
                        </Col>
                    </Row>
                </div>
            </div> */}
        </div>
    )
}

export default Body;