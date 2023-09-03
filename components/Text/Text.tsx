import styles from './Text.module.scss';
import {FC, useState, useRef, useEffect} from 'react';
import { textTypes } from './types';
import getClassNames from '@/helpers/getClassNames';

const Text:FC<textTypes> = (props) => {
    const [focused, setFocused] = useState(false)
    const textRef = useRef<HTMLTextAreaElement>(null);

    const {value, placeholder, error} = props || {}

    useEffect(() => {
        !value ? setFocused(false) : setFocused(true)
    }, [value])
    
    const onBlur = () => {
        !value ? setFocused(false) : setFocused(true)
    }
    const focusInp = () => {
        textRef?.current && textRef.current.focus()
    }

    const onFocus = () => setFocused(true)

    return (
        <div
            className={getClassNames([styles.wrapper, focused && styles.focus, error && styles.error])} 
            >
            <div onClick={focusInp} className={styles.label}>{placeholder}</div>
            <textarea
                {...props}
                ref={textRef}
                onFocus={onFocus}
                onBlur={onBlur}
                className={styles.input}
                />
        </div>
        
    )
}

export default Text;