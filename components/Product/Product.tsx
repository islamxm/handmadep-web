import styles from './Product.module.scss';
import Link from 'next/link';
import {FC} from 'react';
import IProduct from '@/models/IProduct';


const Product:FC<IProduct> = ({
    image,
    label,
    isPinned,
    isLiked,
    id
}) => {

    return (
        <div className={styles.wrapper}>
            
        </div>
    )
}

export default Product;