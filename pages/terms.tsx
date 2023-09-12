import ContentLayout from "@/components/ContentLayout/ContentLayout";
import PageTitle from "@/components/PageTitle/PageTitle";
import Main from "@/pageModules/terms/Main/Main";
import Head from "next/head";

const TermsPage = () => {
  return (
    <ContentLayout>
      <Head>
        <title>Terms of Service - HandmadeP</title>
      </Head>
      <PageTitle
        title={'HandMadeP.com Terms of Use'}
        />
        <Main/>
    </ContentLayout>
  )
}

export default TermsPage;