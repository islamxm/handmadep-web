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
import { useGetSimilarProdsQuery } from "@/store/slices/apiSlice";

const service = new ApiService()




export const getServerSideProps:GetServerSideProps<{productData: IProduct}> = async (context) => {
    const id = context?.params?.id
    const productData = await service.getProduct(id)
    
    return {
        props: {
            productData
        }
    }
}


const ProductPage = ({productData}: {productData: IProduct}) => {
    const {token: {access}} = useAppSelector(s => s.main)
    const {query} = useRouter()
    const [localData, setLocalData] = useState<any>()

    
    const [list, setList] = useState<any[]>([])
    const [page, setPage] = useState(1)
    const [total, setTotal] = useState(0)
    const [canLoadNext, setCanLoadNext] = useState(true)

    const {data} = useGetSimilarProdsQuery({page: page, card_pk: query.id}) 

    useEffect(() => {
        if(data && page) {
            if(page === 1) {
                setList(data?.results?.map((i:any) => ({...i, height: _.random(150,350)})))
            } else {
                setList(s => [...s, ...data?.results?.map((i:any) => ({...i, height: _.random(150,350)}))])
            }
        }
    }, [data,page])

    // useEffect(() => {
    //     if(access && query && query?.id && typeof query?.id === 'string') {
    //         service.getProduct(query?.id, access).then(res => {
    //             if(res?.id) setLocalData(res)
    //         })
    //     }
    //     if(query && query?.id && typeof query?.id === 'string') {
    //         service.getProduct(query?.id).then(res => {
                
    //         })
    //     }
    //     if(query && query?.id && typeof query?.id === 'string' && page) {
    //         service.getSimilarProducts({
    //             page: page, 
    //             card_pk: query?.id
    //         }).then(res => {
    //             if(page === 1) {
    //                 setList(res?.results?.map((i:any) => ({...i, height: _.random(150,350)})))    
    //             } else setList(s => [...s, ...res?.results?.map((i:any) => ({...i, height: _.random(150,350)}))])
    //         })
    //     }
    // }, [query, access, page])

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
                        list={list}
                        setPage={setPage}
                        />
                    {(list?.length > 0 && canLoadNext) && <LoadNext setPage={setPage} page={page}/>}
                </Col>
            </Row>
        </ContentLayout>
    )
}


export default ProductPage;