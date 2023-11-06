import List from "@/components/List/List";
import ContentLayout from "@/components/ContentLayout/ContentLayout";
import ApiService from "@/service/apiService";
import { useEffect, useState } from 'react';
import styles from '@/pageModules/home/home.module.scss';
import * as _ from 'lodash';
import { useAppDispatch, useAppSelector } from "@/hooks/useTypesRedux";
import { GetServerSideProps } from "next";
import { LoadNext } from "@/components/loadMoreCtrl/loadMoreCtrl";
import Head from "next/head";
import logo from '@/public/logo.png';
import IndexList from "@/components/IndexList/IndexList";
import Script from "next/script";
import store from "@/store/store";
import apiSlice, { getRunningQueriesThunk, useGetCardsQuery } from "@/store/slices/apiSlice";

const service = new ApiService()

export const getServerSideProps =  store.getServerSideProps(
	(store) => async () => {
		
		const res = await store.dispatch(apiSlice.endpoints.getCards.initiate({body: {last_id: 0}}))

		return {
			props: {
				// list: res?.data?.results?.map((i: any) => ({...i, height: _.random(200, 350)})),
				list: res
			}
		}
	}
)


const HomePage = ({ list, error }: { list: any[], error: any}) => {
	const [getCards] = apiSlice.endpoints.getCards.useLazyQuery()
	const { token: { access } } = useAppSelector(s => s.main)
	const [localList, setLocalList] = useState<any[]>([])
	const [lastId, setLastId] = useState(0)
	const [isEnd, setIsEnd] = useState(false)

	const [canLoadNext, setCanLoadNext] = useState(true)

	useEffect(() => {
		console.log(list)
		// if(list?.length) {
		// 	setLocalList(list)
		// }
		// if(list?.length > 0) {
		// 	setLastId(Number(list[list.length - 1]?.id))
		// } 
		getData(0)
		
	}, [list])

	const getData = (initId?: number) => {
		setCanLoadNext(false)
		if(access) {
			getCards({token: access, body: {last_id: initId || lastId}}).then(res => {
				const {data, isLoading, isSuccess} = res
				if(data && !isLoading && isSuccess) {
					if(lastId === 0) {
						setLocalList(data?.results?.map((i:any) => ({...i, height: _.random(200,350)})))
					} else {
						setLocalList(s => [...s, ...data?.results?.map((i:any) => ({...i, height: _.random(200,350)}))])	
					}
					if(data?.results?.length > 0) {
						setLastId(Number(data.results[data.results.length - 1]?.id))
					} else {
						setIsEnd(true)
					}
				} 
			})
		} else {
			getCards({body: {last_id: lastId}}).then(res => {
				console.log(res)
				const {data, isLoading, isSuccess} = res
				if(data && !isLoading && isSuccess) {
					
					setLocalList(s => [...s, ...data?.results?.map((i:any) => ({...i, height: _.random(200,350)}))])
					if(data?.results?.length > 0) {
						setLastId(Number(data.results[data.results.length - 1]?.id))
					} else {
						setIsEnd(true)
					}
				}
			}).finally(() => {
				setCanLoadNext(true)
			})
		}
	}

	useEffect(() => {
		if(access) {
			setLastId(0)
			getData(0)
		}
	}, [access])

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
				<script async={true} id="google-adsense" src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5137005946192410"/>
			</Head>
			<ContentLayout>
				<IndexList list={[]}/>
				<List
					list={localList}/>
				{(localList?.length > 0 && canLoadNext && !isEnd) && (
					<LoadNext 
						canLoadNext={canLoadNext} 
						getMore={getData}
						isEnd={isEnd}
						/>
				)}
			</ContentLayout>
		</div>
	)
}

export default HomePage;