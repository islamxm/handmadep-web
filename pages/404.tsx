import ContentLayout from "@/components/ContentLayout/ContentLayout"
import PageTitle from "@/components/PageTitle/PageTitle"
import Head from "next/head";

const NotfoundPage = () => {
  return (
    <ContentLayout>
      <Head>
        <title>Not Found - HandmadeP</title>
      </Head>
      <PageTitle
        title={'404, not found :('}
        />
    </ContentLayout>
  )
}

export default NotfoundPage;