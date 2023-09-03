import styles from './PageTitle.module.scss';
import {FC} from 'react';

const PageTitle:FC<{title?: string | string[], style?: React.CSSProperties}> = ({title, style}) => {

    return (
        <h1 style={style} className={styles.wrapper}>{title}</h1>
    )
}


export default PageTitle;