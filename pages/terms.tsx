import ContentLayout from "@/components/ContentLayout/ContentLayout";
import PageTitle from "@/components/PageTitle/PageTitle";
import Main from "@/pageModules/terms/Main/Main";
const TermsPage = () => {
  return (
    <ContentLayout>
      <PageTitle
        title={'HandMadeP.com Terms of Use'}
        />
        <Main/>
    </ContentLayout>
  )
}

export default TermsPage;