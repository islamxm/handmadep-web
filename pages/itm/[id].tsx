import ContentLayout from "@/components/ContentLayout/ContentLayout"
import Main from "@/pageModules/catalog/components/Main/Main"
import {Row, Col} from 'antd';
import PageTitle from "@/components/PageTitle/PageTitle";
import List from "@/components/List/List";
// import prodsMock from "@/mock/prodsMock";
import ApiService from "@/service/apiService";
import { GetServerSideProps } from 'next'
import { useEffect, useRef, useState } from "react";

import { IProduct } from "@/models/IProduct";
import { useAppSelector } from "@/hooks/useTypesRedux";
import { useRouter } from "next/router";
import * as _ from 'lodash'
import Head from "next/head";
import { LoadNext } from "@/components/loadMoreCtrl/loadMoreCtrl";
import apiSlice, { useGetSimilarProdsQuery } from "@/store/slices/apiSlice";

const service = new ApiService()




export const getServerSideProps:GetServerSideProps<{productData: IProduct}> = async (context) => {
    const id = context?.params?.id
    const productData = await service.getProduct(id)
    
    return {
        props: {
            productData,
            productId: id
        }
    }
}


const ProductPage = ({productData, productId}: {productData: IProduct, productId: any}) => {
    const {token: {access}} = useAppSelector(s => s.main)
    const [localData, setLocalData] = useState<any>()
    const [getSmList] = apiSlice.endpoints.getSimilarProds.useLazyQuery()

    const [localList, setLocalList] = useState<any[]>([])
    const [page, setPage] = useState(1)
    const [canLoadNext, setCanLoadNext] = useState(true)
    const [isEnd, setIsEnd] = useState(false)
    const [prevPage, setPrevPage] = useState(0)


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


    const getData = (
		page: any, 
		type: 'init' | 'update', 
		dir?: 'prev' | 'next') => {
		if (page) {
			setCanLoadNext(false)
			if (access) {
				getSmList({
                    page,
                    card_pk: productId,
                    token: access
                }).then(res => {
                    if(res?.data?.results?.length === 0) setIsEnd(true)
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
				getSmList({
                    page,
                    card_pk: productId
                }).then(res => {
					if(res?.data?.results?.length === 0) setIsEnd(true)
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
        if(productData) setLocalData(productData)
    }, [productData])

    return (    
        <ContentLayout>
            <Head>
                <title>{productData?.title}</title>
                <meta name="description" content={productData?.description ? `${productData?.description?.slice(0, 200)}...` : productData?.title}></meta>
                <meta property="og:description" content={productData?.description ? `${productData?.description?.slice(0, 200)}...` : productData?.title}></meta>
                <meta property="og:title" content={productData?.title}></meta>
                <meta property="og:url" content={`https://handmadep.netlify.app/itm/${productData?.id}`}></meta>
                <link rel="canonical" href={`https://handmadep.netlify.app/itm/${productData?.id}`} />
                <meta name="keywords" content={productData?.tags?.map((i:any) => i?.keyword)?.join(',')}/>
                <meta property="og:type" content="product"/>
                <meta property="og:image" content={productData?.cover_url}/>
                <meta property="og:image:alt" content={productData?.title}/>
                <meta name="author" content={productData.shop?.name}></meta>
            </Head>
            <Row gutter={[40,40]}>
                <Col span={24}>
                    <Main {...localData}/>
                </Col>
                <Col span={24}>
                    <PageTitle title={'Similar products'}/>
                    <List
                        list={localList}
                        setPage={setPage}
                        />
                    {(localList?.length > 0 && canLoadNext && !isEnd) && (
                        <LoadNext 
                            canLoadNext={canLoadNext} 
                            setPage={setPage} 
                            page={page}
                            setPrevPage={setPrevPage}
                            />
                    )}
                </Col>
            </Row>
        </ContentLayout>
    )
}


export default ProductPage;