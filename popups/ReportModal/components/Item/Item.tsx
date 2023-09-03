import { FC } from 'react';
import styles from './Item.module.scss';


interface I {
    value: string,
    selected?: string,
    label: string
    onChange: (...args: any[]) => any
}

const Item:FC<I> = ({
    selected,
    value,
    label,
    onChange
}) => {


    return (
        <div 
            onClick={() => onChange(value)}
            className={`${styles.wrapper} ${value === selected ? styles.active : ''}`}>
            {label}
        </div>
    )
}

export default Item;