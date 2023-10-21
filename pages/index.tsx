import List from "@/components/List/List";
import ContentLayout from "@/components/ContentLayout/ContentLayout";
import ApiService from "@/service/apiService";
import { useEffect, useState } from 'react';
import styles from '@/pageModules/home/home.module.scss';
import * as _ from 'lodash';
import { useAppSelector } from "@/hooks/useTypesRedux";
import { GetServerSideProps } from "next";
import { LoadNext } from "@/components/loadMoreCtrl/loadMoreCtrl";
import Head from "next/head";
import logo from '@/public/logo.png';
import IndexList from "@/components/IndexList/IndexList";
import Script from "next/script";

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
			<Head>
				<title>Crafted with Care: Explore Unique Handmade Goods</title>
				<meta name="description" content="Explore a curated collection of exquisite handcrafted products that showcase the creativity and skill of artisans worldwide. From intricately designed jewelry to beautifully crafted home decor, our site offers a diverse range of unique items that add a touch of artistry to your life. Discover the charm of handmade goods and support artisans who pour their heart and soul into every creation."/>
				<meta property="og:title" content="Crafted with Care: Explore Unique Handmade Goods"/>
				<meta property="og:description" content="Explore a curated collection of exquisite handcrafted products that showcase the creativity and skill of artisans worldwide. From intricately designed jewelry to beautifully crafted home decor, our site offers a diverse range of unique items that add a touch of artistry to your life. Discover the charm of handmade goods and support artisans who pour their heart and soul into every creation."/>
				<link rel="canonical" href={`https://handmadep.com`}/>
				<meta property="og:image" content={'/logo.png'}/>
				<meta property="og:image:alt" content={'Crafted with Care: Explore Unique Handmade Goods'}/>
			</Head>
			<Script  id='google-adsense' strategy={'afterInteractive'} async={true} src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5137005946192410"/>
			<ContentLayout>
				<IndexList list={list}/>
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