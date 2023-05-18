import ContentLayout from "@/components/ContentLayout/ContentLayout";
import List from "@/components/List/List";
import PageTitle from "@/components/PageTitle/PageTitle";
import {useRef, useState, useEffect, useCallback} from 'react';
import { PulseLoader } from "react-spinners";
import ApiService from "@/service/apiService";
import { useAppSelector } from "@/hooks/useTypesRedux";
import styles from '@/pageModules/home/home.module.scss';

const service = new ApiService()



const FavsPage = () => {
    const {token: {access}} = useAppSelector(s => s)
    const [scrollY, setScrollY] = useState(0)
    const [height, setHeight] = useState(0)
    const box = useRef<HTMLDivElement | null>(null)
    const [currentPage, setCurrentPage] = useState(1)
    const [canLoad, setCanLoad] = useState(true)
    const [localList, setLocalList] = useState<any[]>([])
    const [load, setLoad] = useState(true);
  
    const ref = useRef<HTMLDivElement | null>(null)

    // ** пополнение локального списка и определение высоты контейнера
  useEffect(() => {
    if(localList) {
      if(box?.current) {
        setHeight(box?.current?.scrollHeight)
      }
    }
  }, [localList, box])


  // ** перехват последнего элемента списка для догрузки
  useEffect(() => {
      if(!ref.current) return;

      const observer = new IntersectionObserver(([entry]) => {
          if(entry?.isIntersecting) {
              setCurrentPage(s => s + 1)
              observer?.unobserve(entry?.target)
          }
      })

      observer.observe(ref.current)
  }, [localList])



  // ** обновление списка
  const updateList = useCallback(() => {
    if(currentPage && access) {
      service.getCardsList(currentPage, access).then(res => {
        if(res?.results?.length > 0) {
          setLocalList(s => [...s, ...res?.results])
        }
        if(res?.results?.length < 20) {
          setLoad(false)
        }
      })
    }
  }, [currentPage, access])


  // ** обновление списка
  useEffect(() => {
    updateList()
  }, [currentPage])

    return (
        <div ref={box} className={styles.wrapper}>
            <ContentLayout>
                <PageTitle
                    title={'Favorite'}
                    />
                <List setCurrentPage={setCurrentPage} list={localList}/>
                <div ref={ref} className={styles.load}>
                    <PulseLoader color="var(--text)"/>
                </div>
            </ContentLayout>
        </div>
    )
}


export default FavsPage;