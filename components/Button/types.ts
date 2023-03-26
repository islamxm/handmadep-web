import { CSSProperties } from "react"

export type buttonTypes = {
    tooltip?: string | boolean,
    text?: string,
    variant?: buttonVariants,
    before?: React.ReactNode,
    after?: React.ReactNode,
    disabled?: boolean,
    load?: boolean,
    color?: string,
    style?: CSSProperties,
    onClick?: (...args: any[]) => any 
} 

export type buttonVariants = 'default' | 'danger' | 'success' | 'black' | 'brown' | 'white'