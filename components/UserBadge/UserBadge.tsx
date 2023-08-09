import styles from './UserBadge.module.scss';
import Avatar from '../Avatar/Avatar';
import {FC} from 'react';
import { StaticImageData } from 'next/image';
import placeholder from '@/public/assets/avatar-placeholder.png';


const UserBadge:FC<{
    image?: string | StaticImageData,
    username?: string,
    classNames?: string[],
    style?: React.CSSProperties,
    linkObj?: {link: string, rel?: 'nofollow'}
}> = ({
    image,
    username,
    classNames,
    style,
    
    linkObj
    
}) => {

    if(linkObj ) {
        return (
            <a href={linkObj?.link} rel={linkObj?.rel} target='_blank' style={style} className={`${styles.wrapper} ${classNames ? classNames?.map(i => i) : ''}`}>
                <div className={styles.avatar}>
                    <Avatar
                        label={username}
                        size={35}
                        image={image}
                        />    
                </div>           
                <div className={styles.label}>
                    {username}    
                </div> 
            </a>
        )
    }
    return (
        <div style={style} className={`${styles.wrapper} ${classNames ? classNames?.map(i => i) : ''}`}>
            <div className={styles.avatar}>
                <Avatar
                    label={username}
                    size={35}
                    image={image}
                    />    
            </div>           
            <div className={styles.label}>
                {username}    
            </div> 
        </div>
    )
}

export default UserBadge;