import { StaticImageData } from "next/image"
import { CSSProperties } from "react"

export type avatarTypes = {
    image?: StaticImageData,
    size?: number | string,
    isActive?: boolean,
    style?: CSSProperties
}