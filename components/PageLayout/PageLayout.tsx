import styles from './PageLayout.module.scss';
import {FC} from 'react';
import Header from '../Header/Header';
import Menu from '../Menu/Menu';

const PageLayout:FC<{children?: React.ReactNode}> = ({
    children
}) => {
    
    return (
        <div className={styles.wrapper}>
            <Header/>
            {children}
            <Menu/>
        </div>
    )
}


export default PageLayout