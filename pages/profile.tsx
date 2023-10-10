import ContentLayout from "@/components/ContentLayout/ContentLayout";
import { Row, Col } from "antd";
import ProfileCard from "@/pageModules/profile/components/ProfileCard/ProfileCard";
import ProfileEdit from "@/pageModules/profile/components/ProfileEdit/ProfileEdit";
import { useAppSelector } from "@/hooks/useTypesRedux";
import PrivateRoute from "@/hoc/PrivateRoute";
import ProfileFooter from "@/pageModules/profile/components/ProfileFooter/ProfileFooter";

const ProfilePage = () => {
	const { token: { access }, userData } = useAppSelector(s => s.main)

	return (
		<PrivateRoute>
			<ContentLayout>
				<Row gutter={[20, 20]}>
					<Col
						span={24}
						lg={8}
					>
						<ProfileCard {...userData}/>
					</Col>
					<Col
						span={24}
						lg={16}
					>
						<ProfileEdit
							{...userData}
						/>
						<ProfileFooter/>
					</Col>
				</Row>
			</ContentLayout>
		</PrivateRoute>
		
	)
}


export default ProfilePage;