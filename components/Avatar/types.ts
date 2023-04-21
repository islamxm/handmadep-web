import { StaticImageData } from "next/image"
import { CSSProperties } from "react"

export type avatarTypes = {
    image?: StaticImageData | string,
    size?: number | string,
    isActive?: boolean,
    style?: CSSProperties,
    label?: string
}