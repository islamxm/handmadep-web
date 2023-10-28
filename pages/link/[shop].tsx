import ContentLayout from "@/components/ContentLayout/ContentLayout";
import PageTitle from "@/components/PageTitle/PageTitle";
import Main from "@/pageModules/link/Main/Main";
import Head from "next/head";
import Script from "next/script";

const RedirectPage = () => {

  return (
    <ContentLayout>
      <Head>
      <script async={true} id="google-adsense" src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5137005946192410"/>
      </Head>
      <Main/>      
    </ContentLayout>
  )
}

export default RedirectPage;