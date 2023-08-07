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

export const getServerSideProps:GetServerSideProps<any> = async (context) => {
    const keyword = context?.params?.keyword

    const res = await service.search(keyword, 1)
    const list = await res
    
    return {
        props: {
          list
        }
    }
  }

const KeywordPage = ({list}: {list: any[]}) => {
    const {token: {access}} = useAppSelector(s => s)
    const {query} = useRouter()
    const [scrollY, setScrollY] = useState(0)
    const [height, setHeight] = useState(0)
    const box = useRef<HTMLDivElement | null>(null)
    const [currentPage, setCurrentPage] = useState(1)
    const [canLoad, setCanLoad] = useState(true)
    const [localList, setLocalList] = useState<any[]>([])
    const [load, setLoad] = useState(true);
    
    const ref = useRef<HTMLDivElement | null>(null)


    // useEffect(() => {
    //     if(query?.keyword && typeof query?.keyword === 'string') {
    //         service.search(query?.keyword, 1).then(res => {
    //             console.log(res)
    //         })
    //     } else {
            
    //     }
    // }, [query])


    

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
    if(query?.keyword) {
        if(access) {
            service.search(query?.keyword, currentPage).then(res => {
              if(res?.length > 0) {
                setLocalList(s => [...s, ...res?.map((i:any) => ({...i, height: _.random(150,350)}))])
              }
              if(res?.results?.length < 20) {
                setLoad(false)
              }
            })
          } else {
            service.search(query?.keyword, currentPage).then(res => {
                console.log(res)
              if(res?.length > 0) {
                setLocalList(s => [...s, ...res?.map((i:any) => ({...i, height: _.random(150,350)}))])
              }
              if(res?.length < 20) {
                setLoad(false)
              }
            })
          }
    }
      
    }
  }, [currentPage, access, query])


  // ** обновление списка
  useEffect(() => {
    updateList()
  }, [currentPage, query])

    return (
        <div>
            <ContentLayout>
                <PageTitle
                    title={query?.keyword}
                    />
                <List
                    list={localList}
                    setCurrentPage={setCurrentPage}
                    />
                <div ref={ref}></div>
            </ContentLayout>
        </div>
    )
}


export default KeywordPage;