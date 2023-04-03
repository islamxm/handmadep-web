import ContentLayout from "@/components/ContentLayout/ContentLayout"
import { useRouter } from "next/router"
import PageTitle from "@/components/PageTitle/PageTitle"
import Main from "@/pageModules/catalog/components/Main/Main"
import {Row, Col} from 'antd';

const ProductPage = () => {

    return (
        <ContentLayout>
            <Main/>
        </ContentLayout>
    )
}


export default ProductPage;