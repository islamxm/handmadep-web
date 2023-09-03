import { inputTypes } from "./types";
import {FC, useRef, useState, useEffect} from 'react';
import styles from './Input.module.scss';
import getClassNames from "@/helpers/getClassNames";


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

    useEffect(() => {
        !value ? setFocused(false) : setFocused(true)
    }, [value])
    

    const onFocus = () => setFocused(true)

    return (
        <div className={getClassNames([styles.wrapper, focused && styles.focus, error && styles.error])}>
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