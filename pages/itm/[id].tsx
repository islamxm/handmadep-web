import ContentLayout from "@/components/ContentLayout/ContentLayout"
import Main from "@/pageModules/catalog/components/Main/Main"
import {Row, Col} from 'antd';
import PageTitle from "@/components/PageTitle/PageTitle";
import List from "@/components/List/List";
// import prodsMock from "@/mock/prodsMock";


const ProductPage = () => {

    return (
        <ContentLayout>
            <Row gutter={[40,40]}>
                <Col span={24}>
                    <Main/>
                </Col>
                <Col span={24}>
                    <PageTitle title={'Related products'}/>
                    {/* <List list={prodsMock}/> */}
                </Col>
            </Row>
        </ContentLayout>
    )
}


export default ProductPage;