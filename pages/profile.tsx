import ContentLayout from "@/components/ContentLayout/ContentLayout";
import { Row, Col } from "antd";
import ProfileCard from "@/pageModules/profile/components/ProfileCard/ProfileCard";
import ProfileEdit from "@/pageModules/profile/components/ProfileEdit/ProfileEdit";


const ProfilePage = () => {

    return (
        <ContentLayout>
            <Row gutter={[20,20]}>
                <Col
                    span={24}
                    lg={8}
                    >
                    <ProfileCard/>
                </Col>
                <Col
                    span={24}
                    lg={16}    
                    >
                    <ProfileEdit/>
                </Col>
            </Row>
        </ContentLayout>
    )
}


export default ProfilePage;