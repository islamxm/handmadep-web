import styles from './Container.module.scss';
import {FC} from 'react';

const Container:FC<{children?: React.ReactNode}> = ({
    children
}) => {

    return (
        <div className={styles.wrapper}>
            {children}
        </div>
    )
}


export default Container;