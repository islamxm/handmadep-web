import ContentLayout from "@/components/ContentLayout/ContentLayout";
import { useRouter } from "next/router";
import { useEffect } from "react";
import PageTitle from "@/components/PageTitle/PageTitle";
import List from "@/components/List/List";
// import prodsMock from "@/mock/prodsMock";



const SearchPage = () => {
    const {query} = useRouter()

    return (
        <ContentLayout>
            <PageTitle
                title={query?.keyword}
                />
            {/* <List list={prodsMock}/> */}
        </ContentLayout>
    )
}


export default SearchPage;