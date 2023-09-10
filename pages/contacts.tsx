import ContentLayout from "@/components/ContentLayout/ContentLayout";
import PageTitle from "@/components/PageTitle/PageTitle";

const ContactsPage = () => {
  return (
    <ContentLayout>
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