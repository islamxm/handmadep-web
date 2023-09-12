import List from "@/components/List/List";
import ContentLayout from "@/components/ContentLayout/ContentLayout";
import ApiService from "@/service/apiService";
import { useEffect, useState } from 'react';
import styles from '@/pageModules/home/home.module.scss';
import * as _ from 'lodash';
import { useAppSelector } from "@/hooks/useTypesRedux";
import { GetServerSideProps } from "next";
import { LoadNext } from "@/components/loadMoreCtrl/loadMoreCtrl";
import { notFound } from 'next/navigation'

const service = new ApiService()

export const getServerSideProps: GetServerSideProps = async (context) => {
	const { query: { page } } = context

	const res = await service.getCardsList(page ?? 1)
	const data = await res?.results?.map((i: any) => ({ ...i, height: _.random(200, 350) }))

	return {
		props: {
			list: data,
			initPage: 1,
		},
		//
	}
}

const HomePage = ({ list, initPage }: { list: any[], initPage: number | any }) => {
	const { token: { access } } = useAppSelector(s => s.main)
	const [page, setPage] = useState(1)

	const [prevPage, setPrevPage] = useState(0)
	const [localList, setLocalList] = useState<any[]>([])
	const [isEnd, setIsEnd] = useState(false)

	// контроль возможности загрузки СЛЕДУЮЩЕЙ страницы (пока без логики)
	const [canLoadNext, setCanLoadNext] = useState(true)

	useEffect(() => {
		setLocalList(list)
	}, [list])

	const getData = (
		page: any, 
		type: 'init' | 'update', 
		dir?: 'prev' | 'next') => {
		if (page) {
			setCanLoadNext(false)
			if (access) {
				service.getCardsList(page).then(res => {
					console.log(res)
					if(res?.results?.length === 0) setIsEnd(true)
					if (page === 1) {
						setLocalList(res?.results?.map((i: any) => ({ ...i, height: _.random(200, 350) })))
					} else {
						switch (dir) {
							case 'next':
								setLocalList(s => [...s, ...res?.results?.map((i: any) => ({ ...i, height: _.random(200, 350) }))])
								break;
							case 'prev':
								setLocalList(s => [...res?.results?.map((i: any) => ({ ...i, height: _.random(200, 350) })), ...s])
								break;
							default:
								setLocalList(res?.results?.map((i: any) => ({ ...i, height: _.random(200, 350) })))
								break;
						}
					}
				}).finally(() => setCanLoadNext(true))
			} else {
				
				service.getCardsList(page).then(res => {
					if(res?.results?.length === 0) setIsEnd(true)
					if (page === 1) {
						setLocalList(res?.results?.map((i: any) => ({ ...i, height: _.random(200, 350) })))
					} else {
						setLocalList(s => [...s, ...res?.results?.map((i: any) => ({ ...i, height: _.random(200, 350) }))])
					}
				}).finally(() => setCanLoadNext(true))
			}
		}
	}

	/** при появлении TOKEN для того чтобы сделать новый запрос проверяем если мы находимся на 1 странице то делаем запрос на получение данных, а если нет то просто сетим страницу 1 */
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
				<List
					setPage={setPage}
					list={localList} />
				{(localList?.length > 0 && canLoadNext && !isEnd) && (
					<LoadNext 
						canLoadNext={canLoadNext} 
						setPage={setPage} 
						page={page} 
						setPrevPage={setPrevPage}
						/>
				)}
			</ContentLayout>
		</div>
	)
}

export default HomePage;