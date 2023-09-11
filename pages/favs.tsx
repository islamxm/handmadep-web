import ContentLayout from "@/components/ContentLayout/ContentLayout";
import List from "@/components/List/List";
import PageTitle from "@/components/PageTitle/PageTitle";
import { useState, useEffect} from 'react';
import { useAppSelector } from "@/hooks/useTypesRedux";
import styles from '@/pageModules/home/home.module.scss';
import apiSlice from "@/store/slices/apiSlice";
import { LoadNext } from "@/components/loadMoreCtrl/loadMoreCtrl";
import * as _ from 'lodash';


const FavsPage = () => {
    const {token: {access}} = useAppSelector(s => s.main)
    const [getList] = apiSlice.endpoints.getFavs.useLazyQuery()
    const [localList, setLocalList] = useState<any[]>([])
    const [page, setPage] = useState(1)
    const [prevPage, setPrevPage] = useState(0)
    const [canLoadNext, setCanLoadNext] = useState(true)
    const [isEnd, setIsEnd] = useState(false)

    const getData = (
		page: any, 
		type: 'init' | 'update', 
		dir?: 'prev' | 'next') => {
		if (page) {
			setCanLoadNext(false)
			if (access) {
				getList({
							page,
							token: access
					}).then(res => {

					if(res?.data && localList?.length < res?.data?.count) {
						const newListLength = res?.data?.results?.length
						if(localList?.length + newListLength === res?.data?.count) setIsEnd(true)
						if (page === 1) {
							setLocalList(res?.data?.results?.map((i: any) => ({ ...i, height: _.random(200, 350) })))
						} else {
							switch (dir) {
								case 'next':
									setLocalList(s => [...s, ...res?.data?.results?.map((i: any) => ({ ...i, height: _.random(200, 350) }))])
									break;
								case 'prev':
									setLocalList(s => [...res?.data?.results?.map((i: any) => ({ ...i, height: _.random(200, 350) })), ...s])
									break;
								default:
									setLocalList(res?.data?.results?.map((i: any) => ({ ...i, height: _.random(200, 350) })))
									break;
							}
						}
					}
					
				}).finally(() => setCanLoadNext(true))
			}
		}
	}

    useEffect(() => {
		if (access) {
			if (page === 1) {
				getData(1, 'init')
			} else {
				setPage(1)
			}
		}
	}, [access])

	useEffect(() => {
		if (page > 1) {
			if (page > prevPage) {
				getData(page, 'update', 'next')
			}
			if (page < prevPage) {
				getData(page, 'update', 'prev')
			}
		}
	}, [page, prevPage])


    return (
        <div className={styles.wrapper}>
            <ContentLayout>
                <PageTitle
                    title={'Favorites'}
                    />
                <List 
                  setPage={setPage}
                  list={localList}/>
                {(localList?.length > 0 && canLoadNext && !isEnd) && (
                    <LoadNext
                        canLoadNext={canLoadNext}
                        page={page}
                        setPage={setPage}
                        />
                )}
            </ContentLayout>
        </div>
    )
}


export default FavsPage;