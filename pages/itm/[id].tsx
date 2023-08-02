import ContentLayout from "@/components/ContentLayout/ContentLayout"
import Main from "@/pageModules/catalog/components/Main/Main"
import {Row, Col} from 'antd';
import PageTitle from "@/components/PageTitle/PageTitle";
import List from "@/components/List/List";
// import prodsMock from "@/mock/prodsMock";
import ApiService from "@/service/apiService";
import { GetServerSideProps } from 'next'
import { useEffect, useState } from "react";

import { IProduct } from "@/models/IProduct";
import { useAppSelector } from "@/hooks/useTypesRedux";
import { useRouter } from "next/router";
import * as _ from 'lodash'
import Head from "next/head";
const service = new ApiService()




export const getServerSideProps:GetServerSideProps<{data: IProduct}> = async (context) => {
    const id = context?.params?.id
    const data = await service.getProduct(id)
    
    return {
        props: {
            data
        }
    }
}


const ProductPage = ({data}: {data: IProduct}) => {
    const {token: {access}} = useAppSelector(s => s)
    const {query, asPath} = useRouter()
    const [localData, setLocalData] = useState<any>()
    
    const [smList, setSmList] = useState<any[]>([])

    useEffect(() => {
        if(access && query && query?.id && typeof query?.id === 'string') {
            service.getProduct(query?.id, access).then(res => {
                if(res?.id) setLocalData(res)
                console.log('GET PRODUCT EFFECT')
            })
        }
        if(query && query?.id && typeof query?.id === 'string') {
            service.getProduct(query?.id).then(res => {
                console.log(res)
            })
        }
        if(query && query?.id && typeof query?.id === 'string') {
            service.getSimilarProducts(query?.id).then(res => {
                console.log(res)
                setSmList(s => [...s, ...res?.results?.map((i:any) => ({...i, height: _.random(150,350)}))])
            })
        }
    }, [query, access])


    useEffect(() => {
        if(data) setLocalData(data)
    }, [data])

    

    return (    

        <ContentLayout>
            <Head>
                <title>{localData?.title}</title>
                <meta name="description" content={localData?.description}></meta>
                <meta property="og:description" content={localData?.description}></meta>
                <meta property="og:title" content={localData?.description}></meta>
                <meta property="og:url" content={process?.browser && window ? window?.location?.href : ''}></meta>
                <link rel="canonical" href={process?.browser && window ? window?.location?.href : ''} />
                <meta name="keywords" content={localData?.tags?.map((i:any) => i?.keyword)?.join(',')}/>
                <meta property="og:type" content="product"/>
                <meta property="og:image" content={localData?.cover_url}/>
                <meta property="og:image:alt" content={localData?.title}/>
            </Head>
            <Row gutter={[40,40]}>
                <Col span={24}>
                    <Main {...localData}/>
                </Col>
                {/* <Col span={24}>
                    <PageTitle title={'Related products'}/>
                    <List list={prodsMock}/>
                </Col> */}
                <Col span={24}>
                    <PageTitle title={'Similar products'}/>
                    <List
                        list={smList}
                        setCurrentPage={() => {}}
                        />
                </Col>
            </Row>
        </ContentLayout>
    )
}


export default ProductPage;