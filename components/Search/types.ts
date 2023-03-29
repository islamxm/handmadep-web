import { StaticImageData } from "next/image"

export type searchTypes = {
    focus?: boolean,
    closeSearch?: (...args: any[]) => any
}

export type searchItemType = {
    image?: StaticImageData,
    name?: string
}


export type resultType = {
    items?: searchItemType[],
    categories?: searchItemType[]
}