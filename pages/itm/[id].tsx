import ContentLayout from "@/components/ContentLayout/ContentLayout"
import Main from "@/pageModules/catalog/components/Main/Main"
import {Row, Col} from 'antd';
import PageTitle from "@/components/PageTitle/PageTitle";
import List from "@/components/List/List";
// import prodsMock from "@/mock/prodsMock";
import ApiService from "@/service/apiService";
import { GetServerSideProps } from 'next'
import { useEffect } from "react";
import { IProduct } from "@/models/IProduct";
import { useAppSelector } from "@/hooks/useTypesRedux";
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
    const {token} = useAppSelector(s => s)
    

    const updateData = () => {
        if(token) {
            // 
        }
    }

    useEffect(() => console.log(data), [data])

    return (
        <ContentLayout>
            <Row gutter={[40,40]}>
                <Col span={24}>
                    <Main {...data}/>
                </Col>
                {/* <Col span={24}>
                    <PageTitle title={'Related products'}/>
                    <List list={prodsMock}/>
                </Col> */}
            </Row>
        </ContentLayout>
    )
}


export default ProductPage;