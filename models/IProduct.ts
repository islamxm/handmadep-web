import { StaticImageData } from "next/image";

export interface IProduct {  
    cover_url?: string,
    created_at?: string,
    description?: string,
    etsy_ext_id?: number,
    id: number,
    shop?: {
        id: number,
        name: string,
        owner: number,
        shop_cover_url: string,
        shop_url: string
    },
    tags?: number[],
    title?: string,
    views?: number 
    active?: boolean

    // ** свойства текущего состояния (нужно уточнить)
    is_favorited?: boolean,
    last_updated?: any,
}

export interface DetailProduct extends IProduct {
    
}



interface TestProd {
   
}

