import ContentLayout from "@/components/ContentLayout/ContentLayout";
import PageTitle from "@/components/PageTitle/PageTitle";
import Head from "next/head";


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
        <p>
          If you have questions or suggestions on how to improve the Handmadep experience, or if you&apos;ve discovered an error or bug on the website, please let us know through our contact from below.
        </p>
      </div>
    </ContentLayout>
  )
}

export default ContactsPage;