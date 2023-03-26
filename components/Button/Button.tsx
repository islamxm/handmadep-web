import styles from './Button.module.scss';
import {FC} from 'react';
import { buttonTypes, buttonVariants } from './types';
import { CircleLoader } from 'react-spinners';
import { Tooltip } from 'antd';

const Button:FC<buttonTypes> = ({
    text,
    after,
    before,
    variant,
    style,
    disabled,
    color = '#fff',
    tooltip,
    load,
    onClick = () => {}
}) => {

    const switchVariant = (variant: buttonVariants = 'default') => {
        switch(variant) {
            case 'black':
                return styles.black
            case 'default':
                return styles.default
            case 'danger':
                return styles.danger
            case 'success':
                return styles.success
            case 'brown':
                return styles.brown
            case 'white':
                return styles.white
            default:
                return styles.default
        }
    }


    if(tooltip) {
        return (
            <Tooltip
                title={tooltip}
                trigger={['hover']}
                placement={'bottom'}
                >
                <button onClick={onClick} style={style} disabled={disabled} className={`${styles.button} ${switchVariant(variant)} ${load ? styles.load : ''}`}>
                    <div className={styles.load}><CircleLoader color={color}/></div>   
                    {
                        before ? (
                            <div className={`${styles.side} ${styles.before}`}>{before}</div>
                        ) : null
                    }
                    {
                        text ? (
                            <div className={styles.text}>{text}</div>
                        ) : null
                    }
                    {
                        after ? (
                            <div className={`${styles.side} ${styles.after}`}>{after}</div>
                        ) : null
                    }
                </button>
            </Tooltip>
        )
    }

    return (
        <button onClick={onClick} style={style} disabled={disabled} className={`${styles.button} ${switchVariant(variant)} ${load ? styles.load : ''}`}>
            <div className={styles.load}><CircleLoader color={color}/></div>   
            {
                before ? (
                    <div className={`${styles.side} ${styles.before}`}>{before}</div>
                ) : null
            }
            {
                text ? (
                    <div className={styles.text}>{text}</div>
                ) : null
            }
            {
                after ? (
                    <div className={`${styles.side} ${styles.after}`}>{after}</div>
                ) : null
            }
        </button>
    )
}

export default Button;