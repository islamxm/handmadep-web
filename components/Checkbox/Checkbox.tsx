import styles from './Checkbox.module.scss';
import { checkboxPropsType } from './types';
import {FC} from 'react';
import {BsCheck} from 'react-icons/bs';


const Checkbox:FC<checkboxPropsType> = (props) => {
    const {text} = props

    return (
        <div className={styles.wrapper}>
            <input {...props} type="checkbox" className={styles.input} />
            <label htmlFor={props.id} className={styles.label}>
                <div className={styles.icon}>
                    <div className={styles.icon_el}><BsCheck/></div>
                </div>
                <div className={styles.text}>
                    {text}
                </div>
            </label>
        </div>
    )
}


export default Checkbox;