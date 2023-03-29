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
    icon?: React.ReactNode,
    round?: boolean,
    badge?: number | string
    onClick?: (...args: any[]) => any 
} 

export type buttonVariants = 'default' | 'danger' | 'success' | 'black' | 'brown' | 'white' | 'blue' | 'transparent' | 'gray'