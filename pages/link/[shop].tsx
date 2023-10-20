import ContentLayout from "@/components/ContentLayout/ContentLayout";
import PageTitle from "@/components/PageTitle/PageTitle";
import Main from "@/pageModules/link/Main/Main";
import Script from "next/script";

const RedirectPage = () => {

  return (
    <ContentLayout>
      <Script  id='google-adsense' strategy={'afterInteractive'} async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5137005946192410"/>
      <Main/>      
    </ContentLayout>
  )
}

export default RedirectPage;