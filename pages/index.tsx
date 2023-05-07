import List from "@/components/List/List";
// import prodsMock from "@/mock/prodsMock";
import ContentLayout from "@/components/ContentLayout/ContentLayout";
import ApiService from "@/service/apiService";
import {useEffect, useState, useRef, useCallback} from 'react';
import { useScroll } from '@react-hooks-library/core'
import styles from '@/pageModules/home/home.module.scss';
import { PulseLoader } from "react-spinners";
import { IProduct } from "@/models/IProduct";
import * as _ from 'lodash';
import { useAppSelector } from "@/hooks/useTypesRedux";
const service = new ApiService()



export const getServerSideProps = async () => {
    
    const res = await service.getCardsList(1)
    const data = await res?.results

    return {
        props: {
          list: data
        }
    }
}


const HomePage = ({list}: {list: any[]}) => { 
  const {token: {access}} = useAppSelector(s => s)
  const [scrollY, setScrollY] = useState(0)
  const [height, setHeight] = useState(0)
  const box = useRef<HTMLDivElement | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [canLoad, setCanLoad] = useState(true)
  const [localList, setLocalList] = useState<any[]>([])
  const [load, setLoad] = useState(true);

  const ref = useRef<HTMLDivElement | null>(null)
  
  useEffect(() => {
    if(access) {
      setCurrentPage(1)
      service.getCardsList(1, access).then(res => {
        setLocalList(res?.results)
      })
    }
  }, [access])


  // ** пополнение локального списка и определение высоты контейнера
  useEffect(() => {
    if(list) {
      setLocalList(list)

      if(box?.current) {
        setHeight(box?.current?.scrollHeight)
      }
    }
  }, [list, box])

  useEffect(() => {
    if(localList) {
      if(box?.current) {
        setHeight(box?.current?.scrollHeight)
      }
    }
  }, [box, localList])

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
    if(currentPage > 1) {
      if(access) {
        service.getCardsList(currentPage, access).then(res => {
          if(res?.results?.length > 0) {
            setLocalList(s => [...s, ...res?.results])
          }
          if(res?.results?.length < 20) {
            setLoad(false)
          }
        })
      } else {
        service.getCardsList(currentPage).then(res => {
          if(res?.results?.length > 0) {
            setLocalList(s => [...s, ...res?.results])
          }
          if(res?.results?.length < 20) {
            setLoad(false)
          }
        })
      }
      
    }
    
  }, [currentPage, access])


  // ** обновление списка
  useEffect(() => {
    updateList()
  }, [currentPage])



  return (
    <div ref={box} className={styles.wrapper}>
      <ContentLayout>
        <List setCurrentPage={setCurrentPage} list={localList}/>
        <div ref={ref} className={styles.load}>
            <PulseLoader color="var(--text)"/>
          </div>
      </ContentLayout>
    </div>
    
  )
}

export default HomePage;