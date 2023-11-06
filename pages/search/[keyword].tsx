import ContentLayout from "@/components/ContentLayout/ContentLayout";
import { useRouter } from "next/router";
import List from "@/components/List/List";
import { useEffect, useState } from "react";
import ApiService from "@/service/apiService";
import PageTitle from "@/components/PageTitle/PageTitle";
import { useAppSelector } from "@/hooks/useTypesRedux";
import * as _ from 'lodash';
import { GetServerSideProps } from 'next'
import Head from "next/head";
import { LoadNext } from "@/components/loadMoreCtrl/loadMoreCtrl";
import apiSlice from "@/store/slices/apiSlice";
import IndexList from "@/components/IndexList/IndexList";
import Script from "next/script";

const service = new ApiService()

export const getServerSideProps:GetServerSideProps<any> = async (context) => {
    const keyword = context?.params?.keyword

    const res = await service.search(keyword, 1)
    const list = await res?.results?.map((i: any) => ({ ...i, height: _.random(200, 350) }))
    
    return {
        props: {
          list,
          keyword
        }
    }
  }

const KeywordPage = ({list, keyword}: {list: any[], keyword: string}) => {
    const [search] = apiSlice.endpoints.search.useLazyQuery()
    const {token: {access}} = useAppSelector(s => s.main)
    const {query} = useRouter()
    const [lastId, setLastId] = useState(0)
    const [localList, setLocalList] = useState<any[]>([]) 
    const [canLoadNext, setCanLoadNext] = useState(true)
    const [isEnd, setIsEnd] = useState(false)

    useEffect(() => {
		setLocalList(list)
	}, [list])

    const getData = (initId?: number) => {
		setCanLoadNext(false)
		if(access) {
			search({last_id: initId || lastId, token: access, query_string: keyword}).then(res => {
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
			search({last_id: lastId, query_string: keyword}).then(res => {
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
        <div>
            <ContentLayout>
                <Head>
                    <title>{`'${keyword}' - Search - HandMadeP.com`}</title>
                    <meta name="description" content={`HandMadeP.com ${keyword} Search. See more ideas about ${keyword}`}></meta>
                    <meta name="og:description" content={`HandMadeP.com ${keyword} Search. See more ideas about ${keyword}`}></meta>
                    <meta property="og:title" content={`'${keyword}' - Search - HandMadeP.com`}></meta>
                    <meta property="og:url" content={`https://handmadep.com/search/${keyword?.toLowerCase()}`}></meta>
                    <link rel="canonical" href={`https://handmadep.com/search/${keyword?.toLowerCase()}`} />
                    <meta name="keywords" content={keyword}/>
                    <meta property="og:type" content="website"/>
                    <script async={true} id="google-adsense" src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5137005946192410"/>
                </Head>
                <PageTitle
                    title={query?.keyword}
                    />
                <IndexList list={list}/>
                <List
                    list={localList}
                    />
                {(localList?.length > 0 && canLoadNext && !isEnd) && (
                    <LoadNext 
                        canLoadNext={canLoadNext} 
                        getMore={getData}
                        />
                )}
            </ContentLayout>
        </div>
    )
}


export default KeywordPage;