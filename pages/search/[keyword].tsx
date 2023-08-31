import ContentLayout from "@/components/ContentLayout/ContentLayout";
import { useRouter } from "next/router";
import List from "@/components/List/List";
import { useEffect, useState, useCallback, useRef } from "react";
import ApiService from "@/service/apiService";
import PageTitle from "@/components/PageTitle/PageTitle";
import { useAppSelector } from "@/hooks/useTypesRedux";
import * as _ from 'lodash';
import { GetServerSideProps } from 'next'
import { IProduct } from "@/models/IProduct";

const service = new ApiService()

// export const getServerSideProps:GetServerSideProps<any> = async (context) => {
//     const keyword = context?.params?.keyword

//     const res = await service.search(keyword, 1)
//     const list = await res
    
//     return {
//         props: {
//           list
//         }
//     }
//   }

const KeywordPage = ({list}: {list: any[]}) => {
    const {token: {access}} = useAppSelector(s => s.main)
    const {query} = useRouter()
    const [page, setPage] = useState(1)




    return (
        <div>
            <ContentLayout>
                <PageTitle
                    // title={query?.keyword}
                    title={'Keyword'}
                    />
                {/* <List
                    list={list}
                    setPage={setPage}
                    /> */}
            </ContentLayout>
        </div>
    )
}


export default KeywordPage;