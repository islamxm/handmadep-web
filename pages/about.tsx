import ContentLayout from "@/components/ContentLayout/ContentLayout";
import PageTitle from "@/components/PageTitle/PageTitle";
import Head from "next/head";
import Main from "@/pageModules/about/Main/Main";

const AboutPage = () => {
  return (
    <ContentLayout>
      <Head>
        <title>About - HandmadeP</title>
      </Head>
      <PageTitle
        title={'About'}
        />
      <Main/>
    </ContentLayout>
  )
}

export default AboutPage;