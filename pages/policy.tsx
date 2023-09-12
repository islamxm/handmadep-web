import ContentLayout from "@/components/ContentLayout/ContentLayout";
import PageTitle from "@/components/PageTitle/PageTitle";
import Main from "@/pageModules/policy/Main/Main";
import Head from "next/head";

const PolicyPage = () => {
  return (
    <ContentLayout>
      <Head>
        <title>Privacy Policy - HandmadeP</title>
      </Head>
      <PageTitle
        title={'Privacy Policy for HandMadeP.com'}
        />
        <Main/>
    </ContentLayout>
  )
}

export default PolicyPage;