import {FC, useEffect} from 'react';
import { ILoadMore } from './interface';
import { useInView } from 'react-intersection-observer';


export const LoadPrev:FC<ILoadMore> = ({
    setPage,
    page,
    setPrevPage
}) => {
    const {inView, ref} = useInView()
    
    useEffect(() => {
        inView && setPage(s => {
            setPrevPage && setPrevPage(s)
            return s - 1
        })
    }, [inView, setPage])

    return (
        <div ref={ref}/>
    )
}



export const LoadNext:FC<ILoadMore> = ({
    setPage,
    setPrevPage,
    page
}) => {
    const {ref, inView} = useInView({
        rootMargin: '0px 0px 50% 0px'
    })

    useEffect(() => {
        inView && setPage(s => {
            setPrevPage && setPrevPage(s)
            return s + 1
        })
    }, [inView, setPage])

    return (
        <div ref={ref}/>
    )
}


