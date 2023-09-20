import ContentLayout from "@/components/ContentLayout/ContentLayout";
import PageTitle from "@/components/PageTitle/PageTitle";
import Head from "next/head";
import Main from "@/pageModules/contacts/Main/Main";

const ContactsPage = () => {
  return (
    <ContentLayout>
      <Head>
        <title>Contacts - HandmadeP</title>
      </Head>
      <PageTitle
        title={'Contacts'}
        />
      <div>
        <Main/>
      </div>
      
    </ContentLayout>
  )
}

export default ContactsPage;