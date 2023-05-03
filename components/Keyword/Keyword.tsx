import styles from './Keyword.module.scss';
import {FC} from 'react';
import Link from 'next/link';


const Keyword:FC<{
    label?: string,
    id?: number
}> = ({
    label,
    id
}) => {

    return (
        <Link className={styles.wrapper} href={`/search/${id}`}>
            {label}
        </Link>
    )
}

export default Keyword;