import ContentLayout from "@/components/ContentLayout/ContentLayout"
import PageTitle from "@/components/PageTitle/PageTitle"
import Main from "@/pageModules/cookie/Main/Main"
import Head from "next/head"

const CookiePage = () => {

  return (
    <ContentLayout>
      <Head>
        <title>Cookie Policy</title>
      </Head>
      <PageTitle
        title={'Cookie Policy'}
        />
      <Main/>      
    </ContentLayout>
  )
}

export default CookiePage;