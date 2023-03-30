import styles from './Button.module.scss';
import {FC} from 'react';
import { buttonTypes, buttonVariants } from './types';
import { CircleLoader } from 'react-spinners';
import { Tooltip } from 'antd';
import Link from 'next/link';

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
    icon,
    round,
    badge,
    link,
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
            case 'gray':
                return styles.gray
            case 'transparent':
                return styles.transparent
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
                {
                    link ? (
                        <Link href={link} style={style} className={`${styles.button} ${switchVariant(variant)} ${load ? styles.load : ''} ${round ? styles.round : ''}`}>
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
                            {
                                icon ? (
                                    <div className={styles.icon}>{icon}</div>
                                ) : null
                            }
                            {
                                badge ? (
                                    <div className={styles.badge}>

                                    </div>
                                ) : null
                            }
                        </Link>
                    ) : (
                        <button onClick={onClick} style={style} disabled={disabled} className={`${styles.button} ${switchVariant(variant)} ${load ? styles.load : ''} ${round ? styles.round : ''}`}>
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
                            {
                                icon ? (
                                    <div className={styles.icon}>{icon}</div>
                                ) : null
                            }
                            {
                                badge ? (
                                    <div className={styles.badge}>

                                    </div>
                                ) : null
                            }
                        </button>
                    )
                }
                
            </Tooltip>
        )
    }

    return (
        link ? (
            <Link href={link} style={style} className={`${styles.button} ${switchVariant(variant)} ${load ? styles.load : ''} ${round ? styles.round : ''}`}>
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
                {
                    icon ? (
                        <div className={styles.icon}>{icon}</div>
                    ) : null
                }
                {
                    badge ? (
                        <div className={styles.badge}>

                        </div>
                    ) : null
                }
            </Link>
        ) : (
            <button onClick={onClick} style={style} disabled={disabled} className={`${styles.button} ${switchVariant(variant)} ${load ? styles.load : ''} ${round ? styles.round : ''}`}>
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
                {
                    icon ? (
                        <div className={styles.icon}>{icon}</div>
                    ) : null
                }
                {
                    badge ? (
                        <div className={styles.badge}>

                        </div>
                    ) : null
                }
            </button>
        )
    )
}

export default Button;