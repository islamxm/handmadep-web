import ContentLayout from "@/components/ContentLayout/ContentLayout";
import { useRouter } from "next/router";
import List from "@/components/List/List";
import { useEffect, useState } from "react";
import ApiService from "@/service/apiService";
import PageTitle from "@/components/PageTitle/PageTitle";
import { useAppSelector } from "@/hooks/useTypesRedux";
import * as _ from 'lodash';

const service = new ApiService()

const KeywordPage = () => {
    const {token} = useAppSelector(s => s)
    const {query} = useRouter()
    const [list, setList] = useState<any[]>([])


    useEffect(() => {
        if(query?.keyword && typeof query?.keyword === 'string') {
            service.search(query?.keyword).then(res => {
                setList(res?.map((i: any) => ({...i, height: _.random(150,350)})))
            })
        } else {
            setList([])
        }
    }, [query])



    return (
        <div>
            <ContentLayout>
                <PageTitle
                    title={query?.keyword}
                    />

                <List
                    list={list}
                    setCurrentPage={() => {}}
                    />
            </ContentLayout>
        </div>
    )
}


export default KeywordPage;