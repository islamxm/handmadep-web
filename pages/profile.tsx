import ContentLayout from "@/components/ContentLayout/ContentLayout";
import { Row, Col } from "antd";
import ProfileCard from "@/pageModules/profile/components/ProfileCard/ProfileCard";
import ProfileEdit from "@/pageModules/profile/components/ProfileEdit/ProfileEdit";
import { useAppSelector } from "@/hooks/useTypesRedux";
import { useGetUserDataQuery } from "@/store/slices/apiSlice";

const ProfilePage = () => {
	const { token: { access }, userData } = useAppSelector(s => s.main)
	// const userDataRes = useGetUserDataQuery(access)

	return (
		<ContentLayout>
			<Row gutter={[20, 20]}>
				<Col
					span={24}
					lg={8}
				>
					<ProfileCard {...userData} />
				</Col>
				<Col
					span={24}
					lg={16}
				>
					<ProfileEdit
						{...userData}
					/>
				</Col>
			</Row>
		</ContentLayout>
	)
}


export default ProfilePage;