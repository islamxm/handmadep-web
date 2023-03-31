import List from "@/components/List/List";
import prodsMock from "@/mock/prodsMock";
import ContentLayout from "@/components/ContentLayout/ContentLayout";

const HomePage = () => {

  return (
    <ContentLayout>
      <List list={prodsMock}/>
    </ContentLayout>
  )
}

export default HomePage;