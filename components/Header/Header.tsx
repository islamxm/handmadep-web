import styles from './Header.module.scss';
import { headerTypes } from './types';
import {FC} from 'react';
import Container from '../Container/Container';
import Button from '../Button/Button';
import {BsPlusLg} from 'react-icons/bs'

const Header:FC<headerTypes> = () => {

    return (
        <div className={styles.wrapper}>
            <Container>
                <div className={styles.in}>
                    <div className={`${styles.part} ${styles.logo}`}>
                        
                    </div>
                    <div className={`${styles.part} ${styles.action}`}>
                        <div className={styles.item}>
                            <Button
                                text='Home'
                                />
                        </div>
                        <div className={styles.item}>
                            <Button
                                variant={'white'}
                                text={"Create"}
                                after={<BsPlusLg/>}
                                tooltip={'Coming soon'}
                                />
                        </div>
                    </div>
                    <div className={`${styles.part} ${styles.search}`}></div>
                    <div className={`${styles.part} ${styles.action}`}></div>
                </div>
            </Container>
        </div>
    )
}

export default Header;