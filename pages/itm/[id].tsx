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


const service = new ApiService()

export const getServerSideProps:GetServerSideProps<{productData: IProduct}> = async (context) => {
    const id = context?.params?.id
    const productData = await service.getProduct(id)
    const initList = await service.getSimilarProducts({page: 1, card_pk: productData?.id})
    
    return {
        props: {
            productData,
            productId: id,
            list: initList?.results?.map((i: any) => ({ ...i, height: _.random(200, 350) }))
        }
    }
}


const ProductPage = ({productData, productId, list}: {productData: IProduct, productId: any, list: any[]}) => {
    const {token: {access}} = useAppSelector(s => s.main)
    const [localData, setLocalData] = useState<any>()
    const [getSmList] = apiSlice.endpoints.getSimilarProds.useLazyQuery()

    const [localList, setLocalList] = useState<any[]>([])
    const [page, setPage] = useState(1)
    const [canLoadNext, setCanLoadNext] = useState(true)
    const [isEnd, setIsEnd] = useState(false)
    const [prevPage, setPrevPage] = useState(0)

    useEffect(() => setLocalList(list), [list])

    const getData = (
		page: any, 
		type: 'init' | 'update', 
		dir?: 'prev' | 'next') => {
        console.log('GET LIST')
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
                        if(res?.data?.results) {
                            setLocalList(s => [...s, ...res?.data?.results?.map((i: any) => ({ ...i, height: _.random(200, 350) }))])
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
        if(productId && access) {
            service.getProduct(productId, access).then(res => {
                if(res?.id) {
                    setLocalData(res)
                }
            })
        }
    }, [access, productId])

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
            </Head>
            <Row gutter={[40,40]}>
                <Col span={24}>
                    <Main  {...localData} ssrData={productData}/>
                </Col>
                <Col span={24}>
                    <PageTitle isTitle={false} title={'Similar products'}/>
                    <List
                        list={page > 1 ? localList : list}
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