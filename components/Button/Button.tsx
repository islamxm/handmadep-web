import styles from './Button.module.scss';
import {FC} from 'react';
import { buttonTypes, buttonVariants } from './types';
import { Tooltip } from 'antd';
import Link from 'next/link';
import {LoadingOutlined} from '@ant-design/icons';
import getClassNames from '@/helpers/getClassNames';

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
    blank,
    className,
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
                    link && blank ? (
                        <a 
                            href={link} 
                            rel={'nofollow'} 
                            target='_blank' 
                            style={style} 
                            className={getClassNames([styles.button, switchVariant(variant), load && styles.load, round && styles.round, disabled && styles.disabled, className])}>
                            <div className={styles.load}><LoadingOutlined size={35}  color={color}/></div>   
                            {
                                before && (
                                    <div className={`${styles.side} ${styles.before}`}>{before}</div>
                                ) 
                            }
                            {
                                text && (
                                    <div className={styles.text}>{text}</div>
                                ) 
                            }
                            {
                                after && (
                                    <div className={`${styles.side} ${styles.after}`}>{after}</div>
                                ) 
                            }
                            {
                                icon && (
                                    <div className={styles.icon}>{icon}</div>
                                ) 
                            }
                            {
                                badge && (
                                    <div className={styles.badge}>
                                        {badge > 99 ? '+99' : badge}
                                    </div>
                                )
                            }
                        </a>
                    ) : null
                }
                {
                    link && !blank ? (
                        <Link href={link} style={style} className={getClassNames([styles.button, switchVariant(variant), load && styles.load, round && styles.round, disabled && styles.disabled, className])}>
                            <div className={styles.load}><LoadingOutlined size={35}  color={color}/></div>   
                            {
                                before && (
                                    <div className={`${styles.side} ${styles.before}`}>{before}</div>
                                ) 
                            }
                            {
                                text && (
                                    <div className={styles.text}>{text}</div>
                                ) 
                            }
                            {
                                after && (
                                    <div className={`${styles.side} ${styles.after}`}>{after}</div>
                                )
                            }
                            {
                                icon && (
                                    <div className={styles.icon}>{icon}</div>
                                ) 
                            }
                            {
                                badge && (
                                    <div className={styles.badge}>
                                        {badge > 99 ? '+99' : badge}
                                    </div>
                                ) 
                            }
                        </Link>
                    ) : (
                        <button onClick={onClick} style={style} className={getClassNames([styles.button, switchVariant(variant), load && styles.load, round && styles.round, disabled && styles.disabled, className])}>
                            <div className={styles.load}><LoadingOutlined size={35} color={color}/></div>   
                            {
                                before && (
                                    <div className={`${styles.side} ${styles.before}`}>{before}</div>
                                ) 
                            }
                            {
                                text && (
                                    <div className={styles.text}>{text}</div>
                                )
                            }
                            {
                                after && (
                                    <div className={`${styles.side} ${styles.after}`}>{after}</div>
                                ) 
                            }
                            {
                                icon && (
                                    <div className={styles.icon}>{icon}</div>
                                )
                            }
                            {
                                badge && (
                                    <div className={styles.badge}>
                                        {badge > 99 ? '+99' : badge}
                                    </div>
                                )
                            }
                        </button>
                    )
                }
                
            </Tooltip>
        )
    }

    return (
        <>
            {
                (link && !blank) && (
                    <Link rel={'nofollow'} href={link} style={style} className={getClassNames([styles.button, switchVariant(variant), load && styles.load, round && styles.round, disabled && styles.disabled, className])}>
                        <div className={styles.load}><LoadingOutlined size={35} color={color}/></div>   
                        {
                            before && (
                                <div className={`${styles.side} ${styles.before}`}>{before}</div>
                            )
                        }
                        {
                            text && (
                                <div className={styles.text}>{text}</div>
                            )
                        }
                        {
                            after && (
                                <div className={`${styles.side} ${styles.after}`}>{after}</div>
                            )
                        }
                        {
                            icon && (
                                <div className={styles.icon}>{icon}</div>
                            )
                        }
                        {
                            badge && (
                                <div className={styles.badge}>
                                    {badge > 99 ? '+99' : badge}
                                </div>
                            )
                        }
                    </Link>
                )
            }
            {
                !link && !blank ? (
                    <button onClick={onClick} style={style} className={getClassNames([styles.button, switchVariant(variant), load && styles.load, round && styles.round, disabled && styles.disabled, className])}>
                        <div className={styles.load}><LoadingOutlined size={35} color={color}/></div>   
                        {
                            before && (
                                <div className={`${styles.side} ${styles.before}`}>{before}</div>
                            )
                        }
                        {
                            text && (
                                <div className={styles.text}>{text}</div>
                            )
                        }
                        {
                            after && (
                                <div className={`${styles.side} ${styles.after}`}>{after}</div>
                            )
                        }
                        {
                            icon && (
                                <div className={styles.icon}>{icon}</div>
                            )
                        }
                        {
                            badge && (
                                <div className={styles.badge}>
                                    {badge > 99 ? '+99' : badge}
                                </div>
                            )
                        }
                    </button>
                ) : null
            }
            {
                (link && blank) && (
                    <a href={link} target='_blank' style={style} className={getClassNames([styles.button, switchVariant(variant), load && styles.load, round && styles.round, disabled && styles.disabled, className])}>
                        <div className={styles.load}><LoadingOutlined size={35}  color={color}/></div>   
                        {
                            before && (
                                <div className={`${styles.side} ${styles.before}`}>{before}</div>
                            ) 
                        }
                        {
                            text && (
                                <div className={styles.text}>{text}</div>
                            ) 
                        }
                        {
                            after && (
                                <div className={`${styles.side} ${styles.after}`}>{after}</div>
                            ) 
                        }
                        {
                            icon && (
                                <div className={styles.icon}>{icon}</div>
                            ) 
                        }
                        {
                            badge && (
                                <div className={styles.badge}>
                                    {badge > 99 ? '+99' : badge}
                                </div>
                            )
                        }
                    </a>
                )
            }
        </>
    )
}

export default Button;