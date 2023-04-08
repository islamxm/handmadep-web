import List from "@/components/List/List";
import prodsMock from "@/mock/prodsMock";
import ContentLayout from "@/components/ContentLayout/ContentLayout";
import ApiService from "@/service/apiService";
import {useEffect} from 'react';

const service = new ApiService()



export const getServerSideProps = async () => {
    const res = await service.getCardsList(10)
    const data = await res?.results

    return {
        props: {list: data}
    }
}


const HomePage = ({list}: {list: any[]}) => {


  return (
    <ContentLayout>
      <List list={list}/>
    </ContentLayout>
  )
}

export default HomePage;