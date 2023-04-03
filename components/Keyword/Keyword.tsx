import styles from './Keyword.module.scss';
import {FC} from 'react';
import Link from 'next/link';


const Keyword:FC<{
    label?: string,
    id?: string
}> = ({
    label,
    id
}) => {

    return (
        <Link className={styles.wrapper} href={'/'}>
            {label}
        </Link>
    )
}

export default Keyword;