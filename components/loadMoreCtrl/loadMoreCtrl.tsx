import {FC, useEffect} from 'react';
import { ILoadMore } from './interface';
import { useInView } from 'react-intersection-observer';
import { useAppSelector } from '@/hooks/useTypesRedux';


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
    page,
    canLoadNext
}) => {
    const {listRef} = useAppSelector(s => s.main)
    const {ref, inView} = useInView({
        root: listRef?.current,
        rootMargin: '0px 0px 50% 0px'
    })

    useEffect(() => {
        if(inView && canLoadNext) {
            setPage((s:any) => {
                setPrevPage && setPrevPage(s)
                return s + 1
            })
        }
    }, [inView, setPage])

    return (
        <div ref={ref}></div>
    )
}


