import ContentLayout from "@/components/ContentLayout/ContentLayout"
import { useRouter } from "next/router"
import PageTitle from "@/components/PageTitle/PageTitle"
import Main from "@/pageModules/catalog/components/Main/Main"
import {Row, Col} from 'antd';
import { useEffect } from "react";
import { IProduct } from "@/models/IProduct";
import { GetServerSideProps } from "next";
import ApiService from "@/service/apiService";

const service = new ApiService()

// export const getServerSideProps:GetServerSideProps<{data: IProduct}> = async (context) => {
//     const id = context?.params?.id
//     const data = 
    
//     return {
//         props: {
//             data
//         }
//     }
// }

const ProductPage = () => {
    const {query} = useRouter()



    return (
        <ContentLayout>
            <h1>Keywords</h1>
            {/* <Main/> */}
        </ContentLayout>
    )
}


export default ProductPage;