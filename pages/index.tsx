import List from "@/components/List/List";
import ContentLayout from "@/components/ContentLayout/ContentLayout";
import ApiService from "@/service/apiService";
import { useEffect, useState } from 'react';
import styles from '@/pageModules/home/home.module.scss';
import * as _ from 'lodash';
import { useAppSelector } from "@/hooks/useTypesRedux";
import { useInView } from "react-intersection-observer"
import { GetServerSideProps } from "next";
import { LoadPrev, LoadNext } from "@/components/loadMoreCtrl/loadMoreCtrl";
import { Cookies } from "typescript-cookie";
import Router from "next/router";

const service = new ApiService()



export const getServerSideProps: GetServerSideProps = async (context) => {
    const { query: { page } } = context

    const res = await service.getCardsList(page ?? 1)
    const data = await res?.results?.map((i:any) => ({...i, height: _.random(200,350)}))

    return {
        props: {
            list: data,
            initPage: page ?? 1
        }
    }
}


const HomePage = ({ list, initPage }: { list: any[], initPage: number | any }) => {
    const { token: { access } } = useAppSelector(s => s.main)

    const [prevPage, setPrevPage] = useState(0)
    const [page, setPage] = useState(1)
    const [total, setTotal] = useState(0)
    const [localList, setLocalList] = useState<any[]>([])


    // контроль возможности загрузки СЛЕДУЮЩЕЙ страницы (пока без логики)
    const [canLoadNext, setCanLoadNext] = useState(true)


    useEffect(() => {
        setLocalList(list)
    }, [list])

    useEffect(() => setPage(initPage ?? 1), [initPage])

    const getData = (page: any, type: 'init' | 'update', dir?: 'prev' | 'next') => {
        if(page) {
            if(access) {
                service.getCardsList(page, access).then(res => {
                    if(page === 1) {
                        setLocalList(res?.results?.map((i:any) => ({...i, height: _.random(200,350)})))
                    } else {
                        switch(dir) {
                            case 'next':
                                setLocalList(s => [...s, ...res?.results?.map((i:any) => ({...i, height: _.random(200,350)}))])
                                break;
                            case 'prev':
                                setLocalList(s => [...res?.results?.map((i:any) => ({...i, height: _.random(200,350)})), ...s])
                                break;
                            default:
                                setLocalList(res?.results?.map((i:any) => ({...i, height: _.random(200,350)})))
                                break;
                        }
                    }
                })
            } else {
                service.getCardsList(page).then(res => {
                    if(page === 1) {
                        setLocalList(res?.results?.map((i:any) => ({...i, height: _.random(200,350)})))
                    } else {
                        setLocalList(s => [...s, ...res?.results?.map((i:any) => ({...i, height: _.random(200,350)}))])
                    }
                })
            }
        }    
    }

    // useEffect(() => {
    //     if(access) {
    //         page === 1 && getData(1, 'init')
    //     } else setPage(1)
    // }, [access, page])
    


    // // ** обновление списка
    // const updateList = useCallback(() => {
    //     if (currentPage > 1) {

    //         if (access) {
    //             service.getCardsList(currentPage, access).then(res => {
    //                 if (res?.results?.length > 0) {
    //                     setLocalList(s => [...s, ...res?.results?.map((i: any) => ({ ...i, height: _.random(150, 350) }))])
    //                 }
    //                 if (res?.results?.length < 20) {
    //                     setLoad(false)
    //                 }
    //             })
    //         } else {
    //             service.getCardsList(currentPage).then(res => {
    //                 if (res?.results?.length > 0) {
    //                     setLocalList(s => [...s, ...res?.results.map((i: any) => ({ ...i, height: _.random(150, 350) }))])
    //                 }
    //                 if (res?.results?.length < 20) {
    //                     setLoad(false)
    //                 }
    //             })
    //         }
    //     }
    // }, [currentPage, access])


    useEffect(() => {
        if(page && access) {
            getData(page, 'init')
        }
    }, [page,access])

  


    useEffect(() => {
        if(page > 1) {
            if(page > prevPage) {
                getData(page, 'update', 'next')
            } 
            if(page < prevPage) {
                getData(page, 'update', 'prev')
            }
        }
    }, [page, prevPage])
    

    return (
        <div className={styles.wrapper}>
            <ContentLayout>
                {initPage > 1 && <LoadPrev setPage={setPage} page={page}/>}
                <List
                    setPage={setPage}
                    list={localList} />
                {(localList?.length > 0 && canLoadNext) && <LoadNext setPage={setPage} page={page}/>}
            </ContentLayout>
        </div>
    )
}

export default HomePage;