import {FC, useEffect} from 'react';
import { ILoadMore } from './interface';
import { useInView } from 'react-intersection-observer';
import { useAppSelector } from '@/hooks/useTypesRedux';


export const LoadNext:FC<ILoadMore> = ({
    getMore,
    canLoadNext,
    isEnd
}) => {
    const {listRef} = useAppSelector(s => s.main)
    const {ref, inView} = useInView({
        root: listRef?.current,
        rootMargin: '0px 0px 50% 0px'
    })

    useEffect(() => {
        if(inView && canLoadNext && !isEnd) {
            getMore && getMore()
        }
    }, [inView, getMore, canLoadNext, isEnd])

    return (
        <div ref={ref}></div>
    )
}


