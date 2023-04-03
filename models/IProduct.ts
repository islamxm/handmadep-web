import { StaticImageData } from "next/image";

interface IProduct {  
    image?: StaticImageData,
    images?: StaticImageData[] | string[]
    label?: string,
    
    id?: string,
    descr?: string,
    keywords?: string[],
    author?: string,
    link?: string | URL,



    // ** свойства текущего состояния (нужно уточнить)
    isPinned?: boolean,
    isLiked?: boolean,
}


export default IProduct;