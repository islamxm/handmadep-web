import styles from './PageTitle.module.scss';
import {FC} from 'react';

const PageTitle:FC<{title?: string | string[], style?: React.CSSProperties, isTitle?: boolean}> = ({title, style, isTitle = true}) => {

    if(!isTitle) {
        return (
            <p style={style} className={styles.wrapper}>{title}</p>
        )
    }
    return (
        <h1 style={style} className={styles.wrapper}>{title}</h1>
    )
}


export default PageTitle;