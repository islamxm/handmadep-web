import styles from './PageLayout.module.scss';
import {FC} from 'react';
import Header from '../Header/Header';


const PageLayout:FC<{children?: React.ReactNode}> = ({
    children
}) => {
    
    return (
        <div className={styles.wrapper}>
            <Header/>
            {children}
        </div>
    )
}


export default PageLayout