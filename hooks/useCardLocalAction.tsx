import {useEffect, useState} from 'react';
import LOCAL_STORAGE from '@/helpers/localStorage';
import { IProduct } from '@/models/IProduct';



const useCardLocalAction = () => {
    const [likedList, setLikedList] = useState<any>([])
    const [savedList, setSavedList] = useState([])

    useEffect(() => {
        if(LOCAL_STORAGE?.getItem('handmadep-web-list-liked')) {
            let list = LOCAL_STORAGE?.getItem('handmadep-web-list-liked') || '[]'
            setLikedList(JSON.parse(list))
        }
        if(LOCAL_STORAGE?.getItem('handmadep-web-list-saved')) {
            let list = LOCAL_STORAGE?.getItem('handmadep-web-list-saved') || '[]'
            setSavedList(JSON.parse(list))
        }
    }, [])


    const onLikeCard = (product: IProduct) => {
        let p = LOCAL_STORAGE?.getItem('handmadep-web-list-liked') || '[]'
        let list: any[] = JSON.parse(p)
        const index = list.find(i => i.id === product.id)
        if(index === -1) {
            
        } else {

        }
    }

    const onDislikeCard = (product: IProduct) => {
        
    }

    const onSaveCard = () => {

    }


    return {
        likedList,
        savedList,

        onLikeCard,
        onSaveCard
    }

}


export default useCardLocalAction;