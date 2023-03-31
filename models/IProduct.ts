import { StaticImageData } from "next/image";

interface IProduct {
    
    image?: StaticImageData,
    label?: string,
    isPinned?: boolean,
    isLiked?: boolean,
    id?: string,
}


export default IProduct;