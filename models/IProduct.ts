import { StaticImageData } from "next/image";

export interface IProduct {  
    cover_url?: string,
    created_at?: string,
    description?: string,
    etsy_ext_id?: number,
    id: number,
    shop?: number,
    tags?: number[],
    title?: string,
    views?: number 

    // ** свойства текущего состояния (нужно уточнить)
    is_favorited?: boolean,
}

export interface DetailProduct extends IProduct {
    
}



interface TestProd {
   
}

