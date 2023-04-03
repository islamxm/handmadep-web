import styles from './PageTitle.module.scss';
import {FC} from 'react';

const PageTitle:FC<{title?: string | string[], style?: React.CSSProperties}> = ({title, style}) => {

    return (
        <h2 style={style} className={styles.wrapper}>{title}</h2>
    )
}


export default PageTitle;