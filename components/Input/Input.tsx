import { inputTypes } from "./types";
import {FC, useRef, useState} from 'react';
import styles from './Input.module.scss';



const Input:FC<inputTypes> = (props) => {
    const [focused, setFocused] = useState(false)
    const inpRef = useRef<HTMLInputElement>(null);

    const {value, placeholder, error} = props || {}
    
    const onBlur = () => {
        !value ? setFocused(false) : setFocused(true)
    }
    const focusInp = () => {
        inpRef?.current && inpRef.current.focus()
    }

    const onFocus = () => setFocused(true)

    return (
        <div className={`${styles.wrapper} ${focused ? styles.focus : ''} ${error ? styles.error : ''}`}>
            <div onClick={focusInp} className={styles.label}>{placeholder}</div>
            <input
                {...props}
                ref={inpRef}
                onFocus={onFocus}
                onBlur={onBlur}
                className={styles.input}
                />
        </div>
        
    )
}

export default Input;