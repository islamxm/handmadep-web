import ContentLayout from "@/components/ContentLayout/ContentLayout"
import Main from "@/pageModules/catalog/components/Main/Main"
import {Row, Col} from 'antd';
import PageTitle from "@/components/PageTitle/PageTitle";
import List from "@/components/List/List";
import ApiService from "@/service/apiService";
import { GetServerSideProps } from 'next'
import { useEffect, useState } from "react";
import { IProduct } from "@/models/IProduct";
import { useAppSelector } from "@/hooks/useTypesRedux";
import * as _ from 'lodash'
import Head from "next/head";
import { LoadNext } from "@/components/loadMoreCtrl/loadMoreCtrl";
import apiSlice from "@/store/slices/apiSlice";
import IndexList from "@/components/IndexList/IndexList";
import store from "@/store/store";

const service = new ApiService()

export const getServerSideProps =  store.getServerSideProps(
	(store) => async (context) => {
		const id = context?.params?.id
        const product = await store.dispatch(apiSlice.endpoints.getProduct.initiate({id: typeof id === 'string' ? id : ''}))
        const similarList = await store.dispatch(apiSlice.endpoints.getSimilarProds.initiate({last_id: 0, card_pk: id}))

        if(product?.isError) {
            return {
                notFound: true
            }
        }

		return {
			props: {
				list: similarList?.data?.results?.map((i: any) => ({...i, height: _.random(200, 350)})),
                productData: product?.data,
                productId: id,
			}
		}
	}
)


const ProductPage = ({productData, productId, list}: {productData: IProduct, productId: any, list: any[]}) => {
    const {token: {access}} = useAppSelector(s => s.main)
    const [localData, setLocalData] = useState<any>()
    const [getSmList] = apiSlice.endpoints.getSimilarProds.useLazyQuery()
    const [getProduct] = apiSlice.endpoints.getProduct.useLazyQuery()

    const [localList, setLocalList] = useState<any[]>([])
    const [canLoadNext, setCanLoadNext] = useState(true)
    const [isEnd, setIsEnd] = useState(false)
    const [lastId, setLastId] = useState(0)
    

    useEffect(() => {
		setLocalList(list)
		if(list?.length > 0) {
			setLastId(Number(list[list.length - 1]?.id))
		}
	}, [list])

    const getData = (initId?: number) => {
        setCanLoadNext(false)
		if(access) {
			getSmList({last_id: initId || lastId, card_pk: productId}).then((res:any) => {
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
			getSmList({last_id: lastId, card_pk: productId}).then(res => {
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
    

    useEffect(() => {
        if(productId && access) {
            getProduct({token: access, id: productId}).then(({
                data, 
                isSuccess
            }) => {
                if(data && isSuccess) {
                    setLocalData(data)
                }
            })
        }
    }, [access, productId])


    useEffect(() => {
        if(productData) setLocalData(productData)
    }, [productData])

    return (    
        <ContentLayout>
            <Head>
                <title>{productData?.title}</title>
                <meta name="description" content={productData?.description ? `${productData?.description?.slice(0, 200)}...` : productData?.title}></meta>
                <meta property="og:description" content={productData?.description ? `${productData?.description?.slice(0, 200)}...` : productData?.title}></meta>
                <meta property="og:title" content={productData?.title}></meta>
                <meta property="og:url" content={`https://handmadep.com/itm/${productData?.id}`}></meta>
                <link rel="canonical" href={`https://handmadep.com/itm/${productData?.id}`} />
                <meta name="keywords" content={productData?.tags?.map((i:any) => i?.keyword)?.join(',')}/>
                <meta property="og:type" content="product"/>
                <meta property="og:image" content={productData?.cover_url}/>
                <meta property="og:image:alt" content={productData?.title}/>
                <meta name="author" content={productData.shop?.name}></meta>
                <script async={true} id="google-adsense" src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5137005946192410"/>
            </Head>
            <Row gutter={[40,40]}>
                <Col span={24}>
                    <Main  {...localData} ssrData={productData}/>
                </Col>
                <Col span={24}>
                    <PageTitle isTitle={false} title={'Similar products'}/>
                    <IndexList list={list}/>
                    <List
                        list={localList}
                        />
                    {(localList?.length > 0 && canLoadNext && !isEnd) && (
                        <LoadNext 
                            canLoadNext={canLoadNext} 
                            isEnd={isEnd}
                            getMore={getData}
                            />
                    )}
                </Col>
            </Row>
        </ContentLayout>
    )
}


export default ProductPage;