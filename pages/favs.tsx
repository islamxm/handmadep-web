import ContentLayout from "@/components/ContentLayout/ContentLayout";
import List from "@/components/List/List";
import PageTitle from "@/components/PageTitle/PageTitle";
import {useRef, useState} from 'react';
import { useAppSelector } from "@/hooks/useTypesRedux";
import styles from '@/pageModules/home/home.module.scss';



const FavsPage = () => {
    const {token: {access}} = useAppSelector(s => s.main)
    
    const [localList, setLocalList] = useState<any[]>([])
    const [page, setPage] = useState(1)




    return (
        <div className={styles.wrapper}>
            <ContentLayout>
                <PageTitle
                    title={'Favorite'}
                    />
                {/* <List 
                  setPage={setPage}
                  list={localList}/> */}
            </ContentLayout>
        </div>
    )
}


export default FavsPage;