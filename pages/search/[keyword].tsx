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

const service = new ApiService()

export const getServerSideProps:GetServerSideProps<any> = async (context) => {
    const keyword = context?.params?.keyword

    const res = await service.search(keyword, 1)
    const list = await res?.results
    
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
    const [page, setPage] = useState(1)
    const [prevPage, setPrevPage] = useState(0)
    const [localList, setLocalList] = useState<any[]>([]) 
    const [canLoadNext, setCanLoadNext] = useState(true)
    const [isEnd, setIsEnd] = useState(false)

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
				console.log('UPDATE LIST')
				search({query_string: keyword, page}).then(res => {
                    if(res?.data?.results?.length === 0) setIsEnd(false)
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
				}).finally(() => setCanLoadNext(true))
			} else {
				
				search({query_string: keyword, page}).then(res => {
                    if(res?.data?.results?.length === 0) setIsEnd(false)
					if (page === 1) {
						setLocalList(res?.data?.results?.map((i: any) => ({ ...i, height: _.random(200, 350) })))
					} else {
						setLocalList(s => [...s, ...res?.data?.results?.map((i: any) => ({ ...i, height: _.random(200, 350) }))])
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
        <div>
            <ContentLayout>
                <Head>
                    <title>{`'${keyword}' - Search - HandMadeP.com`}</title>
                    <meta name="description" content={`HandMadeP.com ${keyword} Search. See more ideas about ${keyword}`}></meta>
                    <meta name="og:description" content={`HandMadeP.com ${keyword} Search. See more ideas about ${keyword}`}></meta>
                    <meta property="og:title" content={`'${keyword}' - Search - HandMadeP.com`}></meta>
                    <meta property="og:url" content={`https://handmadep.netlify.app/search/${keyword}`}></meta>
                    <link rel="canonical" href={`https://handmadep.netlify.app/search/${keyword}`} />
                    <meta name="keywords" content={keyword}/>
                    <meta property="og:type" content="website"/>
                </Head>
                <PageTitle
                    title={query?.keyword}
                    />
                <List
                    list={localList}
                    setPage={setPage}
                    />
                {(localList?.length > 0 && canLoadNext && !isEnd) && (
                    <LoadNext 
                        canLoadNext={canLoadNext} 
                        setPage={setPage} 
                        setPrevPage={setPrevPage}
                        page={page} 
                        />
                )}
            </ContentLayout>
        </div>
    )
}


export default KeywordPage;